import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { decodeJwt } from "@/lib/jwt";

export type LocalUser = {
  id: number;
  nama: string;
  email: string;
  phone: string;
  role: "user";
  aktif: true;
  passwordHash: string;
  createdAt: string;
};

type LocalAuthStore = {
  nextId: number;
  users: LocalUser[];
};

const STORE_PATH = path.join(process.cwd(), ".data", "local-users.json");
const TOKEN_ISSUER = "pijarivo-local";

function localAuthEnabled() {
  return !/^(0|false|no|off)$/i.test(process.env.LOCAL_AUTH_ENABLED || "true");
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function tokenSecret() {
  return process.env.LOCAL_AUTH_SECRET || process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "pijarivo-local-dev-secret";
}

function sign(payload: string) {
  return createHmac("sha256", tokenSecret()).update(payload).digest("base64url");
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = pbkdf2Sync(password, salt, 120_000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const candidate = hashPassword(password, salt).split(":")[1] || "";
  const left = Buffer.from(candidate, "hex");
  const right = Buffer.from(hash, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

async function readStore(): Promise<LocalAuthStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalAuthStore>;
    return {
      nextId: Number(parsed.nextId || 1),
      users: Array.isArray(parsed.users) ? parsed.users as LocalUser[] : [],
    };
  } catch {
    return { nextId: 1, users: [] };
  }
}

async function writeStore(store: LocalAuthStore) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function createLocalUser(input: { nama: string; email: string; phone: string; password: string }) {
  if (!localAuthEnabled()) return { ok: false as const, error: "Local auth tidak aktif." };

  const nama = input.nama.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const password = input.password;
  if (!nama || !email || !phone || password.length < 8) {
    return { ok: false as const, error: "Data registrasi belum lengkap." };
  }

  const store = await readStore();
  if (store.users.some((user) => user.email === email)) {
    return { ok: false as const, error: "Email sudah terdaftar." };
  }

  const user: LocalUser = {
    id: store.nextId,
    nama,
    email,
    phone,
    role: "user",
    aktif: true,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  store.nextId += 1;
  store.users.push(user);
  await writeStore(store);

  return { ok: true as const, user };
}

export async function loginLocalUser(email: string, password: string) {
  if (!localAuthEnabled()) return null;
  const normalizedIdentity = email.trim().toLowerCase();
  const store = await readStore();
  const user = store.users.find((item) => item.email === normalizedIdentity || item.nama.toLowerCase() === normalizedIdentity);
  if (!user || !user.aktif || !verifyPassword(password, user.passwordHash)) return null;
  return { user, token: createLocalToken(user) };
}

export function createLocalToken(user: Pick<LocalUser, "id" | "nama" | "email" | "role">) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: TOKEN_ISSUER,
    local_auth: true,
    sub: user.id,
    name: user.nama,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + 60 * 60 * 24 * 30,
  }));
  const unsigned = `${header}.${payload}`;
  return `${unsigned}.${sign(unsigned)}`;
}

export async function getLocalIdentity(token: string) {
  if (!localAuthEnabled()) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const unsigned = `${parts[0]}.${parts[1]}`;
  if (sign(unsigned) !== parts[2]) return null;

  const claims = decodeJwt(token) as ReturnType<typeof decodeJwt> & { local_auth?: boolean; email?: string; name?: string } | null;
  if (!claims?.local_auth || claims.iss !== TOKEN_ISSUER) return null;
  if (claims.exp && claims.exp * 1000 <= Date.now()) return null;

  const store = await readStore();
  const user = store.users.find((item) => String(item.id) === String(claims.sub) && item.aktif);
  if (!user) return null;

  return {
    member_id: user.id,
    role: user.role,
    nama: user.nama,
    email: user.email,
    phone: user.phone,
    saldo: 0,
  };
}

# Deployment Pijarivo

- Domain: `https://pijarivo.com` dan `https://www.pijarivo.com`.
- Repository: `https://github.com/Dlennss/pijarivo`.
- Direktori server: `/var/lib/syslog-ng/fadlanpulsa/pijarivo.com`.
- Proses produksi: service systemd `pijarivo.service`, user sistem `pijarivo`.
- Alamat aplikasi: `172.22.0.1:33018`, diakses melalui Nginx Proxy Manager.
  Alamat ini adalah gateway jaringan Docker `nginx_default`, bukan IP publik.

## Konfigurasi environment

Buat `.env.production` pada direktori repository, berdasarkan `.env-example`.
Gunakan `NEXT_PUBLIC_SITE_URL=https://pijarivo.com` dan
`NEXTAUTH_URL=https://pijarivo.com`. Buat nilai acak yang kuat untuk
`AUTH_SECRET`, `NEXTAUTH_SECRET`, dan `LOCAL_AUTH_SECRET`; jangan commit file ini.
Systemd membaca environment tersebut saat memulai service.

Isi `API_BASE` dengan backend Pijarivo yang sebenarnya. Default
`http://127.0.0.1:8080` hanya berlaku jika backend memang berjalan di sana.
Halaman depan bisa berjalan tanpa backend, tetapi ketersediaan produk,
pembayaran, dan transaksi nyata tetap membutuhkan backend/provider.
Google login perlu kredensial tersendiri dan callback
`https://pijarivo.com/api/auth/callback/google`.

## Build dan jalankan

Persyaratan: Node.js >=20.9, npm, user sistem `pijarivo`, dan akses jaringan
Docker yang disebut di atas. Siapkan `.env.production` sebelum build.

```sh
cd /var/lib/syslog-ng/fadlanpulsa/pijarivo.com
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run prepare:standalone
```

Script menyalin aset publik dan aset Next.js ke output standalone.
Data akun lokal berada di `.data/` di luar direktori build dan dihubungkan
ke output standalone. Simpan backup `.data/` sebelum deployment berikutnya.
User `pijarivo` harus bisa membaca build serta menulis `.data/` dan cache
`.next/standalone/.next/`.
Jika build dibuat oleh root, atur pemilik `.data/`, `.next/standalone/.next/`,
dan salinan `.env.production` di output standalone ke `pijarivo:pijarivo`.
File environment tetap menggunakan izin `0600`.

Pasang `deployment/pijarivo.service` ke `/etc/systemd/system/`, lalu jalankan
`systemctl daemon-reload` dan `systemctl enable --now pijarivo`.
Untuk pembaruan, hentikan service sebelum mengganti build, ulangi build dan
persiapan aset, pastikan izin direktori, lalu jalankan kembali service.

## Nginx dan HTTPS

`nginx.conf` adalah konfigurasi virtual host domain ini untuk Nginx Proxy
Manager. Variabel `$fadlan_connection_upgrade` berasal dari `map` bersama
di konfigurasi induk `/data/nginx/proxy_host/95-fadlanpulsa.conf`:

```nginx
map $http_upgrade $fadlan_connection_upgrade {
    default upgrade;
    "" close;
}
```

Virtual host ini sudah menjadi bagian dari file induk tersebut; jangan
memuatnya lagi sebagai virtual host kedua atau membuat duplikat di UI NPM.
Sertifikat berada di `/etc/letsencrypt/live/fadlan-pijarivo/` dalam container.
Private key tidak masuk repository. Timer host
`fadlan-pijarivo-cert-renew.timer` memperbarui sertifikat dan me-reload Nginx.
Gunakan mode Cloudflare Full (strict). HTTP tetap tersedia untuk validasi
sertifikat; pengalihan HTTP ke HTTPS belum dipaksakan pada konfigurasi ini.

Firewall host membatasi port aplikasi ke container Nginx Proxy Manager:

```sh
ufw allow in on br-97f04a982080 proto tcp from 172.22.0.2 to 172.22.0.1 port 33018 comment 'Pijarivo from Nginx Proxy Manager'
```

Verifikasi IP container dan nama bridge jika jaringan Docker dibuat ulang.

## Pemeriksaan

```sh
systemctl status pijarivo
curl --fail https://pijarivo.com/api/health
curl --fail https://pijarivo.com/robots.txt
docker exec nginx_proxy_manager nginx -t
```

Endpoint `/api/health` memeriksa proses frontend, bukan backend transaksi.

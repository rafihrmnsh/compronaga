# Company Profile PT Naga Karya Sakti Indonesia

Next.js (App Router) + Tailwind CSS 4, dibuat dari `COMPRO_NKSI (New 24-09).pdf`.

## Menjalankan
```bash
npm install
cp .env.example .env.local   # isi RESEND_API_KEY agar form kontak aktif
npm run dev                  # http://localhost:3000
npm run build && npm start   # uji produksi
```

## Deploy ke Vercel
1. Push folder ini ke GitHub, lalu *Add New Project* di Vercel dan pilih repo.
2. Environment Variables: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (lihat `.env.example`).
3. Deploy, lalu arahkan domain `ptnksi.co.id` di Settings > Domains.

## Mengubah konten
- Teks: `src/data/content.ts`; kontak & alamat: `src/data/site.ts`.
- Klien: array `clients` (isi `logo` bila logo tersedia). "Cargloss" dan "MCP" tidak ada di PDF: nama lengkap/logo perlu dikonfirmasi.
- Foto: `scripts/process-images.py` mengubah hasil ekstraksi PDF menjadi WebP di `public/images`.

## Keamanan
Security headers (CSP, HSTS, X-Frame-Options, dll.) di `next.config.ts`. Form: validasi server-side, honeypot, jeda minimal 3 detik, rate limit per IP (best-effort), cek origin, Turnstile opsional. Tanpa analytics/cookie, jadi tidak perlu banner cookie.

# Panduan Setup EmailJS untuk Contact Form

## Langkah-langkah Setup EmailJS

### 1. Buat Akun EmailJS (GRATIS)
1. Kunjungi: https://www.emailjs.com/
2. Klik **"Sign Up"** dan buat akun gratis
3. Verifikasi email Anda

### 2. Tambahkan Email Service
1. Login ke dashboard EmailJS: https://dashboard.emailjs.com/
2. Klik **"Add New Service"**
3. Pilih **Gmail** (atau email provider lain yang Anda gunakan)
4. Ikuti instruksi untuk menghubungkan akun Gmail Anda
5. **Catat Service ID** yang diberikan (contoh: `service_abc123`)

### 3. Buat Email Template
1. Di dashboard, klik **"Email Templates"**
2. Klik **"Create New Template"**
3. Gunakan template berikut:

**Subject:**
```
Pesan Baru dari Website: {{subject}}
```

**Content:**
```
Anda menerima pesan baru dari website PT NAGA KARYA SAKTI INDONESIA:

Dari: {{from_name}}
Email: {{from_email}}
Telepon: {{phone}}

Subjek: {{subject}}

Pesan:
{{message}}

---
Pesan ini dikirim otomatis dari form kontak website.
```

4. Klik **"Save"**
5. **Catat Template ID** (contoh: `template_xyz789`)

### 4. Dapatkan Public Key
1. Di dashboard, klik **"Account"** di menu
2. Scroll ke bagian **"API Keys"**
3. **Catat Public Key** Anda (contoh: `AbCdEfGhIjKlMnOp`)

### 5. Update Konfigurasi di Website
Buka file `script.js` dan update bagian `EMAILJS_CONFIG`:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'AbCdEfGhIjKlMnOp',    // Ganti dengan Public Key Anda
    serviceID: 'service_abc123',       // Ganti dengan Service ID Anda
    templateID: 'template_xyz789'      // Ganti dengan Template ID Anda
};
```

### 6. Test Form
1. Buka website Anda
2. Isi form kontak
3. Klik "Kirim Pesan"
4. Cek email `ptnagakaryasaktiindonesia@gmail.com`

## Batasan Gratis EmailJS
- **200 email per bulan** (gratis)
- Jika butuh lebih, upgrade ke plan berbayar mulai dari $7/bulan untuk 1000 email

## Troubleshooting

### Email tidak terkirim?
1. Pastikan semua konfigurasi sudah benar
2. Cek console browser (F12) untuk error
3. Pastikan Gmail service sudah terkoneksi dengan benar
4. Cek folder spam di email tujuan

### Error "EmailJS not configured"?
- Pastikan Anda sudah mengganti `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, dan `YOUR_TEMPLATE_ID` dengan nilai yang sebenarnya

### Ingin mengubah email tujuan?
Edit di `script.js` bagian:
```javascript
to_email: 'ptnagakaryasaktiindonesia@gmail.com'  // Ganti dengan email lain
```

## Alternatif Lain (Jika EmailJS Tidak Cocok)

### 1. Formspree (https://formspree.io/)
- Gratis 50 submissions/bulan
- Lebih mudah setup (hanya perlu endpoint URL)

### 2. Netlify Forms
- Gratis 100 submissions/bulan
- Sudah terintegrasi dengan Netlify hosting
- Tinggal tambahkan atribut `netlify` di form

### 3. Google Forms
- Unlimited gratis
- Data masuk ke Google Sheets
- Perlu redirect ke Google Forms

---

**Butuh bantuan?** Hubungi developer atau baca dokumentasi lengkap di: https://www.emailjs.com/docs/

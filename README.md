README Proyek pokédex

Selamat datang di Proyek Pokédex! Ikuti langkah-langkah di bawah ini untuk mengatur dan menjalankan proyek ini di komputer Anda.

Fitur

Mengelola database Pokémon dan pengguna.

Mengimpor data dari file JSON.

Menjalankan server Node.js untuk mengakses fitur seperti pembuatan akun pengguna dan lainnya.

Prasyarat

Pastikan Anda sudah menginstal:

Node.js

MySQL

Penyiapan Proyek

1. Inisialisasi Database MySQL

Buka klien MySQL Anda dan buat database dengan kredensial berikut:

<img width="549" alt="Screenshot 2024-12-22 at 21 42 30" src="https://github.com/user-attachments/assets/0ccc4dd2-3ab2-4526-a3a9-82bc3afc55b1" />


Gunakan parameter berikut untuk koneksi MySQL Anda:

<img width="544" alt="Screenshot 2024-12-22 at 21 43 32" src="https://github.com/user-attachments/assets/2f509725-1144-4142-913a-59d1abca3f89" />

Buat tabel yang diperlukan dengan menjalankan perintah SQL berikut:


<img width="547" alt="Screenshot 2024-12-22 at 21 44 09" src="https://github.com/user-attachments/assets/cb18abaa-d0a7-440e-a8f2-746dba557f2f" />



2. Instal Modul yang Diperlukan

Instal modul Node.js yang diperlukan menggunakan npm:

npm install

3. Impor Data JSON

Jalankan skrip untuk mengimpor data ke dalam database:

node import.js

4. Jalankan Server

Jalankan server Node.js dengan perintah berikut:

node server.js

Server Anda sekarang berjalan! Anda dapat mengakses fitur untuk membuat akun dan berinteraksi dengan database.

Struktur Penting

Berikut adalah gambaran singkat tentang struktur proyek:


<img width="576" alt="Screenshot 2024-12-22 at 21 45 43" src="https://github.com/user-attachments/assets/83134819-04c4-4f81-b990-9f50261b545f" />


Penggunaan

Buat Akun: Gunakan endpoint server untuk membuat akun pengguna.

Manajemen Database: Lihat dan kelola data Pokémon.

Peran: Admin memiliki hak istimewa tambahan untuk mengelola pengguna dan data.

Pemecahan Masalah

Kesalahan Koneksi Database: Periksa ulang kredensial MySQL Anda.

Modul Hilang: Jalankan npm install untuk memastikan semua dependensi terinstal.

Masalah Server: Periksa log untuk pesan kesalahan yang lebih rinci.

Terima kasih telah menggunakan Proyek Pokedex! Jangan ragu untuk berkontribusi atau melaporkan masalah melalui GitHub.


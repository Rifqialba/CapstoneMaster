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

CREATE DATABASE pokemon_db;

Gunakan parameter berikut untuk koneksi MySQL Anda:

Host: localhost
User: root
Password: password_ku
Database: pokemon_db

Buat tabel yang diperlukan dengan menjalankan perintah SQL berikut:

-- Membuat tabel pokemons
CREATE TABLE pokemons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    set_name VARCHAR(255),
    name VARCHAR(255),
    supertype VARCHAR(255),
    subtypes VARCHAR(255),
    types VARCHAR(255),
    number VARCHAR(50),
    rarity VARCHAR(100),
    small_image_url TEXT,
    large_image_url TEXT
);

-- Membuat tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role ENUM('user', 'admin'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

.
├── import.js      # Skrip untuk mengimpor data ke database
├── server.js      # File utama server
├── package.json   # Dependensi Node.js
├── routes/        # Handler rute API
├── controllers/   # Logika bisnis untuk menangani permintaan
├── middleware/    # Fungsi middleware
├── db/            # Fungsi untuk koneksi database
├── utils/         # Fungsi hasing 
└── README.md      # Dokumentasi proyek





Penggunaan

Buat Akun: Gunakan endpoint server untuk membuat akun pengguna.

Manajemen Database: Lihat dan kelola data Pokémon.

Peran: Admin memiliki hak istimewa tambahan untuk mengelola pengguna dan data.

Pemecahan Masalah

Kesalahan Koneksi Database: Periksa ulang kredensial MySQL Anda.

Modul Hilang: Jalankan npm install untuk memastikan semua dependensi terinstal.

Masalah Server: Periksa log untuk pesan kesalahan yang lebih rinci.

Terima kasih telah menggunakan Proyek Pokedex! Jangan ragu untuk berkontribusi atau melaporkan masalah melalui GitHub.


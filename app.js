const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Username MySQL default di Laragon
    password: '', // Password default di Laragon (kosong)
    database: 'wisata_kolam_renang', // Ganti dengan nama database Anda
});

// Tes koneksi database
db.connect((err) => {
    if (err) {
        console.error('Error: Gagal terhubung ke database!', err);
    } else {
        console.log('Berhasil terhubung ke database MySQL!');
    }
});

app.set('view engine', 'ejs'); // Gunakan EJS sebagai template engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Atur folder file statis
app.use(express.static('public')); // Agar folder public dapat diakses


// Gunakan rute dari folder `routes`
const wisataRoutes = require('./routes/wisataRoutes');
app.use('/wisata', wisataRoutes);

// Jalankan server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});

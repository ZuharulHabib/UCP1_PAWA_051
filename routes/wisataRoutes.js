const express = require('express');
const db = require('../models/wisata');

const router = express.Router();

// **READ**: Menampilkan semua data wisata
router.get('/', (req, res) => {
    db.query('SELECT * FROM wisata', (err, results) => {
        if (err) throw err;
        res.render('index', { wisataList: results });
    });
});

// **CREATE**: Tampilkan form tambah data
router.get('/create', (req, res) => {
    res.render('create');
});

// **CREATE**: Tambahkan data ke database
router.post('/create', (req, res) => {
    const { nama, lokasi, harga } = req.body;
    db.query('INSERT INTO wisata (nama, lokasi, harga) VALUES (?, ?, ?)', [nama, lokasi, harga], (err) => {
        if (err) throw err;
        res.redirect('/wisata');
    });
});

// **UPDATE**: Tampilkan form edit data
router.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM wisata WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) res.status(404).send('Data tidak ditemukan');
        else res.render('edit', { wisata: results[0] });
    });
});

// **UPDATE**: Simpan perubahan ke database
router.post('/edit/:id', (req, res) => {
    const { nama, lokasi, harga } = req.body;
    db.query('UPDATE wisata SET nama = ?, lokasi = ?, harga = ? WHERE id = ?', [nama, lokasi, harga, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/wisata');
    });
});

// **DELETE**: Hapus data dari database
router.post('/delete/:id', (req, res) => {
    db.query('DELETE FROM wisata WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/wisata');
    });
});

module.exports = router;

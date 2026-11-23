import * as SQLite from "expo-sqlite";

let dbInstance = null;

export const getDb = async () => {
  if (dbInstance) return dbInstance;

  dbInstance = await SQLite.openDatabaseAsync("db_inventaris.db");

  // Aktifkan foreign key dan buat tabel jika belum ada
  await dbInstance.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS barang (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kode_barang TEXT NOT NULL UNIQUE,
      nama_barang TEXT NOT NULL,
      kategori TEXT NOT NULL,
      stok_total INTEGER NOT NULL DEFAULT 0,
      stok_tersedia INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS peminjaman (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      barang_id INTEGER NOT NULL,
      nama_peminjam TEXT NOT NULL,
      jumlah_pinjam INTEGER NOT NULL,
      tanggal_pinjam TEXT DEFAULT (datetime('now', 'localtime')),
      tanggal_kembali TEXT NULL,
      status TEXT NOT NULL DEFAULT 'DIPINJAM' CHECK(status IN ('DIPINJAM', 'DIKEMBALIKAN')),
      FOREIGN KEY (barang_id) REFERENCES barang(id) ON DELETE CASCADE
    );
  `);

  // Seed data awal jika tabel barang masih kosong
  const countResult = await dbInstance.getFirstAsync(
    "SELECT COUNT(*) AS total FROM barang",
  );
  if (countResult && countResult.total === 0) {
    await dbInstance.execAsync(`
      INSERT INTO barang (kode_barang, nama_barang, kategori, stok_total, stok_tersedia) VALUES
      ('BRG-001', 'Proyektor Epson EB-X500', 'Elektronik', 5, 5),
      ('BRG-002', 'Kabel HDMI 10 Meter', 'Aksesoris', 10, 10),
      ('BRG-003', 'Kamera DSLR Canon EOS', 'Multimedia', 3, 3);
    `);
  }

  return dbInstance;
};

// 1. Ambil semua data barang
export const getBarang = async () => {
  const db = await getDb();
  return await db.getAllAsync("SELECT * FROM barang ORDER BY id DESC");
};

// 2. Tambah barang baru
export const createBarang = async ({
  kode_barang,
  nama_barang,
  kategori,
  stok_total,
}) => {
  const db = await getDb();
  try {
    const result = await db.runAsync(
      `INSERT INTO barang (kode_barang, nama_barang, kategori, stok_total, stok_tersedia)
       VALUES (?, ?, ?, ?, ?)`,
      [kode_barang, nama_barang, kategori, stok_total, stok_total],
    );
    return { message: "Barang ditambahkan", id: result.lastInsertRowId };
  } catch (error) {
    if (error.message && error.message.includes("UNIQUE")) {
      throw new Error("Kode barang sudah digunakan!");
    }
    throw new Error(error.message || "Gagal menambah barang");
  }
};

// 3. Ambil daftar peminjaman (JOIN dengan tabel barang)
export const getPeminjaman = async () => {
  const db = await getDb();
  return await db.getAllAsync(`
    SELECT p.*, b.nama_barang, b.kode_barang
    FROM peminjaman p
    JOIN barang b ON p.barang_id = b.id
    ORDER BY
      CASE WHEN p.status = 'DIPINJAM' THEN 0 ELSE 1 END,
      p.id DESC
  `);
};

// 4. Proses Peminjaman (Stok Berkurang)
export const pinjamBarang = async ({
  barang_id,
  nama_peminjam,
  jumlah_pinjam,
}) => {
  const db = await getDb();

  if (!jumlahPinjam || jumlahPinjam <= 0) {
    throw new Error("Jumlah pinjam harus lebih dari 0");
  }

  const barang = await db.getFirstAsync(
    "SELECT stok_tersedia FROM barang WHERE id = ?",
    [barang_id],
  );

  if (!barang) {
    throw new Error("Barang tidak ditemukan");
  }
  if (barang.stok_tersedia < jumlah_pinjam) {
    throw new Error("Stok tidak mencukupi!");
  }

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO peminjaman (barang_id, nama_peminjam, jumlah_pinjam, status)
       VALUES (?, ?, ?, 'DIPINJAM')`,
      [barang_id, nama_peminjam, jumlah_pinjam],
    );

    await db.runAsync(
      `UPDATE barang
       SET stok_tersedia = stok_tersedia - ?
       WHERE id = ?`,
      [jumlah_pinjam, barang_id],
    );
  });

  return { message: "Peminjaman berhasil, stok dikurangi!" };
};

// 5. Proses Pengembalian (Stok Bertambah)
export const kembalikanBarang = async (id) => {
  const db = await getDb();

  const transaksi = await db.getFirstAsync(
    `SELECT * FROM peminjaman WHERE id = ? AND status = 'DIPINJAM'`,
    [id],
  );

  if (!transaksi) {
    throw new Error("Data tidak valid atau sudah dikembalikan");
  }

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `UPDATE peminjaman
       SET status = 'DIKEMBALIKAN', tanggal_kembali = datetime('now', 'localtime')
       WHERE id = ?`,
      [id],
    );

    await db.runAsync(
      `UPDATE barang
       SET stok_tersedia = stok_tersedia + ?
       WHERE id = ?`,
      [transaksi.jumlah_pinjam, transaksi.barang_id],
    );
  });

  return { message: "Barang dikembalikan, stok bertambah!" };
};
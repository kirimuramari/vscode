const express = require("express");
const bodyParser = require("body-parser");
const { error, log } = require("console");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3001;
// Middleware
app.use(bodyParser.json());

// SQLite データベースを開く/作成する
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("データベース接続エラー:", err.message);
    } else {
        console.log("SQLite データベースに接続しました。");
    }
});
// データベースにテーブルを作成
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        count INTEGER NOT NULL,
        price INTEGER NOT NULL,
        total INTEGER NOT NULL,
        date TEXT NOT NULL
    )
    `, (err) => {
        if (err) {
            console.error("テーブル作成エラー:", err.message);
        } else {
            console.log("テーブルが正常に作成されました（または既に存在しています）。");
        }
    });
});
// POST エンドポイント: 新しいエントリーを追加
app.post("/api/entries", (req, res) => {
    const { name, type, count, price, total, date } = req.body;
    if (!name || !type || !count || !price || !total || !date) {
        return res.status(400).json({ error: "すべてのフィールドを入力してください。" });
    }
    const query = `
        INSERT INTO entries (name, type, count, price, total, date)
        VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [name, type, count, price, total, date];

        db.run(query, params, function (err) {
            if (err) {
                console.error("データ挿入エラー:", err.message);
                return res.status(500).json({ error: "データの保存に失敗しました。" });
            }
            res.status(201).json({ message: "エントリーが正常に保存されました。" });
        });
});
// GET エンドポイント: 保存されたエントリーを取得
app.get("/api/entries", (req, res) => {
    const query = "SELECT * FROM entries ORDER BY date DESC";

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("データ取得エラー:", err.message);
            return res.status(500).json({ error: "データの取得に失敗しました。" });
        }
        res.json(rows);
    });
});
// サーバーの開始
app.listen(port, () => {
    console.log(`サーバーが http://localhost:${port} で起動しました。`);
});

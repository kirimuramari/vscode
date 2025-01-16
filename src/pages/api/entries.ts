import { NextApiRequest, NextApiResponse } from "next";
import { open } from 'sqlite';
import sqlite3 from "sqlite3";

// データベース接続を初期化
const getDBConnection = async () => {
    return open({
        filename: "/home/maki/project/React/next-app/src/database/entries.db",
        driver: sqlite3.Database,
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await getDBConnection();
    if (req.method === "GET") {
        const { date } = req.query;
        if (date) {
            const entries = await db.all("SELECT * FROM entries WHERE date = ?", [date]);
            res.status(200).json(entries);
        } else {
            res.status(400).json({ error: "日付が指定されていません。" });
        }
    } else if (req.method === "POST") {
        const { entries, date } = req.body;
        try {
            const insertPromises = entries.map((entry: any) =>
                db.run(
                "INSERT INTO entries (name, type, count, price, total, date) VALUES (?, ?, ?, ?, ?, ?)",
                [entry.name, entry.type, entry.count, entry.price, entry.total, date]
            )
        );    
        await Promise.all(insertPromises);
            res.status(201).json({ message: "データが保存されました。" });
        } catch (error) {
            console.error("データベースエラー:", error);
            res.status(500).json({ error: "データ保存中にエラーが発生しました。" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
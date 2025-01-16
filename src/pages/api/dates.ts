import express from "express";
import sqlite3 from "sqlite3";

const router = express.Router();
const db = new sqlite3.Database("/home/maki/project/React/next-app/src/database/entries.db");
router.get("/dates", (req, res) => {
    const query = "SELECT DISTINCT date FROM entries";
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ error: "Database error" });
            return; 
        }
        const dates = rows.map((row) => row.date);
        res.json(dates);
    });
});

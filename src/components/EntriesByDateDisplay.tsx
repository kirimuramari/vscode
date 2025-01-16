import React from "react";

interface EntriesByDateDisplayProps {
    entries: {
        id: number;
        name: string;
        type: string;
        count: number;
        price: number;
        total: number;
        date: string;
    }[];
}
const EntriesByDateDisplay: React.FC<EntriesByDateDisplayProps> = ({ entries }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">保存されたデータ</h2>
            <ul>
                {entries.map((entry) => (
                <li key={entry.id} className="mb-2">
                    <p>名前: {entry.name}</p>
                    <p>種類: {entry.type}</p>
                    <p>個数: {entry.count}</p>
                    <p>単価: {entry.price}</p>
                    <p>合計: {entry.total} 円</p>
                </li>
                ))}
            </ul>
        </div>
    );
};
export default EntriesByDateDisplay;
import React, { useState, useEffect } from "react";
import formatDate from "../utils/formatDate";

interface FormSectionProps {
    selectedDate: Date | null;
    onAddEntry: (entry: { name: string; type: string; count: number; price: number; total: number }) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ selectedDate, onAddEntry }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [count, setCount] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [total, setTotal] = useState<number>(0);
    const [error, setError] = useState("");

    useEffect(() => {
        if (count && price) {
            setTotal(count * price);
          } else {
            setTotal(0);
          }
        }, [count, price]);
    
    const handleAddClick = () => {
        if (!name) {
            setError("名前を入力してください。");
            return;
        }      
        if (count === "" || count <= 0) {
            setError("正しい個数を入力してください。");
            return;
        }
        if (price === "" || price <= 0) {
            setError("正しい単価を入力してください。");
            return;
        }
        setError("");

// フォームをリセット
const newEntry = { name, type, count: Number(count), price: Number(price), total: Number(total) };
onAddEntry(newEntry);

  
  

        setName("");
        setType("");
        setCount("");
        setPrice("");
        setTotal(0);
    };
    return (
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md ml-4">
            {selectedDate ? (
                <>
                <p className="text-gray-700 mb-4">{formatDate(selectedDate)}</p> 
                <div className="mb-4">
                    <label className="block font-bold">名前</label>
                    <input 
                    type="text"
                    className="w-full p-2 border rounded" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">種類</label>
                    <input 
                    type="text"
                    className="w-full p-2 border rounded" 
                    value={type}
                    onChange={(e) => setType(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">個数</label>
                    <input 
                    type="number"
                    className="w-full p-2 border rounded" 
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                />
                </div>
                <div className="mb-4">
                    <label className="block font-bold">単価</label>
                    <input 
                    type="number"
                    className="w-full p-2 border rounded" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <p className="text-lg font-bold mb-4">
                合計: {total} 円
              </p>
                <button
                    onClick={handleAddClick}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                追加
                </button>
            </>
            ) : (
                <p className="text-gray-500">日付を選択してください。</p>
            )}
        </div>
    );
};
export default FormSection;

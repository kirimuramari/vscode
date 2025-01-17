import React from "react";

interface Entry {
    name: string;
    type: string;
    count: number;
    price: number;
    total: number;
}

interface EntriesDisplayProps {
    entries: Entry[]; // 親から渡されるデータ
    selectedDate: Date | null; // 選択された日付を受け取る
}

const EntriesDisplay: React.FC<EntriesDisplayProps> = ({ entries, selectedDate }) => {
// フォームからデータを追加する
const handleSaveAll = async () => {
    if (!selectedDate) {
      alert("日付を選択してください！保存できません。");
      return;
    }
    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
        // サーバーにデータを送信
        const response = await fetch("/api/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ entries, date: formattedDate }),
        });
        if (!response.ok) {
         const errorMessage = await response.text();
            alert(`保存に失敗しました。: ${errorMessage}`);
        } else{
            alert("すべてのデータが保存されました。");
        }
          } catch (error) {
        console.error("保存エラー:", error);
        alert("エラーが発生しました。");       
    }
};
const cellStyle = "border border-gray-300 px-4 py-2";
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">エントリー</h2>
            {/* 現在のエントリをリスト表示 */}
            {entries.length === 0 ? ( // entriesが空の場合のチェック
                <p className="text-gray-500">エントリがありません。</p>
            ) : (
                <>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className={cellStyle}>名前</th>
                            <th className={cellStyle}>種類</th>
                            <th className={cellStyle}>個数</th>
                            <th className={cellStyle}>単価</th>
                            <th className={cellStyle}>合計</th>

                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => (
                            <tr key={entry + entry.name}>
                           <td className={cellStyle}>{entry.name}</td>
                           <td className={cellStyle}>{entry.type}</td>
                           <td className={cellStyle}>{entry.count}</td>
                           <td className={cellStyle}>{entry.price}</td>
                           <td className={cellStyle}>{entry.total}</td>
                           </tr>
                        ))}
                    </tbody>
                </table>
                            <button
                                onClick={handleSaveAll}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                保存
                            </button>
                            </>
            )}
        </div>
    );
};
export default EntriesDisplay;
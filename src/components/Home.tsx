import React, { useState } from "react";
import CalendarSection from "../components/CalendarSection";
import FormSection from "../components/FormSection";
import EntriesDisplay from "../components/EntriesDisplay";
import EntriesByDateDisplay from "../components/EntriesByDateDisplay";

interface Entry {
  name: string;
  type: string;
  count: number;
  price: number;
  total: number;
}

const Home = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);// カレンダーの選択された日付
    const [entries, setEntries] = useState<Entry[]>([]); // 入力データ
    const [entriesForDate, setEntriesForDate] = useState<
     { id: number; name: string; type: string; count: number; price: number; total: number; date: string }[]
    >([]); // 選択日付のエントリ
    // カレンダーの日付選択ハンドラー
    const handleDateSelect = async (date: Date) => {
      setSelectedDate(date);
		// 選択された日付に対応するデータを取得
		const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 形式にフォーマット
      try {
        const response = await fetch(`/api/entries?date=${formattedDate}`);
        if (response.ok) {
          const data = await response.json();
          setEntriesForDate(data); // 選択日付のエントリを状態に保存
        } else {
          setEntriesForDate([]); // データがない場合は空配列				
        }
      } catch (error) {
        console.error("データ取得エラー:", error);
        setEntriesForDate([]); // エラーハンドリング
      }
    };
    const handleAddEntry = (entry: { name: string; type: string; count: number; price: number; total: number }) => {
      const newEntry = {
        ...entry,
        id: Date.now(),
        date:
        selectedDate?.toISOString().split("T")[0] || ""
      };
      setEntriesForDate((prev) => [...prev, newEntry]);
        setEntries((prev) =>  [...prev, newEntry]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
        <CalendarSection onDateSelect={handleDateSelect} />
      <div className="flex-1">
        {/* 選択された日付に応じて表示を切り替え */}
      {selectedDate ? (
        entriesForDate.length > 0 ? (
          <EntriesByDateDisplay entries={entriesForDate} />
      ) : (
        <div className="flex flex-row space-x-4">
          <FormSection selectedDate={selectedDate} onAddEntry={handleAddEntry} />
          <EntriesDisplay entries={entriesForDate} selectedDate={selectedDate} />
        </div>
        )
      ) : (
        <p>日付を選択してください。</p>
      )}
      </div>
    </div>
  );
};
export default Home;
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdayNames[date.getDay()];
    return `${year}年${month}月${day}日${weekday}曜日`;
};

export default formatDate;
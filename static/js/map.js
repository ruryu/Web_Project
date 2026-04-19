const ncu = [24.9681, 121.1921];

// 建立地圖
const map = L.map('map').setView(ncu, 16);

// 使用 OpenStreetMap 圖磚
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 加入標記
const marker = L.marker(ncu).addTo(map);

// 加入資訊框
marker.bindPopup("<b>國立中央大學</b><br>NCU").openPopup();
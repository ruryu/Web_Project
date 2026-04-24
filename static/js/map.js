const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{
    attribution: 'Tile &copy; Esri'
});

const ncu = [24.9681, 121.1921];
const map = L.map('map', {
    center: ncu,
    zoom: 16,
    layers: [satellite] // 預設衛星俯瞰圖
})

const baseMaps = {
    "街道地圖": osm,
    "衛星俯瞰": satellite
};

L.control.layers(baseMaps).addTo(map);

// 1. 資料庫定義 (Key 要對應到按鈕的文字或 ID)
const poiData = {
    "AED": {
        label: "AED 設備",
        color: "#FF4757", // 紅色
        items: [
            { name: "衛生保健組", coords: [24.96819, 121.19342], desc: "位置：一樓大廳" },
            { name: "行政大樓", coords: [24.96826, 121.19510], desc: "位置：正門入口處" },
            { name: "女十四舍", coords: [24.96562, 121.19438], desc: "位置：舍監室旁" },
            { name: "綜教館", coords: [24.97021, 121.193], desc: "位置：中庭牆面" },
            { name: "依仁堂", coords: [24.96826, 121.19103], desc: "位置：體育館入口" }
        ]
    },
    "SOS電話": {
        color: "orange",
        items: [
            { name: "綜教館", coords: [24.97021, 121.1928], desc: "SOS電話" },
            { name: "至道樓", coords: [24.965629199505276, 121.19378110509905], desc: "SOS電話" },
            { name: "校史館前", coords: [24.96700317858991, 121.19575864246693], desc: "SOS電話" },
            { name: "國鼎大樓前", coords: [24.969916842400924, 121.19097742466617], desc: "SOS電話" },
            { name: "羽球場", coords: [24.96901356943879, 121.19103850690253], desc: "SOS電話" },
            { name: "小榕樹排球場", coords: [24.96744204488171, 121.19086539327412], desc: "SOS電話" },
            { name: "後門", coords: [24.965665236219703, 121.19104302383231], desc: "SOS電話" },
            { name: "籃球場", coords: [24.968479077696536, 121.18921992066238], desc: "SOS電話" },
            { name: "大型力學實驗館", coords: [24.968718662181224, 121.18853900281249], desc: "SOS電話" },
            { name: "運動中心", coords: [24.969729771586405, 121.189887554360678], desc: "SOS電話" }
        ]
    },
    "無障礙坡道": {
        color: "blue",
        items: [] // 這裡填入座標
    },
    "無障礙電梯": {
        color: "green",
        items: [] // 這裡填入座標
    }
};

// 2. 建立圖層物件
const layers = {};

// 預先產生所有圖層，但不一定馬上加到地圖
for (let key in poiData) {
    const group = L.layerGroup();
    poiData[key].items.forEach(item => {
        L.circleMarker(item.coords, {
            radius: 8,
            color: poiData[key].color,
            fillColor: poiData[key].color,
            fillOpacity: 0.8
        }).bindPopup(`<b>${item.name}</b><br>${item.desc}`).addTo(group);
    });
    layers[key] = group;
    // 預設全部顯示 (如果要預設隱藏，就不要寫下面這行)
    group.addTo(map);
}

// 3. 監聽按鈕點擊
document.querySelectorAll('.side-menu button').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.innerText; // 取得按鈕上的文字 (例如 "AED")
        
        if (map.hasLayer(layers[type])) {
            map.removeLayer(layers[type]); // 如果已經在地圖上，就移除 (隱藏)
            this.style.opacity = "0.5";    // 讓按鈕變淡，表示關閉
        } else {
            map.addLayer(layers[type]);    // 如果不在地圖上，就加入 (顯示)
            this.style.opacity = "1.0";    // 讓按鈕變亮，表示開啟
        }
    });
});

// 問題回報與說明彈窗樣式
const overlay = document.getElementById('modalOverlay');
const mTitle = document.getElementById('modalTitle');
const mBody = document.getElementById('modalBody');

// 儲存表單的 HTML 備份，方便切換
const formHTML = mBody.innerHTML;

// 點擊問題回報
document.getElementById('reportBtn').onclick = () => {
    mTitle.innerText = "問題回報";
    mBody.innerHTML = formHTML; // 顯示表單
    overlay.classList.remove('hidden');
    document.getElementById('cancelBtn').onclick = () => overlay.classList.add('hidden');
};

// 點擊使用說明
document.getElementById('infoBtn').onclick = () => {
    mTitle.innerText = "使用說明";
    mBody.innerHTML = `
        <div style="text-align:left; line-height:1.6;">
            <p>1. 點擊右側選單可開啟/關閉標記。</p>
            <p>2. 點擊地圖上的圖示可查看詳細資訊。</p>
            <p>3. 右上角可切換衛星或一般地圖。</p>
        </div>
    `;
    overlay.classList.remove('hidden');
};

// 關閉邏輯
document.getElementById('closeModal').onclick = () => overlay.classList.add('hidden');
window.onclick = (event) => { if (event.target == overlay) overlay.classList.add('hidden'); };

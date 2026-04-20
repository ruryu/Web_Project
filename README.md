# 校園無障礙設施地圖

這個專案在結合SDGs 17項永續發展目標，提供中央大學校內無障礙設施的數位地圖

## Tech Stack
- **Frontend:** Bootstrap
- **Backend:** Python Flask
- **Database:** SQLite


## 專案架構
```text
web_project/
├── app.py              # 專案的進入點
├── requirements.txt    # 套件清單 (Flask, etc.)
├── .gitignore          # 忽略清單 (排除 venv, pycache)
├── venv/               # 虛擬環境 (不進入版本控制)
├── static/             # 靜態資源
│   ├── css/
│   │   ├── style.css   # 網頁的排版外觀
│   └── js/
│       ├── map.js      # 地圖邏輯 (Leaflet 座標、標記點)
└── templates/          # 網頁骨架
    ├── index.html      # 網頁上面的按鈕：無障礙坡道、電梯等
    └── map.html        # 其他地圖相關頁面

## 啟動流程
cd web_project
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py 啟動地圖

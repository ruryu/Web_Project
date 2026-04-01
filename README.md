# 校園無障礙設施地圖

這個專案在結合SDGs 17項永續發展目標，提供中央大學校內無障礙設施的數位地圖

## Tech Stack
- **Frontend:** Bootstrap
- **Backend:** Python Flask
- **Database:** SQLite

## folder structure
- 'app.py': Flask 後端主程式
- 'static/': 存放靜態資源
    - 'css/': 自定義樣式
    - 'js/': 處理地圖API 與前端邏輯
- 'templates/': 存放HTML 網頁範本
    - 'index.html': 專案首頁
    - 'map.html':  核心地圖頁
- 'database.db': 儲存資料
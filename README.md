# 查詢圖片上像素點的顏色

![image](https://user-images.githubusercontent.com/96753049/180815259-96ec9a7f-0d65-4b33-af0e-9225b0d65f2c.png)

![image](https://user-images.githubusercontent.com/96753049/180815521-beb0f28f-fa64-4342-a0fb-1fc06ee99b16.png)


## Heroku
遇到的坑: 
1. 記得不要自行分配 Port，否則會出錯。
2. 不確定原因，但如果 flask 指定版本為 1.1.2 會出現錯誤，取消指定即可成功。
3. 推上 heroku 時，requirements 中的 opencv 必須寫成 opencv-contrib-python-headless，否則會出錯。([Video](https://www.youtube.com/watch?v=9GCLwYlM8cc&t=312s&ab_channel=ProgrammingFever "How To Use OpenCv With Heroku"))

* 錯誤情形: 在本地端能正常運行，但在 heroku 上時，可能會因為 heroku 伺服器傳輸資料有時差，常會出現 html 內的顯示的圖片或是 js 讀取的照片還沒有 feed 到，就前往該頁面，但實際內容已透過 flask 換成另一張圖片。具體來說有以下三種情形。
  * html 顯示錯誤。
  * js 偵測出錯。
  * html 顯示錯誤 + js 偵測出錯。

* 解決方式
  * 在Procfile中在 web gunicorn app:app 後面加上 --workers=1，變成 web gunicorn app:app --workers=1，即可正常運作了，原本方式錯誤的原因在於，因為 Heroku 預設的處理方式會有 web 和 gunicorn 兩種方式，所以有兩個process，每次選擇檔案並上傳可能會選擇到不同的 process，因此兩個 process 中存儲到的 global 變數可能會不一致，導致會有上傳的檔案有機率跟當前偵測到的 show_pic 圖片不同，因此發生錯誤情形，將 --workers=1 則是強制 Heroku 只能使用一個 process 來接受程式，因此能解決該問題，更好的方式則應該將上傳的照片用其他方式紀錄，不要使用 global 方式。


補充: 直接用 app.run 是屬於開發環境下的測試方式，  
如果要將程式正式部屬到 server 上的話，可以選擇的一個方式是將 app.run 改為:  
				<pre><code>from waitress import serve
    serve(app)</code></pre>
其中 server 的預設端口 port = 8080。

**網址: https://fetch-img-pixel-color.herokuapp.com/**

# 更新
因為 Heroku 終止免費部屬 APP 的方案，改成使用 Fly.io 部屬，直接照原本的 requirements.txt 內容部屬會出錯，需要將 numpy 取消指定版本才可以部屬。
https://fetch-img-color.fly.dev/


# 查詢圖片上像素點的顏色

![image](https://user-images.githubusercontent.com/96753049/180815259-96ec9a7f-0d65-4b33-af0e-9225b0d65f2c.png)

![image](https://user-images.githubusercontent.com/96753049/180815521-beb0f28f-fa64-4342-a0fb-1fc06ee99b16.png)


## Heroku
遇到的坑: 
1. 推上 heroku 時，requirements 中的 opencv 必須寫成 opencv-contrib-python-headless，否則會出錯。([Video](https://www.youtube.com/watch?v=9GCLwYlM8cc&t=312s&ab_channel=ProgrammingFever "How To Use OpenCv With Heroku"))
2. 不確定原因，但如果 flask 指定版本為 1.1.2 會出現錯誤，取消指定即可成功。
3. 記得不要自行分配 Port，否則會出錯。

* 錯誤情形
在本地端能正常運行，但在 heroku 上時，可能會因為 heroku 伺服器傳輸資料有時差，常會出現 html 內的顯示的圖片或是 js 讀取的照片還沒有 feed 到，就前往該頁面，但實際內容已透過 flask 換成另一張圖片。具體來說有以下三種情形。
  * html 顯示錯誤
  * js 偵測出錯
  * html 顯示錯誤 + js 偵測出錯

* 解決方案
  * 需要重新整理網頁推送資料才會正確。

網址: https://fetch-img-pixel-color.herokuapp.com/

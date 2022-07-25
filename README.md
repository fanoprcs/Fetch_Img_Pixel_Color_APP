# Show_imgPixel_APP

![image](https://user-images.githubusercontent.com/96753049/180815259-96ec9a7f-0d65-4b33-af0e-9225b0d65f2c.png)

![image](https://user-images.githubusercontent.com/96753049/180815521-beb0f28f-fa64-4342-a0fb-1fc06ee99b16.png)


## Heroku
遇到的坑: 
1. 推上 heroku 時，requirements 中的 opencv 必須寫成 opencv-contrib-python-headless，否則會出錯
2. 不確定原因，但如果 flask 指定版本為 1.1.2 會出現錯誤，取消指定即可成功
3. 不能自行分配 Port

網址: https://fetch-img-pixel-color.herokuapp.com/

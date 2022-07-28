import numpy as np
from PIL import Image
import flask, webbrowser, cv2
app = flask.Flask(__name__)
app.secret_key = "secret key"

@app.route('/')
def home():
    global show_pic
    show_pic = None
    return flask.render_template('page.html')
    
@app.route('/img_feed')
def img_feed():
    try: 
        tmp = show_pic
        if tmp.shape[0] > 540: #reshape by rate
            tmp = cv2.resize(tmp, None, fx = 540 /tmp.shape[0],fy= 540 /tmp.shape[0],interpolation=cv2.INTER_LINEAR)
        if tmp.shape[1] >960: #reshape by rate
            tmp = cv2.resize(tmp, None, fx = 960 /tmp.shape[1],fy= 960 /tmp.shape[1],interpolation=cv2.INTER_LINEAR)
        ret, buffer = cv2.imencode('.jpg', tmp)
        show = buffer.tobytes()
    except:
        tmp = cv2.imread('static/preshow.png')
        ret, buffer = cv2.imencode('.jpg', tmp)
        show = buffer.tobytes()
    return flask.Response(show, mimetype = 'multipart/x-mixed-replace;')
    
    
@app.route("/choose_file", methods=["POST"])
def choose_file():
    global show_pic
    if flask.request.method == "POST":
        file = flask.request.files['photo']
        if file.filename == '':
            return flask.render_template('page.html')
        try:
            str = file.filename
            file = Image.open(file.stream).convert('RGB')
            show_pic = cv2.cvtColor(np.array(file), cv2.COLOR_RGB2BGR)
            return flask.render_template('page.html', show_status_area = str)
        except:
            return flask.render_template('page.html', show_status_area = '檔案格式不支援')
    
    return flask.render_template('page.html')

if __name__ == "__main__":
    port = 5000
    link = "http://127.0.0.1:{0}".format(port)
    webbrowser.open(link)
    app.run(host="0.0.0.0", debug = False, port = port)

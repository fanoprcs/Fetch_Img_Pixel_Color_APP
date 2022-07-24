var preshow = true;
    var now_x = 0, now_y = 0;
    var img = document.getElementById('imageid');
    img.style.cursor = 'crosshair';
    var image = new Image();
    image.crossOrigin = '' ;
    var ori_width, ori_height;
    var imageData;
    var ctx1 = document.getElementById('canva_show').getContext('2d');
    ctx1.fillStyle = 'rgb(255, 0, 0)';
    ctx1.fillRect(0, 0, 100, 100);
    image.onload = function(){
        ori_width = image.width, ori_height = image.height;
        let newCanvas = document.createElement("canvas");
        newCanvas.width = ori_width;
        newCanvas.height = ori_height;
        let ctx = newCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0, ori_width, ori_height);
        imageData = ctx.getImageData(0, 0, ori_width, ori_height);
    }
    image.src = img.src;
    
    function mousePosition(ev){
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop  - document.body.clientTop
        };
    }
    var tmp_alter = 0;
    function mouseMove(ev){
        ev = ev || window.event;
        var mousePos = mousePosition(ev);
        var tmpx = Number(mousePos.x)-img.offsetLeft;
        var tmpy = Number(mousePos.y)-img.offsetTop;
        if(tmpx >= 0 & tmpx < ori_width & tmpy >= 0 & tmpy < ori_height){
            now_x = tmpx;
            now_y = tmpy;
            if(tmp_alter == 0){
                let tmp = document.getElementById('current_table');
                tmp.style.display = 'block';
                var hint_current = document.getElementById('hint_current');
                hint_current.style.display = 'none';
            }
            preshow = false;
            }
        if(preshow == false){
            document.getElementById('xxx').innerHTML  = now_x;
            document.getElementById('yyy').innerHTML  = now_y;
            let a = imageData.data[(now_x + (now_y*ori_width))*4], b = imageData.data[(now_x + (now_y*ori_width))*4+1], c = imageData.data[(now_x + (now_y*ori_width))*4+2];
            document.getElementById('rr').innerHTML  = a;
            document.getElementById('gg').innerHTML  = b;
            document.getElementById('bb').innerHTML  = c;
            document.getElementById('hh').innerHTML  = String(toHex(Math.floor(a / 16))) + String(toHex(a % 16));
            document.getElementById('ee').innerHTML  = String(toHex(Math.floor(b / 16))) + String(toHex(b % 16));
            document.getElementById('xx').innerHTML  = String(toHex(Math.floor(c / 16))) + String(toHex(c % 16));
            ctx1.fillStyle = 'rgb(' + a + ', ' + b + ', ' + c + ')';
            ctx1.fillRect(0, 0, 100, 100);
        }
    }
    function toHex(x){
        if(x >= 10)
            return String.fromCharCode(87+x);
        return x;
    }
    document.onmousemove = mouseMove;
    function setPoint(){
        var ctx2 = document.getElementById('canva_choose').getContext('2d');
        var hint_choose = document.getElementById('hint_choose');
        hint_choose.style.display = 'none';
        var show_choose = document.getElementById('choose_table');
        show_choose.style.display = 'block';
        ctx2.fillStyle = 'rgb('+ String(document.getElementById('rr').innerHTML) + ', ' + String(document.getElementById('gg').innerHTML) +', ' + String(document.getElementById('bb').innerHTML) +')';
        ctx2.fillRect(0, 0, 100, 100);
        document.getElementById('choose_px').innerHTML = document.getElementById('xxx').innerHTML;
        document.getElementById('choose_py').innerHTML = document.getElementById('yyy').innerHTML;
        document.getElementById('choose_r').innerHTML = document.getElementById('rr').innerHTML;
        document.getElementById('choose_g').innerHTML = document.getElementById('gg').innerHTML;
        document.getElementById('choose_b').innerHTML = document.getElementById('bb').innerHTML;
        document.getElementById('choose_h').innerHTML = document.getElementById('hh').innerHTML;
        document.getElementById('choose_e').innerHTML = document.getElementById('ee').innerHTML;
        document.getElementById('choose_x').innerHTML = document.getElementById('xx').innerHTML;
        create_choose();
    }
    var id = 0;
    var select_px = [];
    var select_py = [];
    var select_r = [];
    var select_g = [];
    var select_b = [];
    var select_h = [];
    var select_e = [];
    var select_x = [];
    function create_choose(){
        select_px.push(document.getElementById('choose_px').innerHTML);
        select_py.push(document.getElementById('choose_py').innerHTML);
        select_r.push(document.getElementById('choose_r').innerHTML);
        select_g.push(document.getElementById('choose_g').innerHTML);
        select_b.push(document.getElementById('choose_b').innerHTML);
        select_h.push(document.getElementById('choose_h').innerHTML);
        select_e.push(document.getElementById('choose_e').innerHTML);
        select_x.push(document.getElementById('choose_x').innerHTML);
        let tmpCanvas = document.createElement("canvas");
        tmpCanvas.classList.add('choose_canvas');
        tmpCanvas.style.cursor = 'pointer';
        tmpCanvas.width = 75;
        tmpCanvas.height = 75;
        tmpCanvas.id = id;
        var tmp_ctx = tmpCanvas.getContext('2d');
        tmp_ctx.fillStyle = 'rgb('+ String(document.getElementById('choose_r').innerHTML) + ', ' + String(document.getElementById('choose_g').innerHTML) +', ' + String(document.getElementById('choose_b').innerHTML) +')';
        tmpCanvas.onclick = function(){
            set_current(tmpCanvas.id);
        };//方法有參數時，不能用onclick = 方法名(參數)，需加上function()
        tmp_ctx.fillRect(0, 0, 75, 75);
        document.getElementById('past_data').appendChild(tmpCanvas);
        id++;
    }
    function set_current(id){        
        var ctx3 = document.getElementById('selected_canvas').getContext('2d');
        ctx3.fillStyle = 'rgb('+ select_r[id] + ', ' + select_g[id] +', ' + select_b[id] +')';;
        ctx3.fillRect(0, 0, 100, 100);
        document.getElementById('selected_px').innerHTML = select_px[id];
        document.getElementById('selected_py').innerHTML = select_py[id];
        document.getElementById('selected_r').innerHTML = select_r[id];
        document.getElementById('selected_g').innerHTML = select_g[id];
        document.getElementById('selected_b').innerHTML = select_b[id];
        document.getElementById('selected_h').innerHTML = select_h[id];
        document.getElementById('selected_e').innerHTML = select_e[id];
        document.getElementById('selected_x').innerHTML = select_x[id];
        var show_selected = document.getElementById('selected_table');
        show_selected.style.display = 'block';
    }
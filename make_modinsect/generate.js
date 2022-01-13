const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
//座標補正
const x_correction = 20;
const y_correction = 20;
const reduction = 0.25;
const pt_reduction = 0.6;
//円
const x_circles_center = [130,387,644,901,1158,1415,1672,1929];
const y_circles_center = [328.4,328.4,328.4,328.4,328.4,328.4,328.4,328.4];
const circles_radius = [130,130,130,130,130,130,130,130];

//線
const x_line_1st = [228.5,144.6,837.1,892.6,2053.1,2234.4];
const y_line_1st = [0,415.4,432.7,375.5,292.6,493.6];
const x_line_2nd = [ 25.7,213.7,822.4,956.3,2159,2159];
const y_line_2nd = [534.9,555.7,466.1,535.6,181,181];
const line_point = [2.5,1.5,1.5,1.5,2.5,2.5];
const line_ontop = [false,true,true,true,true,true];

window.onload = function(){
  canvas.style.border = "2px solid green";
}
  
function generate(){
  //初期化
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  

  //円を描く
  for(var i=0;i<8;i++){
    var now_x = x_circles_center[i]*reduction+x_correction;
    var now_y = y_circles_center[i]*reduction+y_correction;
    var now_r =   circles_radius[i]*reduction;
    draw_circle(now_x,now_y,now_r);
  }
  
  //線を描く
  for(var i=0;i<6;i++){
    var x_begin = x_line_1st[i]*reduction+x_correction;
    var y_begin = y_line_1st[i]*reduction+y_correction;
    var x_end   = x_line_2nd[i]*reduction+x_correction;
    var y_end   = y_line_2nd[i]*reduction+y_correction;
    var pt = line_point[i]*pt_reduction;
    draw_line(x_begin,y_begin,x_end,y_end,pt,line_ontop[i]);
  }
}

function draw_circle(now_x,now_y,now_r){
  //色を決定
  var rgbs = [0.0,0.0,0.0];
  for(var j=0;j<3;j++){
    var rand = Math.floor(Math.random()*256);
    rgbs[j] = rand;
  }

  //描画
  ctx.beginPath();
  ctx.strokeStyle = `rgb(${rgbs[0]},${rgbs[1]},${rgbs[2]})`;
  ctx.fillStyle = `rgb(${rgbs[0]},${rgbs[1]},${rgbs[2]})`;
  ctx.arc(now_x,now_y,now_r,0,Math.PI*2,true);
  ctx.fill();
}
function draw_line(x_begin,y_begin,x_end,y_end,pt,ontop){
  //色は黒
  //描画
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = pt;
  ctx.moveTo(x_begin,y_begin);
  ctx.lineTo(x_end,y_end);
  ctx.globalCompositeOperation = (ontop ? "source-over":"destination-over");
  ctx.stroke();
}
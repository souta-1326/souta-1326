document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('board');
  canvas.style.border = "2px solid green";
});
function generate(){
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
  //円の色
  let circles_color = [...Array(8)].map(() => Array(3).fill(0));
  let color_outofrange_count = 0;
  for(let Col=0;Col<8;Col++){
    for(let Row=0;Row<3;Row++){
      let Pos_value = document.getElementById(`color_specify_number_${Row}${Col}`).value;
      if(Pos_value === ""){
        alert("値が埋まっていない、または数値が壊れている部分があります。");
        return;
      }
      if(Pos_value.indexOf(".") != -1){
        alert("こちら小数警察です。整数を使用してください。");
        return;
      }
      if(Pos_value.length > 11 || Pos_value < -2147483648 || Pos_value > 2147483647){
        if(Pos_value[0] == "-"){
          alert("値があまりにも小さいので、modinsect<256>は怯えてしまいました。");
        }
        else{
          alert("値があまりにも大きいので、modinsect<256>は怯えてしまいました。");
        }
        return;
      }
      if(Pos_value < 0 || Pos_value > 255){
        color_outofrange_count += 1;
        Pos_value = (Pos_value%256+256)%256;
      }
      circles_color[Col][Row] = Pos_value;
    }
  }
  if(color_outofrange_count){
    alert(`範囲外の値が入力されたようです。\nmodinsect<256>がすぐさま${color_outofrange_count}匹駆けつけて、値をmod 256にしてくれました。`);
    for(let Col=0;Col<8;Col++){
      for(let Row=0;Row<3;Row++){
        let Pos = document.getElementById(`color_specify_number_${Row}${Col}`);
        Pos.value = (Pos.value%256+256)%256;
      }
    }
  }
  //線
  const x_line_1st = [228.5,144.6,837.1,892.6,2053.1,2234.4];
  const y_line_1st = [0,415.4,432.7,375.5,292.6,493.6];
  const x_line_2nd = [ 25.7,213.7,822.4,956.3,2159,2159];
  const y_line_2nd = [534.9,555.7,466.1,535.6,181,181];
  const line_point = [2.5,1.5,1.5,1.5,2.5,2.5];
  const line_ontop = [false,true,true,true,true,true];

  //初期化
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  

  //円を描く
  for(let i=0;i<8;i++){
    let now_x = x_circles_center[i]*reduction+x_correction;
    let now_y = y_circles_center[i]*reduction+y_correction;
    let now_r =   circles_radius[i]*reduction;
    let red = circles_color[i][0];
    let green = circles_color[i][1];
    let blue = circles_color[i][2];
    draw_circle(now_x,now_y,now_r,red,green,blue);
  }
  
  //線を描く
  for(let i=0;i<6;i++){
    let x_begin = x_line_1st[i]*reduction+x_correction;
    let y_begin = y_line_1st[i]*reduction+y_correction;
    let x_end   = x_line_2nd[i]*reduction+x_correction;
    let y_end   = y_line_2nd[i]*reduction+y_correction;
    let pt = line_point[i]*pt_reduction;
    draw_line(x_begin,y_begin,x_end,y_end,pt,line_ontop[i]);
  }
}

function draw_circle(now_x,now_y,now_r,red,green,blue){
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');

  //描画
  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = `rgb(${red},${green},${blue})`;
  ctx.arc(now_x,now_y,now_r,0,Math.PI*2,true);
  ctx.fill();
}
function draw_line(x_begin,y_begin,x_end,y_end,pt,ontop){
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
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
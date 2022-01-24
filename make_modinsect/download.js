function download(){
  const canvas = document.getElementById('board');
  const modinsect_link = document.createElement("a");
  modinsect_link.href = canvas.toDataURL();
  modinsect_link.download = "modinsect.png";
  modinsect_link.click();
}
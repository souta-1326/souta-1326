document.addEventListener('DOMContentLoaded', function() {
  Randomize_All();
});
function Randomize(Col){
  for(var Row=0;Row<3;Row++){
    var Pos = document.getElementById(`color_specify_number_${Row}${Col}`);
    Pos.value = Math.floor(Math.random()*256);
  }
}
function Randomize_All(){
  for(var Col=0;Col<8;Col++){
    Randomize(Col);
  }
  if(document.getElementById("color_specify_generate_instantly").checked){
    generate();
  }
}
console.log('Loaded!');
console.log('musa | power');


var img  = document.getElementById('madi');
 img.onclick = (move);
 
 
 function move(){
     img.style.marginLeft = '100px';
     img.style.marginRight = '200px';
 }
 
 setInterval(move, 2000);
 
 
console.log('Loaded!');
console.log('musa | power');

num = 0;
var img  = document.getElementById('madi');
 img.onclick = (move);
 
 var marginLeft = num;
 
 function moveRight(){
     marginLeft = marginLeft + 5;
     img.style.marginLeft = marginLeft + 'px';
     
 }
 
 
 
 function move(){
    if(marginLeft <  300){
          setInterval(moveRight, 50);
     }
     
 }
 

 
 
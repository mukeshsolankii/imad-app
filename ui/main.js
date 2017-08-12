console.log('Loaded!');
console.log('musa | power');


var img  = document.getElementById('madi');
 img.onclick = (move);
 
 var marginLeft = 0;
 
 function moveRight(){
     marginLeft = marginLeft + 5;
     img.style.marginLeft = marginLeft + 'px';
     
 }
 
 
 
 function move(){
    if(marginLeft ==  300){
         return 0;
     }
      setInterval(moveRight, 50);
 }
 

 
 
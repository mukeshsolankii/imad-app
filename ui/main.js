console.log('Loaded!');
console.log('musa | power');


var img  = document.getElementById('madi');
 img.onclick = (move);
 
 var marginLeft = 0;
 
 function moveRight(){
     marginLeft = marginLeft + 5;
     img.style.marginLeft = marginLeft + 'px';
     if(marginLeft ==  300){
         exit;
     }
 }
 
 
 
 function move(){
     img.style.marginLeft = '100px';
      setInterval(moveRight, 50);
 }
 

 
 
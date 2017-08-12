console.log('Loaded!');
console.log('musa | power');


var img  = document.getElementById('madi');
 img.onclick = (move);
 
 var marginLeft = 0;
 
 function moveRight(){
     marginLeft = marginLeft + 5;
     img.style.marginLeft = marginLeft + 'px';
     if(marginLeft > 300){
         marginLeft= 0;
         moveRight();
     }
 }
 
 
 
 function move(){
  
          setInterval(moveRight, 50);
     
     
 }
 

 
 
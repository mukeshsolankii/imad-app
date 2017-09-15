console.log('Loaded!');
console.log('musa | power');


var img  = document.getElementById('madi');
 img.onclick = (move);
 
 var marginLeft = 0;
 
 function moveRight(){
     marginLeft = marginLeft + 5;
     img.style.marginLeft = marginLeft + 'px';
     if(marginLeft > 300){
         marginLeft= -300;
         moveRight();
     }
 }
 
 function move(){
          setInterval(moveRight, 50);
 }
 
 //*************************************************//

  
 var button = document.getElementById('btn');
  var counter = 0;
  
  button.onclick = function(){
      counter = counter+ 1;
      var span = document.getElementById('count');
      span.innerHTML = counter.toString();
  };
  

//***************************************************//
var id= '1';
function print(){
 var name = document.getElementById(id).innerHTML = document.getElementById('name').value;
 id++;
}



 

 
 
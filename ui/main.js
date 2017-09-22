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
  
  button.onclick = function(){
      var request = new XMLHttpRequest();
      
      request.onreadystatechange = function(){
          if(request.readyState === XMLHttpRequest.DONE){
              //do something ...
              if(request.status === 200){
                  var counter = request.responseText;
                  var span = document.getElementById('count');
                  span.innerHTML = counter.toString();
              }
          }
          //not yet...
      }
      
        //make a request...
      request.open('GET','http://musasurvey1616.imad.hasura-app.io/counter',true);
      request.send(null);
  };
  

  
//***************************************************//
var id= '1';
function print(){
 var name = document.getElementById(id).innerHTML = document.getElementById('name').value;
 document.getElementById("name").value = "";
 id++;
}



 

 
 
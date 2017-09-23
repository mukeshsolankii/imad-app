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

function login(){
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //do something...
            if(request.status === 200){
                alert('credential is correct!!!');
            }else if(request.status === 403){
                alert('forbidden request!!');
            }else if(request.status === 500){
                alert('someting goes wrong to server');
            }
        }
        //not yet
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    //make request..
    request.open('POST','http://musasurvey1616.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type' , 'application/json');
    request.send(JSON.stringify({username : username , password : password}));
}

 

 
 
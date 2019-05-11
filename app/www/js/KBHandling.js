function uidHandleIn(){
    document.getElementById("formLogo").style.display="none";
    document.getElementById("formPhrase1").style.marginTop="25vh";
    document.getElementById("phoneInput").firstElementChild.style.height="8vh";
    document.getElementById("phoneNo").style.height="10vh";
    document.getElementById("submitPhone").style.height="14vh";
    return
}
function uidHandleOut(){
    document.getElementById("formLogo").style.display="block";
    document.getElementById("formPhrase1").style.marginTop="5vh";
    document.getElementById("phoneInput").firstElementChild.style.height="7vh";
    document.getElementById("phoneNo").style.height="8vh";
    document.getElementById("submitPhone").style.height="10vh";
    return
}
/////////////////////////////////////////////////
function vcHandleIn(){
    document.getElementById("formPhrase2").style.marginTop="20vh";
    document.getElementById("verificationInput").style.height="14vh";
   // document.getElementById("verificationInput").style.marginTop="4vh";
    document.getElementById("submitVC").style.height="18vh";
    return
}
function vcHandleOut(){
    document.getElementById("formPhrase2").style.marginTop="32vh";
    document.getElementById("verificationInput").style.height="8vh";
    //document.getElementById("verificationInput").style.marginTop="4vh";
    document.getElementById("submitVC").style.height="10vh";
    return
}
////////////////////////////////////////////////
function infoHandleIn(){
    document.getElementById("infoForm").firstElementChild.style.display="none";
    document.getElementById("formPhrase3").style.marginTop="14vh";
    document.getElementById("username").style.height="14vh";
    document.getElementById("submitInfo").style.height="18vh";
    return
}
function infoHandleOut(){
    document.getElementById("infoForm").firstElementChild.style.display="block";
    document.getElementById("formPhrase3").style.marginTop="2vh";
    document.getElementById("username").style.height="7vh";
    document.getElementById("submitInfo").style.height="10vh";
    return
}
function fsearchIn(){
    
    
    document.querySelectorAll(".navbar").forEach(function(elem){
        elem.style.height="14vh";
        elem.style.paddingTop="5vh";
      },this)
    
    
      document.querySelectorAll(".friend").forEach(function(elem){
        elem.style.height="18vh";
      },this)   

   document.getElementById("FsearchBTN").style.height="48px";
   document.getElementById("FsearchInput").style.height="46px";
   document.getElementById("Fsearch").style.height="22vh";
   return
}
/////////////////////////////////////////////////////////////
function fsearchOut(){

  //  navbar= document.getElementsByClassName("navbar");
  //  friend= document.getElementsByClassName("friend");
 
  document.querySelectorAll(".navbar").forEach(function(elem){
    elem.style.height="9vh";
    elem.style.paddingTop="1vh";
  },this)


  document.querySelectorAll(".friend").forEach(function(elem){
    elem.style.height="12vh";
  },this)
   
    
 
    document.getElementById("FsearchBTN").style.height="38px";
    document.getElementById("FsearchInput").style.height="36px";
    document.getElementById("Fsearch").style.height="8vh";
    return
 }
//////////////////////////////////////////////////
/////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
var kbStatus=false;

document.onreadystatechange = () => {

    if (document.readyState === 'complete') {

   
        //////////////////////////////////////////////////////     //////////search query delay
      


window.addEventListener("resize",function(){

    var phoneInpt=document.getElementById("phoneNo");
    var vcInpt   =document.getElementById("vc");
    var userInpt =document.getElementById("username");
    var searchQuery =document.getElementById("FsearchInput");

    
    if(!kbStatus){

        if(phoneInpt!=null){
            
            uidHandleIn();
        }
        if(vcInpt!=null){
            vcHandleIn();
        }
        if(userInpt!=null){
            infoHandleIn();
        }
        if(searchQuery!=null){
            fsearchIn();
        }
        
        
        kbStatus=true;

    }else{

        if(phoneInpt!=null){
            uidHandleOut();
        }
        if(vcInpt!=null){
            vcHandleOut();
        }
        if(userInpt!=null){
            infoHandleOut();
        }
        if(searchQuery!=null){
            fsearchOut();
        }
        

        kbStatus=false

    }

});
    }
};

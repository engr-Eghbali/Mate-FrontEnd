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
//////////////////////////////////////////////////
/////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
var kbStatus=false;

document.onreadystatechange = () => {

    if (document.readyState === 'complete') {

        var phoneInpt=document.getElementById("phoneNo");
        var vcInpt   =document.getElementById("vc")
        var userInpt =document.getElementById("username")


        //////////////////////////////////////////////////////
        //////////search query delay
      


window.addEventListener("resize",function(){
    
    if(!kbStatus){

        if(phoneInpt!=null)
        uidHandleIn();
        if(vcInpt!=null)
        vcHandleIn();
        if(userInpt!=null)
        infoHandleIn();
        
        kbStatus=true;

    }else{

        if(phoneInpt!=null)
        uidHandleOut();
        if(vcInpt!=null)
        vcHandleOut();
        if(userInpt!=null)
        infoHandleOut();

        kbStatus=false

    }

});
    }
};

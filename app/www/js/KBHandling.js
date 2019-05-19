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
//////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////
function profileIn(){

    document.getElementById("chooseAvatar").style.display="none";
    document.getElementById("profileMenu").lastElementChild.style.display="none";
    document.getElementById("profileMenu").firstElementChild.style.marginTop="10vh";
    document.querySelectorAll(".formInfo").forEach(el=>{
        el.style.height="16vh";
        el.style.fontSize="6vh";
    });
}

function profileOut(){

    document.getElementById("chooseAvatar").style.display="block";
    document.getElementById("profileMenu").lastElementChild.style.display="block";
    document.getElementById("profileMenu").firstElementChild.style.marginTop="5vh";
    document.querySelectorAll(".formInfo").forEach(el=>{
        el.style.height="6vh";
        el.style.fontSize="3vh";
    });
}
///////////////////////////////////////////////////////////
function addMeetingIn(){
    
    document.getElementById("addMeetingForm").lastElementChild.style.display="none";
    document.getElementById("meetingCHBX").style.display="none";
    document.getElementById("meetingTitle").style.marginTop="5vh";
    document.getElementById("meetingAddress").style.fontSize="3vh";
    document.getElementById("meetingFlist").style.height="14vh";
    document.getElementById("meetingMembers").style.fontSize="5vh";
    document.querySelectorAll(".formInput").forEach(el=>{
        el.style.height="9vh";
    })
    document.querySelector(".maskInput").style.fontSize="4.1vh";
    document.querySelectorAll(".meetIcon").forEach(el=>{
        el.style.height="10vh";
    });
    document.querySelectorAll(".stackedAvatar").forEach(el=>{
        el.style.width="10vh";
        el.style.height="10vh";
        el.style.marginTop="2%";
    });

}

function addMeetingOut(){

    document.getElementById("addMeetingForm").lastElementChild.style.display="block";
    document.getElementById("meetingCHBX").style.display="block";
    document.getElementById("meetingTitle").style.marginTop="3vh";
    document.getElementById("meetingAddress").style.fontSize="1.8vh";
    document.getElementById("meetingFlist").style.height="11vh";
    document.getElementById("meetingMembers").style.fontSize="3vh";
    document.querySelectorAll(".formInput").forEach(el=>{
        el.style.height="6vh";
    })
    document.querySelector(".maskInput").style.fontSize="2.1vh";
    document.querySelectorAll(".meetIcon").forEach(el=>{
        el.style.height="6vh";
    });
    document.querySelectorAll(".stackedAvatar").forEach(el=>{
        el.style.width="6vh";
        el.style.height="6vh";
        el.style.marginTop="8%";
    });

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
    var profileMenu=document.getElementById("profileMenu");
    var addMeetingMenu=document.getElementById("addMeetingMenu");
    
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
        if(profileMenu!=null){
            if(profileMenu.style.display=='block')
            profileIn();
        }
        if(addMeetingMenu!=null){
            if(addMeetingMenu.style.display=='block')
            addMeetingIn();
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
        if(profileMenu!=null){
            if(profileMenu.style.display=='none')
            profileOut();
        }
        if(addMeetingMenu!=null){
            if(addMeetingMenu.style.display=='none')
            addMeetingOut();
        }

        

        kbStatus=false

    }

});
    }
};

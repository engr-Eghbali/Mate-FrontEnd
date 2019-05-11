////global
var countDownID;

function beginAuth(){

    info=storageRetrieve("MateUserInfo");
    if(!info)
    return


    if(info.id=="" || info.vc=="")
    return

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(this.response==1){
            document.getElementById("signInPage").remove();
            
            if(!storageRetrieve("MateFriendsInfo")){
                retrieveFriendsList();
            }
            return
        }
        if(this.response==0){
            beginAuth();
        }
        if(this.response==-1){
            localStorage.removeItem("MateUserInfo")
            beginAuth()
        }else{

            alert("system error:7");
            location.reload();
        }
    }
    };
    xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/HandShake?id="+info.id+"&vc="+info.vc, true);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();



}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///document ready events
document.onreadystatechange = () => {

    if (document.readyState === 'complete') {

  
  


    }
};
    
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    ///////close sideMenu
function ToggleMenu(){
        
    document.getElementById("profileBTN").classList.toggle("closedMenu");
    setTimeout(function(){document.getElementById("upcomingBTN").classList.toggle("closedMenu");},200);
    setTimeout(function(){document.getElementById("friendBTN").classList.toggle("closedMenu");},250);
    setTimeout(function(){document.getElementById("pendingReqBTN").classList.toggle("closedMenu");},300);
    setTimeout(function(){document.getElementById("setMeetingBTN").classList.toggle("closedMenu");},350);
    setTimeout(function(){document.getElementById("sideBar").classList.toggle("hidden")},500)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//// local storage data retrieve by key
function storageRetrieve(key){
   
    var info=null;

    if(data=localStorage.getItem(key)) {
        try {
            info = JSON.parse(data); 
        } catch(e) {

            try {
                info = JSON.parse(data); 
            } catch (error) {
                alert("could not load data,login again");
                localStorage.removeItem(key);
                return null;
            }   
        }

    }else{    
        //show signInpage
        return null;
    }
    return info;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

///click on submit phone/mail btn
function submitPhone(){

    uid=document.getElementById("phoneNo").value;
    if(uid.length!=10){
        alert("correct phone your number")
        
    }else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response==0){
                alert("service error,try again");
                location.reload(); 
            }
            if(this.response==1){
                document.getElementById("uidForm").style.left=-100+"vh";
                setTimeout(function(){document.getElementById("uidForm").style.display="none"},1500);
                document.querySelector("#carousel :nth-child(2)").classList.add('blueDot');
                document.querySelector("#carousel :nth-child(1)").classList.remove('blueDot');
                setTimeout(function(){document.getElementById("verifyForm").style.display="block"},1500);
                document.getElementById("verifyForm").style.left=0+"vh";
                var tmp=JSON.stringify({id:"",vc:"",name:"",uid:uid,visibility:1,mail:"",avatar:""});
                localStorage.setItem("MateUserInfo",tmp);
                countDownID=setInterval(countDown,1000);

            }
               
        }
        };
        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/Auth?data="+uid, true);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    



    }
      
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////click on submit vc
function submitVC(){

    info=JSON.parse(localStorage.getItem("MateUserInfo"));
    vc=document.getElementById("vc").value;
    if(vc.length!=6){
        alert("correct your vc");
            
    }else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(this.response==0){
                    alert("service error,try again");
                    location.reload(); 
                }
                if(this.response==-1){
                    localStorage.removeItem("MateUserInfo");
                    location.reload();
                }else{

                    var responseArray=this.response.split("<>");

                    clearInterval(countDownID);
                    if(responseArray[1]=='' || responseArray[1]==''){
                        document.getElementById("verifyForm").style.left=-100+"vh";
                        setTimeout(function(){document.getElementById("verifyForm").style.display="none"},1500);
                        document.querySelector("#carousel :nth-child(2)").classList.remove('blueDot');
                        document.querySelector("#carousel :nth-child(3)").classList.add('blueDot');
                        setTimeout(function(){document.getElementById("infoForm").style.display="block"},1500);
                        document.getElementById("infoForm").style.left="0vh";
                        info.vc=vc;
                        info.id=responseArray[0];
                        localStorage.setItem("MateUserInfo",JSON.stringify(info));
                        return    
                    }else{
                        
                        document.getElementById("verifyForm").style.left=-100+"vh";
                        setTimeout(function(){document.getElementById("signInPage").remove();},1500);
                        info.vc=vc;
                        info.id=responseArray[0];
                        info.name=responseArray[1];
                        info.avatar=responseArray[2];
                        localStorage.setItem("MateUserInfo",JSON.stringify(info));
                        return;

                    }
                }
                   
            }
        };
        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/Verify?ID="+info.uid+"&vc="+vc, true);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
      
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

///////resend timer countDown
var duration = 120000;
function countDown(){
        
    duration-=1000 ;
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((duration % (1000 * 60)) / 1000);
    document.getElementById("countDown").innerHTML="0"+minutes+":"+seconds;

    if(duration==0){
        document.getElementById("countDown").innerHTML="00:00";
        clearInterval(countDownID);
        document.getElementById("resendVC").style.color="rgba(255, 183, 0, 1)";
        document.getElementById("resendVC").onclick=function(){
            submitPhone();
        }
        return;
    }

}
////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

///set imagePicker options
  function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,//FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

/////////uploadAvatar
function uploadAvatar(avatar){

    info=JSON.parse(localStorage.getItem("MateUserInfo"));

    var fd=new FormData();
    fd.append("id",info.id);
    fd.append("vc",info.vc);
    fd.append("avatar",avatar);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

         if(this.response==1){
             return true;
         }
         if(this.response==0){
             setTimeout(uploadAvatar,60000,avatar);
             return true;
         }
         if(this.response==-1){
             localStorage.removeItem("MateUserInfo");
             alert("bad request:7");
             return false;
         }else{
             return false;
         }
      
        }
           
    };
 
    xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/Avatar", true);
    //xhttp.setRequestHeader("Content-type", "multipart/form-data");
    xhttp.send(fd);

    

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////click on choose avatar btn
  function choosedAvatar(){

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something with image
        document.getElementById("chooseAvatar").style.backgroundImage="url('data:image/png;base64," + imageUri + "')";

        const img=new Image(); 
        img.src="data:image/png;base64," + imageUri 

        img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = 128;
            elem.height = 128;
            const ctx = elem.getContext('2d');
            // img.width and img.height will contain the original dimensions
            ctx.drawImage(img, 0, 0, 128, 128);
            elem.toBlob(function(blob){
                uploadAvatar(blob);
            },"image/png",1);

            info=JSON.parse(localStorage.getItem("MateUserInfo"));
            info.avatar=img.src;
            localStorage.setItem("MateUserInfo",JSON.stringify(info));    
        }

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);

  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////submit username and navigate ro main page
    function submitInfo(){


    var username=document.getElementById("username").value;
    if(username.length<4){
        alert("username must be at least 4ch long");
        return;
    }
    info=JSON.parse(localStorage.getItem("MateUserInfo"));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        if(this.response=="reserved"){
            alert("username taken");
            return;
        }
         if(this.response==1){

            info.name=username;
            localStorage.setItem("MateUserInfo",JSON.stringify(info));
            document.getElementById("signInPage").remove();

         }
         if(this.response==0){
             alert("request failed,try again");
             return;  
         }
         if(this.response==-1){
             localStorage.removeItem("MateUserInfo");
             alert("bad request:7");
             return false;
         }else{
             return false;
         }
      
        }
           
    };
 
    xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/UserName?id="+info.id+"&vc="+info.vc+"&username="+username, true);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();       

    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//// a function for clossing menu pages
function closeMenu(elemID){
    document.getElementById(elemID).style.right="-100vh";
    setTimeout(function(elemID){document.getElementById(elemID).style.display="none";},1000,elemID);
    
    if(elemID=="auxiliaryMap")
    setTimeout(function(){document.getElementById("map2").innerHTML=null},1000);
    return;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
///////a function for openning menu pages
function openMenu(elemID){

    switch(elemID){
        case "profileMenu":
        loadProfile();
        break;

        case "scheduleMenu":
        loadPage("scheduleMenu");
        retrieveMeetingsList();
        break;

        case "friendsMenu":
        loadPage("friendsMenu");
        //retrieveFriendsList()
        break;

        case "pendingsMenu":
        loadPage("pendingsMenu");
        break;

        case "auxiliaryMap":
        loadAUXmap();
        break;
        
        case "AddMeetingMenu":
        geoCoder(lastChoosedPlace);
        break;

        default:
        return
    }

    document.getElementById(elemID).style.display="block";
    setTimeout(function(elemID){document.getElementById(elemID).style.right="0vh"},10,elemID);
        
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

////////load profile info to forms
function loadProfile(){

    if(data=localStorage.getItem("MateUserInfo")) {
        try {
            info = JSON.parse(data); 
        } catch(e) {

            try {
                info = JSON.parse(data); 
            } catch (error) {
                alert("could not load info,login again");
                localStorage.removeItem("MateUserInfo");
                location.reload();
            }   
        }

    }else{    
        //show signInpage
        location.reload();
    }

    if(info.avatar){
       document.getElementById("chooseAvatar").style.backgroundImage="url("+info.avatar+")";
    }
    if(info.name){
        document.getElementById("profileUsername").value=info.name;
    }else{
        alert("pick a user name so you can connect with others!");
        document.getElementById("profileUsername").value="نام کاربری"
    }

    if(info.uid.includes("@")){
        document.getElementById("profileEmail").value=info.uid;
        document.getElementById("profilePhone").value="موبایل";
        document.getElementById("profileEmail").readOnly=true;
        document.getElementById("profileEmail").style.color="#999999";
    }else{
        document.getElementById("profilePhone").value=info.uid;
        document.getElementById("profileEmail").value="ایمیل";
        document.getElementById("profilePhone").readOnly=true;
        document.getElementById("profilePhone").style.color="#999999";
    }

    //////*
    if(info.mail.includes("@")){
        document.getElementById("profileEmail").value=info.mail;

    }

    if(info.visibility==1){
        document.getElementById("visibilityCHBX").checked=true;
    }else{
        document.getElementById("visibilityCHBX").checked=false;
    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

////////toggle user visibility
function visibilityToggle(){
    if(info=storageRetrieve("MateUserInfo")){
        if (document.getElementById("visibilityCHBX").checked){
            info.visibility=1;
            localStorage.setItem("MateUserInfo",JSON.stringify(info));
            return;
        }else{
            info.visibility=0;
            localStorage.setItem("MateUserInfo",JSON.stringify(info));
            return;
        }

    }else{
        ////handle not found...
        return
    }
    

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

/////save profile changes

function saveProfileChanges(){

    username=document.getElementById("profileUsername").value;
    email   =document.getElementById("profileEmail").value;
    info=storageRetrieve("MateUserInfo");

    if(username!=info.name){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
            if(this.response=="reserved"){
                alert("username taken");
                return;
            }
             if(this.response==1){
    
                info.name=username;
                localStorage.setItem("MateUserInfo",JSON.stringify(info));
                closeMenu("profileMenu");
             }
             if(this.response==0){
                 alert("request failed,try again");
                 return;  
             }
             if(this.response==-1){
                 localStorage.removeItem("MateUserInfo");
                 alert("bad request:7");
                 closeMenu("profileMenu");
                 return false;
             }else{
                 alert("request failed,try again");
                 return;
             }
          
            }
               
        };
     
        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/UserName?id="+info.id+"&vc="+info.vc+"&username="+username, true);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();           

    }

    if(email!=info.mail){
        info.mail=email;
        localStorage.setItem("MateUserInfo",JSON.stringify(info));
        closeMenu("profileMenu");
    }

    


}

//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////leave a meeting...
function leaveMeeting(element){

    geo=element.nextElementSibling.innerHTML;
    title=element.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;

    if(info=storageRetrieve("MateUserInfo")){


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
             if(this.response==-1){
                 localStorage.removeItem("MateMeetingsInfo");
                 alert("bad request:7");
                 return
             }
             if(this.response==0){
                 setTimeout(leaveMeeting,60000,element);
                 return;
             }
             if(this.responseText.length>10){
                /////////////
                element.parentNode.style.height="0vh";
                element.nextElementSibling.nextElementSibling.nextElementSibling.style.display="none";
                setTimeout(function(){element.parentNode.remove()},190);
                localStorage.setItem("MateMeetingsInfo",this.response);
                document.getElementById("updateMeetingsBTN").classList.remove("spining");
                return;

             }else{
                 
                 localStorage.setItem("MateMeetingsInfo",this.response);
                 return;
             }
            
          
        }else{
            document.getElementById("updateMeetingsBTN").classList.add("spining");
        }       
        };
     
        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/LeaveMeeting?id="+info.id+"&vc="+info.vc+"&title="+title+"&geo="+geo, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send();



    }else{

        ////handle if data not found

    }


    /////////////
    element.parentNode.style.height="0vh";
    element.nextElementSibling.nextElementSibling.nextElementSibling.style.display="none";
    setTimeout(function(){element.parentNode.style.display="none"},190);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////request for meetings list
function retrieveMeetingsList(){

    document.getElementById("updateMeetingsBTN").classList.add("spining");

    if(info=storageRetrieve("MateUserInfo")){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
             if(this.response==-1){
                 localStorage.removeItem("MateMeetingsInfo");
                 localStorage.removeItem("MateUserInfo");
                 alert("bad request:7");
                 location.reload();
                 return
             }
             if(this.response==0){
                 setTimeout(retrieveMeetingsList,60000);
                 return;
             }
             if((this.responseText.length)<10){
                 document.getElementById("eventContainer").innerHTML="<div id=\"Meeting404\">لیست قرار شما خالیست :)</div>";
                 document.getElementById("updateMeetingsBTN").classList.remove("spining");
                 return;

             }else{
                 
                 localStorage.setItem("MateMeetingsInfo",this.response);
                 loadPage("scheduleMenu");
                 document.getElementById("updateMeetingsBTN").classList.remove("spining");
                 return;
             }
            
          
        }else{
            document.getElementById("updateMeetingsBTN").classList.add("spining");
        }       
        };
     
        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/ReqMeetingList?id="+info.id+"&vc="+info.vc, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send();
    
    }else{
        document.getElementById("updateMeetingsBTN").classList.remove("spining");
        document.getElementById("updateMeetingsBTN").innerHTML="<i class=\"fas fa-times\"></i>";
        setTimeout(function(){document.getElementById("updateMeetingsBTN").innerHTML="<i class=\"fas fa-undo\"></i>"},1000);
    }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////confirm generator
function makeConfirm(msg,func,arg){

    document.getElementById("msg").innerHTML=msg;
    document.getElementById("confirmY").onclick=function(){func(arg);closePopup()};
    document.getElementById("popupPage").style.display="block";

}
/////
function closePopup(){
    document.getElementById("popupPage").style.display="none";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////ask for friendlist
function retrieveFriendsList(){

    document.getElementById("updateFriendsBTN").classList.add("spining");

    if(info=storageRetrieve("MateUserInfo")){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
    
             if(this.response==-1){
                 localStorage.removeItem("MateMeetingsInfo");
                 alert("bad request:7");
                 return
             }
             if(this.response==0){
                 setTimeout(retrieveMeetingsList,60000);
                 return;
             }
             if((this.responseText.length)<10){
                 document.getElementById("Flist").innerHTML="<div id=\"Friend404\">لیست دوستان شما خالیست :)</div>";
                 document.getElementById("updateFriendsBTN").classList.remove("spining");
                 return;

             }else{
                 
                 localStorage.setItem("MateFriendsInfo",this.response);
                 loadPage("friendsMenu");
                 document.getElementById("updateFriendsBTN").classList.remove("spining");
                 return;
             }
            
          
        }else{
            document.getElementById("updateFriendsBTN").classList.add("spining");
        }       
        };
     
        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/ReqFriendList?id="+info.id+"&vc="+info.vc, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send();
    
    }else{
        document.getElementById("updateFriendsBTN").classList.remove("spining");
        document.getElementById("updateFriendsBTN").innerHTML="<i class=\"fas fa-times\"></i>";
        setTimeout(function(){document.getElementById("updateFriendsBTN").innerHTML="<i class=\"fas fa-undo\"></i>"},1000);
    }



}
////////////////////////////////////////////////////////////


///////////asks for unfriend someone

function unfriend(el){
    
    fname=el.previousElementSibling.innerHTML;

    if(fname.length<3){
        return;
    }
    if(info=storageRetrieve("MateUserInfo")){

        data="id="+info.id+"&vc="+info.vc+"&target="+fname;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                if(this.response==-1){
                    localStorage.removeItem("MateUserInfo");
                    alert("bad request:7");
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return;
                }
                if(this.response==0){
                    setTimeout(unfriend,6000,el);
                    return;
                }
                if(this.response==1){

                    el.parentElement.style.height="0vh";
                    setTimeout(function(){el.parentElement.remove()},190);
                    Flist=storageRetrieve("MateFriendsInfo");

                    for(var i=0;i<Flist.length;i++){
                        if(Flist[i].Name==fname){
                            Flist.splice(i,1);
                        }
                    }

                    localStorage.setItem("MateFriendsInfo",Flist);
                    document.getElementById("updateFriendsBTN").classList.remove("spining");

                }else{
                    alert("request failed")
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return;
                }

                
                
  
            }else{
                document.getElementById("updateFriendsBTN").classList.add("spining");
            } 
        };

        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/Unfriend?"+data, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send();

    }
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////triger when focus on search input
var timeout = null;
function focusToFsearch(el){

            // Listen for keystroke events
            sinput=document.getElementById("FsearchInput");
        
            sinput.onkeyup = function (e) {
    
                
                document.getElementById("updateFriendsBTN").classList.add("spining");
                clearTimeout(timeout);
    
                // Make a new timeout set to go off
                timeout = setTimeout(function () {
    
                    ///////send query and response
    
                   
                    /////change limit to 3
                    if(sinput.value.length>2)
                        fSearch(sinput.value);
        
                }, 1500);
            };
            //////////////////////////////////////////////////
            //////////////////////////////////////////////////
    

    document.getElementById("Flist").style.display="none";
    document.getElementById("Slist").style.display="block";
    document.getElementById("FsearchBTN").style.backgroundImage="url('./assets/img/cross.svg')";
    document.getElementById("FsearchBTN").onclick=function(){ cancelFsearch()};
    

}
/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function cancelFsearch(){
    document.getElementById("Flist").style.display="block";
    document.getElementById("Slist").style.display="none";
    document.getElementById("FsearchInput").value='';
    document.getElementById("FsearchInput").blur();
    document.getElementById("FsearchBTN").style.backgroundImage="url('./assets/img/search.svg')";
    document.getElementById("FsearchBTN").onclick=function(){};
    document.getElementById("updateFriendsBTN").classList.remove("spining");


}

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

///////search for a username and map to <div>
function fSearch(Query){

    if(info=storageRetrieve("MateUserInfo")){

        if(Query==info.name){
            document.getElementById("Slist").innerHTML="<div id=\"search404\">دنبال خودت میگردی؟ :)</div> ";
            document.getElementById("updateFriendsBTN").classList.remove("spining");
            return;
        }
        if(friends=storageRetrieve("MateFriendsInfo")){

            var divisions='';
            friends.forEach(f=>{
                if(f.Name==Query){
                    divisions+= "<div class=\"friend\"><div class=\"favatar\" style=\"background-image:url('"+f.Avatar+"') \"></div><div class=\"fname\">"+f.Name+"</div><div class=\"cancelBTN\" onclick=\"makeConfirm(' مایل به حذف "+f.Name+" هستید؟',unfriend,this)\"></div></div>";
                    document.getElementById("Slist").innerHTML=divisions;
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return;
                }
            })
            if(divisions.length>10)
            return;
        }
        var data="id="+info.id+"&vc="+info.vc+"&query="+Query;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                if(this.response==0){
                    document.getElementById("Slist").innerHTML="<div id=\"search404\">نتیجه ای یافت نشد.</div> ";
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return;

                }
                if(this.response==-1){
                    document.getElementById("Slist").innerHTML="<div id=\"search404\">خطا در جست و جو.</div> ";
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return;
                }

                var divisions='';
                if(this.response.length>5){

                    element=JSON.parse(this.response);
                    divisions+= "<div class=\"friend\"><div class=\"favatar\" style=\"background-image:url('"+element.Avatar+"') \"></div><div class=\"fname\">"+element.Name+"</div><div class=\"cancelBTN\" style=\"background-image:url('./assets/img/addUser.svg');\" onclick=\"makeConfirm(' برای "+element.Name+" درخواست دوستی ارسال شود؟',frequest,this)\"></div></div>";
                    document.getElementById("Slist").innerHTML=divisions;
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return;




                }else{
                    document.getElementById("Slist").innerHTML="<div id=\"search404\">خطا در جست و جو.</div> ";
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return;
                }


  
            }else{
                document.getElementById("updateFriendsBTN").classList.add("spining");
            }    
        };

        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/Whois?"+data, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send();


    }else{

        ////handle if not found
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function frequest(account){

    
    name=account.previousElementSibling.innerHTML;

    if(info=storageRetrieve("MateUserInfo")){

        var data="id="+info.id+"&vc="+info.vc+"&frequest="+name;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                if(this.response==2){
                    alert("درخواست شما قبلا ثبت شده");
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return
                }
                if(this.response==0){
                    alert("کاربر یافت نشد");
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    return
                }
                if(this.response==-1){
                    alert("bad request:7");
                    localStorage.removeItem("MateUserInfo");
                    return
                }

                if(this.response==1){
                    document.getElementById("updateFriendsBTN").classList.remove("spining");
                    account.style.backgroundImage="url('./assets/img/clock.svg')";
                    return

                }

            }else{
                document.getElementById("updateFriendsBTN").classList.add("spining");
            }    
        };

        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/Frequest?"+data, true);
       //xhttp.setRequestHeader("Content-type", "multipart/form-data");
       xhttp.send();


    }else{
        
        //handle not found

    }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadPage(id){
    switch(id){

        case "scheduleMenu":

            if(meetingsList=storageRetrieve("MateMeetingsInfo")){

                var divisions='';
                meetingsList.forEach(element => {
    
                    divisions+="<div class=\"event\"><button class=\"cancelBTN\" onclick=\"makeConfirm('آیا مایل به حذف قرار هستید؟',leaveMeeting,this)\"></button><div style=\"display:none\">"+element.Geo.X+","+element.Geo.Y+"</div><div style=\"display:none\">"+element.Crowd+"</div><div class=\"titleEvent\">"+element.Title+"</div><div class=\"hostEvent\">  دعوت شده از طرف "+element.Host+"</div><div class=\"timeEvent\">"+element.Time.substring(12,19)+"</div><div class=\"dateEvent\">"+element.Time.substring(0,10)+"</div></div>";
                
                });
    
                if(divisions.length>10){
                     document.getElementById("eventContainer").innerHTML=divisions;
                }
            }    
    
        break;

        case "friendsMenu":

            if(friends=storageRetrieve("MateFriendsInfo")){

                var divisions='';
                friends.forEach(element => {
    
                    divisions+= "<div class=\"friend\"><div class=\"favatar\" style=\"background-image:url('"+element.Avatar+"')\" onclick=\"panToFriend(this)\" ></div><div class=\"fname\">"+element.Name+"</div><div class=\"cancelBTN\" onclick=\"makeConfirm(' مایل به حذف "+element.Name+" هستید؟',unfriend,this)\"></div></div>";
                
                });
    
                if(divisions.length>10){
                    document.getElementById("Flist").innerHTML=divisions;
                }
            }

        break;

        case "pendingsMenu":
             
            retrievePendingsList();

        break;

        case "contactList":

        if(friends=storageRetrieve("MateFriendsInfo")){

            var divisions='';
            friends.forEach(element => {

                if(document.getElementById("meetingFlist").innerHTML.includes(element.Name)){
                    divisions+= "<div class=\"friend blueBackground\" onclick=\"invite(this)\"><div class=\"favatar\" style=\"background-image:url('"+element.Avatar+"')\" ></div><div class=\"fname\">"+element.Name+"</div></div>";    
                }else{

                    divisions+= "<div class=\"friend\" onclick=\"invite(this)\"><div class=\"favatar\" style=\"background-image:url('"+element.Avatar+"')\" ></div><div class=\"fname\">"+element.Name+"</div></div>";

                }
                
            
            });

            if(divisions.length>10){
                document.getElementById("contactList").innerHTML=divisions;
            }
        }



        break;
        default:
        return;

    }
}
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

////////fetch pending requests from server

function retrievePendingsList(){

    if(info=storageRetrieve("MateUserInfo")){

        var data="id="+info.id+"&vc="+info.vc;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                 if(this.response==0 || this.response.length<10){
                    document.getElementById("Reqlist").innerHTML="<div id=\"req404\">در حال حاضر درخواستی وجود ندارد.</div>";
                    document.getElementById("updatePendingsBTN").classList.remove("spining");
                      
                 }else{

                    list=JSON.parse(this.response);
                    var divisions='';
                    list.forEach(element => {
        
                        divisions+= "<div class=\"friend\"><div class=\"favatar\" style=\"background-image:url('"+element.SenderPic+"')\"></div><div class=\"fname\">"+element.SenderName+"</div> <div class=\"confirmBTN\" onclick=\"makeConfirm(' "+element.SenderName+" به لیست دوستان اضافه شود؟',accFrequest,this)\"></div> <div class=\"cancelBTN\" onclick=\"makeConfirm(' مایل به حذف "+element.SenderName+" هستید؟',denyFrequest,this)\"></div></div>";
                    
                    });
                    document.getElementById("Reqlist").innerHTML=divisions;
                    document.getElementById("updatePendingsBTN").classList.remove("spining");

                 }
  
        }else{
            document.getElementById("updatePendingsBTN").classList.add("spining");
            document.getElementById("Reqlist").innerHTML="<div id=\"req404\">در حال بروز رسانی...</div>";
        }   
        };

        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/ReqPendingReqs?"+data, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send();


    }else{

        //handle not found

    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////accept recieved frequest
function accFrequest(el){

    name=el.previousElementSibling.innerHTML;
    if(info=storageRetrieve("MateUserInfo")){

        var data="id="+info.id+"&vc="+info.vc+"&fname="+name;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                if(this.response==0){
                    setTimeout(accFrequest,10000,el);
                    return

                }
                if(this.response==-1){
                    localStorage.removeItem("MateUserInfo");
                    alert("bad request:7");
                    return;
                }
                if(this.response==1){

                    el.parentElement.style.height="0vh";
                    el.parentElement.remove();
                    document.getElementById("updatePendingsBTN").classList.remove("spining");
                    retrieveFriendsList();
                    return

                }else{
                    alert("Request failed,try again");
                    document.getElementById("updatePendingsBTN").classList.remove("spining");
                    return
                }
  
            }else{
                document.getElementById("updatePendingsBTN").classList.add("spining");
            }    
       };


      xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/AccFrequest?"+data, true);
      //xhttp.setRequestHeader("Content-type", "multipart/form-data");
      xhttp.send();


    }else{

    }


}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////deny recieved frequest
function denyFrequest(el){

    name=el.previousElementSibling.innerHTML;
    if(info=storageRetrieve("MateUserInfo")){

        var data="id="+info.id+"&vc="+info.vc+"&target="+name;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                if(this.response==0){
                    alert("مجددا تلاش کنید");
                    return

                }
                if(this.response==-1){
                    localStorage.removeItem("MateUserInfo");
                    alert("bad request:7");
                    return;
                }
                if(this.response==1){

                    el.parentElement.style.height="0vh";
                    el.parentElement.remove();
                    document.getElementById("updatePendingsBTN").classList.remove("spining");
                    loadPage("pendingsMenu");
                    return

                }else{
                    alert("Request failed,try again");
                    document.getElementById("updatePendingsBTN").classList.remove("spining");
                    return
                }
  
            }else{
                document.getElementById("updatePendingsBTN").classList.add("spining");
            }    
       };


      xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/DenyFrequest?"+data, true);
      //xhttp.setRequestHeader("Content-type", "multipart/form-data");
      xhttp.send();


    }else{

    }


}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



////get choosed location,format to address,close auxMap and page to meetingForm
function loadMeetingForm(){
    //lastChoosedPlace

    ////////////////generate time string
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) 
        {
            dd='0'+dd;
        } 

    if(mm<10) 
        {
            mm='0'+mm;
        } 
    today = yyyy+"-"+mm+"-"+dd;
    
    
    document.getElementById("meetingDate").value=today;
    
    updateTimeBoard();
    closeMenu("auxiliaryMap");
    openMenu("AddMeetingMenu");

}

////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

///update Time pallet when user choosed time
function updateTimeBoard(){

    var date = new Date(document.getElementById("meetingDate").value);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("timeBoard").innerHTML= date.toLocaleDateString('fa-IR',options);
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////when wants to see contacts to add
function chooseContact(){
    
    document.getElementById("contactList").style.display="block";
    document.getElementById("contactList").style.top="unset";
    loadPage("contactList");
    document.getElementById("saveMeeting").innerHTML="ذخیره";
    document.getElementById("saveMeeting").setAttribute("onclick","closeContactList()");
    document.getElementById("cancelAddMeeting").setAttribute("onclick","closeContactList()");
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////when tap on contact to select...

function invite(el){
    
    el.classList.toggle("blueBackground");
    name=el.lastChild.innerHTML;
     
    list=document.getElementById("meetingFlist").innerHTML;

    if(list.includes(name)){
        list=list.replace(name+"<br>",'');
    }else{
        list+=name+"<br>";
    }
    

    document.getElementById("meetingFlist").innerHTML=list;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

///////save invited friends,find thier ids and close contactlist
function getInviteList(){

    list=document.getElementById("meetingFlist").innerHTML;

    usernameList=list.split("<br>");

    return usernameList;


}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////close contact list selector 
function closeContactList(){

    document.getElementById("contactList").style.top="-100vh";
    document.getElementById("cancelAddMeeting").setAttribute("onclick","closeMenu('AddMeetingMenu')");
    document.getElementById("saveMeeting").setAttribute("onclick","setMeeting('AddMeetingMenu')");
    setTimeout(function(){document.getElementById("contactList").style.display="none"},1500);
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setMeeting(){

    pathFinder(currentGeo.lat+","+currentGeo.lng,"32.637234, 51.676515");
    return;


    if(info=storageRetrieve("MateUserInfo")){

        if(friends=storageRetrieve("MateFriendsInfo")){
            title=document.getElementById("meetingTitle").value;
            date =document.getElementById("meetingDate").value;
            time =document.getElementById("meetingTime").value;
            crowd=document.getElementById("meetingFlist").innerHTML.split("<br>");
            var crowdIds='';
            geo=lastChoosedPlace;
    
            crowd.forEach(C=>{
                
                friends.forEach(F=>{
                    if (F.Name==C){
                        crowdIds+=F.ID+",";
                        
                    }
                    
                })
               
            })
            crowdIds=crowdIds.substring(0,49);

            
            
            
            if(title.length<3){
                alert("عنوان قرار را وارد کنید");
                return;
            }
            if(date.length<10){
                alert("تاریخ قرار را انتخاب کنید");
                return;
            }
    
            var data="id="+info.id+"&vc="+info.vc+"&title="+title+"&time="+date+"T"+time+":00Z&crowd="+crowdIds+"&geo="+geo.lat+","+geo.lng;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                if(this.response==-1){
                    localStorage.removeItem("MateUserInfo");
                    alert("bad request:7")
                    location.reload();
                    return;
                }
                if(this.response==0){
                    setTimeout(setMeeting,30000);
                    closeMenu("AddMeetingMenu");
                    return;
                }

                if(JSON.parse(this.responseText)){
                    localStorage.setItem("MateMeetingsInfo",this.responseText);
                    closeMenu("AddMeetingMenu");
                    return;
                }else{
                    alert("مجددا تلاش کنید");
                    return;
                }
                
                 
                 
            }    
            };
            xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/SetMeeting?"+data, true);
            //xhttp.setRequestHeader("Content-type", "multipart/form-data");
            xhttp.send();    


        }else{
            alert("لیست دوستان را بروزرسانی کنید");
            return;
        }

    }else{

        ///handle if not found
    }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////panTo user location in map and show info's
function panToFriend(el){

    name=el.nextElementSibling.innerHTML;
    var id='';
    var geo='';

    ////find friends id by name
    if(friendsInfo=storageRetrieve("MateFriendsInfo")){

        friendsInfo.forEach(f=>{
            if(f.Name==name){
                id=f.ID;
                return;
            }
        });

        ///get his geo by id
        if(id.length==24){

            if(friendsMap=storageRetrieve("MateMap")){

                friendsMap.forEach(f=>{
                    if(f.ID==id){
                        geo=f.Geo;
                        return;
                    }

                });

                if(geo.length<10){
                    alert("User unreachable...");
                    return;
                }else{

                    
                    pathFinder(currentGeo,geo,map);
                    closeMenu("friendsMenu");
                    ToggleMenu();

                }

            }else{
                ///handle when not found
            }

        }else{

            ///handle if <> 24
            return
        }



    }else{
        ////handle when not found
    }

}
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////



//localStorage.removeItem("MateUserInfo");

//set a meeting record
//var data="id=5cc06283f318f500048e7bc5&vc=195278&title=ملاقات&time=2012-11-01T22:08:41Z&crowd=Bob,Puttin&geo=54.4567,36.1234";
//var xhttp = new XMLHttpRequest();
//xhttp.onreadystatechange = function() {
//if (this.readyState == 4 && this.status == 200) {
//  alert(this.response);
//  
//}    
//};
//
//xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/SetMeeting?"+data, true);
////xhttp.setRequestHeader("Content-type", "multipart/form-data");
//xhttp.send();



// → "12/19/2012"



//beginAuth();

////5cc06283f318f500048e7bc5
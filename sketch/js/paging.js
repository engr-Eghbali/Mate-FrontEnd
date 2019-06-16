////global
var countDownID;

function beginAuth(){

    info=storageRetrieve("MateUserInfo");
    if(!info){
        document.getElementById("splashScreen").remove();
        return
    }
    


    if(info.id=="" || info.vc==""){
        document.getElementById("splashScreen").remove();
        return        
    }
    

    url="https://guarded-castle-67026.herokuapp.com/HandShake";
    data="id="+info.id+"&vc="+info.vc;
    serverPostRequest(url,data,AuthCallBack);

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////logging out

function logOut(){
    localStorage.removeItem("MateUserInfo");
    location.reload();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///document ready events
document.onreadystatechange = () => {

    if (document.readyState === 'complete') {

       



    }
};
    
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

function splashOmitter(){

    var div=document.createElement("div");
    div.innerHTML="<div id=\"splash\" class=\"spining\"></div><br><p0>Your Mate Is Near!</p0>";
    div.id="splashScreen";
    document.getElementsByTagName("body")[0].insertBefore(div,document.getElementsByTagName("body")[0].firstChild);

}
    
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

    splashOmitter();

    uid=document.getElementById("phoneNo").value;
    if(uid.length!=10){
        alert("correct phone your number")
        
    }else{

        url="https://guarded-castle-67026.herokuapp.com/Auth";
        data="data="+uid;
        serverPostRequest(url,data,submitPhoneCallBack);


    }
      
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////click on submit vc
function submitVC(){

    splashOmitter();
    info=JSON.parse(localStorage.getItem("MateUserInfo"));
    vc=document.getElementById("vc").value;
    if(vc.length!=6){
        alert("correct your vc");
            
    }else{
        url="https://guarded-castle-67026.herokuapp.com/Verify";
        data="ID="+info.uid+"&vc="+vc;
        serverPostRequest(url,data,submitPhoneCallBack);
      
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
            duration = 120000;
            document.getElementById("resendVC").style.color="rgba(255, 183, 0, 0.5)";
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

    splashOmitter();
    info=JSON.parse(localStorage.getItem("MateUserInfo"));

    var fd=new FormData();
    fd.append("id",info.id);
    fd.append("vc",info.vc);
    fd.append("avatar",avatar);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

         if(this.response==1){
             document.getElementById("splashScreen").remove();
             return true;
         }
         if(this.response==0){
             setTimeout(uploadAvatar,60000,avatar);
             document.getElementById("splashScreen").remove();
             return true;
         }
         if(this.response==-1){
             localStorage.removeItem("MateUserInfo");
             alert("bad request:7");
             location.reload();
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
            context.arc(64, 64, 64, 0, Math.PI * 2, true);
            context.clip();

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

    splashOmitter();

    var username=document.getElementById("username").value;
    if(username.length<4){
        alert("username must be at least 4ch long");
        return;
    }
    info=JSON.parse(localStorage.getItem("MateUserInfo"));

    url="https://guarded-castle-67026.herokuapp.com/UserName";
    data="id="+info.id+"&vc="+info.vc+"&username="+username;
    serverPostRequest(url,data,submitInfoCallBack);

    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//// a function for clossing menu pages
function closeMenu(elemID){
    document.getElementById(elemID).classList.remove("openMenuPage");
    setTimeout(function(elemID){document.getElementById(elemID).style.display="none";},1000,elemID);
    
    if(elemID=="auxiliaryMap")
    setTimeout(function(){document.getElementById("map2").innerHTML=null},1000);
    if(elemID=="billingPage")
    document.getElementById("Reqlist").style.display="block";
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
      //  retrieveMeetingsList();
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

        case "billingPage":
        document.getElementById("Reqlist").style.display="none";
        break;

        case "InvoiceMenu":
        break;

        default:
        return
    }

    document.getElementById(elemID).style.display="block";
    setTimeout(function(elemID){document.getElementById(elemID).classList.add("openMenuPage")},10,elemID);
        
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


    splashOmitter();
    username=document.getElementById("profileUsername").value;
    email   =document.getElementById("profileEmail").value;
    info=storageRetrieve("MateUserInfo");

    if(username!=info.name){
        url="https://guarded-castle-67026.herokuapp.com/UserName";
        data="id="+info.id+"&vc="+info.vc+"&username="+username;
        serverPostRequest(url,data,submitInfoCallBack);    

    }

    if(email!=info.mail){

        url="https://guarded-castle-67026.herokuapp.com/Email";
        data="id="+info.id+"&vc="+info.vc+"&mail="+email;
        serverPostRequest(url,data,mailChangeCallBack);    

    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////leave a meeting...
function leaveMeeting(element){

    geo=element.nextElementSibling.innerHTML;
    title=element.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML;

    if(info=storageRetrieve("MateUserInfo")){
       
        url="https://guarded-castle-67026.herokuapp.com/LeaveMeeting";
        data="id="+info.id+"&vc="+info.vc+"&title="+title+"&geo="+geo;
        serverPostRequest(url,data,leaveMeetingCallBack);    

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

        url="https://guarded-castle-67026.herokuapp.com/ReqMeetingList";
        data="id="+info.id+"&vc="+info.vc;
        serverPostRequest(url,data,retrieveMeetingsListCallBack);    
    
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

        url="https://guarded-castle-67026.herokuapp.com/ReqFriendList";
        data="id="+info.id+"&vc="+info.vc;
        serverPostRequest(url,data,retrieveFriendsListCallBack);    
    
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

        url="https://guarded-castle-67026.herokuapp.com/Unfriend";
        data="id="+info.id+"&vc="+info.vc+"&target="+fname;
        serverPostRequest(url,data,unfriendCallBack);    
    

 
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
           
                    if(Date.now() < (new Date(element.Time)).getTime())
                    divisions+="<div class=\"event\"><button class=\"cancelBTN\" onclick=\"makeConfirm('آیا مایل به حذف قرار هستید؟',leaveMeeting,this)\"></button><div style=\"display:none\">"+element.Geo.X+","+element.Geo.Y+"</div><div style=\"display:none\">"+element.Crowd+"</div><div style='height:-webkit-fill-available' onclick='panToMeeting(this)'><div class=\"titleEvent\">"+element.Title+"</div><div class=\"hostEvent\"> از طرف: "+element.Host+"</div><div class=\"timeEvent\">"+element.Time.substring(11,19)+"</div><div class=\"dateEvent\">"+element.Time.substring(0,10)+"</div></div></div>";
                
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
            loadMeetingHistory();

        break;

        case "contactList":

        if(friends=storageRetrieve("MateFriendsInfo")){

            var divisions='';
            friends.forEach(f => {

                divisions+= "<div class=\"friend\" onclick=\"invite(this)\"><div class=\"favatar\" style=\"background-image:url('"+f.Avatar+"')\" ></div><div class=\"fname\">"+f.Name+"</div></div>";
            
            });

            if(divisions.length>10){
                document.getElementById("contactList").innerHTML=divisions+"<div class=\"friend\"><div class=\"favatar\"></div><div class=\"fname\"></div></div><div class=\"friend\"><div class=\"favatar\"></div><div class=\"fname\"></div></div><div class=\"friend\"><div class=\"favatar\"></div><div class=\"fname\"></div></div><div class=\"friend\"><div class=\"favatar\"></div><div class=\"fname\"></div></div>";
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
                    //document.getElementById("Reqlist").innerHTML="<div id=\"req404\">در حال حاضر درخواستی وجود ندارد.</div>";
                    document.getElementById("Reqlist").innerHTML="";
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

///////////loading MeetingHistory and make them ready to add bill and show invoice
function loadMeetingHistory(){

    if(meetingsList=storageRetrieve("MateMeetingsInfo")){

        var divisions='';
        meetingsList.forEach(element => {
   
            if(Date.now() > (new Date(element.Time)).getTime())
            divisions+="<div class=\"event\" ><button class=\"addBillBTN\" onclick=\"addBill(this)\"></button><button class=\"cancelBTN\" onclick=\"makeConfirm('آیا مایل به حذف تاریخچه هستید؟',deletMeetingHistory,this)\"></button><div style=\"display:none\">"+element.Geo.X+","+element.Geo.Y+"</div><div style=\"display:none\">"+element.Crowd+"</div><div class=\"displayNone\">"+JSON.stringify(element.Invoice)+"</div><div style=\"height:-webkit-fill-available\" onclick=\"showInvoice(this)\"><div class=\"titleEvent\">"+element.Title+"</div><div class=\"hostEvent\">  از طرف "+element.Host+"</div><div class=\"dateEvent\">"+(new Date(element.Time).toLocaleString("en-US")) +"</div></div></div>";
        
        });

        if(divisions.length>10){
             document.getElementById("meetingHistory").innerHTML=divisions;
        }
    }    

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

    
    ///////////controlling alarm icon and input
    document.getElementById("alarmSetTime").addEventListener('click',function(e){

            document.getElementById("alarmSetIcon").style.backgroundImage="url('./assets/img/bell.svg')";
            document.getElementById("alarmSetIcon").style.zIndex="99";

    });

    document.getElementById("alarmSetIcon").addEventListener('click',function(){

            document.getElementById("alarmSetIcon").style.backgroundImage="url('./assets/img/bell-slash.svg')";
            document.getElementById("alarmSetIcon").style.zIndex="0";
            document.getElementById("alarmSetTime").value="";
    });
    
    /////////////////delete previous invited friend
    document.getElementById("meetingFlist").innerHTML="";
    
    updateTimeBoard();
    closeMenu("auxiliaryMap");
    openMenu("AddMeetingMenu");
    loadPage("contactList");

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
    
    document.getElementById("saveMeeting").innerHTML="ذخیره";
    document.getElementById("saveMeeting").setAttribute("onclick","closeContactList()");
    document.getElementById("cancelAddMeeting").setAttribute("onclick","closeContactList()");
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////when tap on contact to select...

function invite(el){
    
    var divisions='';
    var flg=false;
    el.classList.toggle("blueBackground");

    avatar=el.firstElementChild.style.backgroundImage;
    name=el.lastChild.innerHTML;
    
    list=document.getElementById("meetingFlist").children;

    
    if(list.length>0){
        
        [...list].forEach(f=>{
            if(f.id=="meetingFlist-"+name){
                document.getElementById("meetingFlist-"+name).remove();
                flg=true;
                return
            }
    
        });
        if(flg){
            return
        }
    }
  
    divisions+=document.getElementById("meetingFlist").innerHTML+"<div id='meetingFlist-"+name+"' class='stackedAvatar' style='background-image:"+avatar+"'></div>";
    

    document.getElementById("meetingFlist").innerHTML=divisions;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

///////save invited friends,find thier ids and close contactlist
function getInviteList(){

    list=document.getElementById("meetingFlist").children;

    var usernameList=[];

    [...list].forEach(f=>{

        console.log(f.id)
        usernameList.push(f.id.substring(13));

        console.log(usernameList);
    });

    return usernameList;


}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////close contact list selector 
function closeContactList(){

    document.getElementById("contactList").style.top="-100vh";
    document.getElementById("cancelAddMeeting").setAttribute("onclick","closeMenu('AddMeetingMenu')");
    document.getElementById("saveMeeting").setAttribute("onclick","setMeeting()");
    setTimeout(function(){document.getElementById("contactList").style.display="none"},1500);
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setMeeting(){

    splashOmitter();
    if(info=storageRetrieve("MateUserInfo")){

        if(friends=storageRetrieve("MateFriendsInfo")){
            title=document.getElementById("meetingTitle").value;
            date =document.getElementById("meetingDate").value;
            time =document.getElementById("meetingTime").value;
            alarm=document.getElementById("alarmSetTime").value;

            date1=new Date();
            date2=new Date(date+"T"+alarm+"Z");

            if(alarm!=''){

                diffTime=Math.abs(date2.getTime() - date1.getTime());
                const diffMinutes = Math.ceil(diffTime / (1000 * 60));

                cordova.plugins.notification.local.schedule({
        
                    title: title,
                    text: time+'قرار داری یادت نره!',
                    foreground: true,
                    icon:'file://assets/img/meetMarker.png',
                    //smallIcon: 'file://assets/img/meetMarker.png', ////mate icon
                    sound:  'file://sound.mp3',
                    actions: [{ id: 'yes', title: 'نشونم بده' }],
                    trigger: {in:diffMinutes ,unit: 'minute'} //  { at:alarm} 
                });
    
            }
            crowd=getInviteList();
            var crowdIds='';
            geo=lastChoosedPlace;
    
            crowd.forEach(C=>{
                
                friends.forEach(F=>{
                    if (F.Name==C){
                        crowdIds+=F.ID+",";
                        
                    }
                    
                })
               
            })
           
            crowdIds=crowdIds.substring(0,crowdIds.length-1);

            
            
            
            if(title.length<3){
                document.getElementById("splashScreen").remove();
                alert("عنوان قرار را وارد کنید");
                return;
            }
            if(date.length<10){
                document.getElementById("splashScreen").remove();
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

                    document.getElementById("splashScreen").remove();
                    setTimeout(setMeeting,30000);
                    closeMenu("AddMeetingMenu");
                    return;
                }

                if(JSON.parse(this.responseText)){
                    localStorage.setItem("MateMeetingsInfo",this.responseText);
                    document.getElementById("splashScreen").remove();
                    closeMenu("AddMeetingMenu");
                    return;
                }else{
                    document.getElementById("splashScreen").remove();
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
            document.getElementById("splashScreen").remove();
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
                    document.getElementById("backBTN").style.display="block";
                    document.getElementById("backBTN").style.left="2%";
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

//// remove route and infowindow,open side again and hide backBTN

function exitPan(){

    directionsDisplay.setDirections({routes: []});
    infoWindow.close();
    ToggleMenu()
    document.getElementById("backBTN").style.left="-20%";
    setTimeout(function(){document.getElementById("backBTN").style.display="none";},1200);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// pan to selected meeting and and show infowindow
function panToMeeting(el){

    geo=el.previousElementSibling.previousElementSibling.innerHTML;

    pathFinder(currentGeo,geo,map);
    closeMenu("scheduleMenu");
    document.getElementById("backBTN").style.display="block";
    document.getElementById("backBTN").style.left="2%";
    ToggleMenu();

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

////////make map pin marker for every person
function updateFmarkerTable(){
    
    if(info=storageRetrieve("MateUserInfo")){


        var data="id="+info.id+"&vc="+info.vc;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                 
            if(this.response==-1){
                localStorage.removeItem("MateUserInfo");
                alert("login again:7");
                location.reload();
            }else{
               
                pintable=JSON.parse(this.responseText);

                pintable.forEach((pin,i)=>{
                    tempIcon= {
                        url: "data:image/png;base64,"+pin.Pin,
                        size: new google.maps.Size(48, 48),
                        scaledSize: new google.maps.Size(48, 48), // scaled size
                        origin: new google.maps.Point(0,0), // origin
                        anchor: new google.maps.Point(24, 48) // anchor
                      };

                      FriendsMarkerTable.push({ID:pin.ID,Marker:new google.maps.Marker({ icon: tempIcon} )   })}

                )
                
            } 
            }    
        };

       xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/PinMap?"+data, true);
       //xhttp.setRequestHeader("Content-type", "multipart/form-data");
       xhttp.send();



    }else{
        //handle if not found
    }

    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////pan to marker when click on...
function panToMarker(marker){

    console.log(marker);
    position=marker.getPosition().lat()+","+marker.getPosition().lng();
    pathFinder(currentGeo,position,map);
    document.getElementById("backBTN").style.display="block";
    document.getElementById("backBTN").style.left="2%";
    ToggleMenu();

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////set marker for each meeting then init notification
function processMeetings(){

    if(MeetingsMarkerList!=[]){
        MeetingsMarkerList.forEach(m=>{m.setMap(null)});
    }

    Pin = {
        url: './assets/img/meetMarker.png',
        size: new google.maps.Size(32, 32),
        scaledSize: new google.maps.Size(32, 32), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(16, 32) // anchor
      };


    if(meetings=storageRetrieve("MateMeetingsInfo")){

        meetings.forEach((meeting,i)=>{
            
        /////set a marker
            MeetingsMarkerList.push(new google.maps.Marker({
                position: {lat: parseFloat(meeting.Geo.X), lng: parseFloat(meeting.Geo.Y)},
                map: map,
                //draggable:true,
                //animation: google.maps.Animation.DROP,  
                icon: Pin
            }));
            ///set onclick func to marker
            google.maps.event.addListener(MeetingsMarkerList[i], 'click',function(){ panToMarker(MeetingsMarkerList[i])});

            /////schedule notification for each meeting
           
            date=meeting.Time.split("T")[0].split("-");
            hour=meeting.Time.split("T")[1].replace("Z","").split(":");
            var TempDate=new Date(date[0],date[1],date[2],hour[0],hour[1],hour[2]);
            TempDate.setMinutes(TempDate.getMinutes()-45);
            //console.log(TempDate);

            date2=new Date(meeting.Time);
            date1=new Date();
            diffTime=Math.abs(date2.getTime() - date1.getTime());
            const diffMinutes = Math.ceil(diffTime / (1000 * 60));

           // cordova.plugins.notification.local.clearAll(cordova.plugins.notification.local.getIds());
            cordova.plugins.notification.local.schedule({
        
                title: meeting.Title,
                text: meeting.Time.split("T")[1].replace("Z","")+'قرار داری یادت نره!',
                foreground: true,
                icon:'file://assets/img/meetMarker.png',
                //smallIcon: 'file://assets/img/meetMarker.png', ////mate icon
                sound:  'file://sound.mp3',
                actions: [{ id: 'yes', title: 'نشونم بده' }],
                trigger: {in:diffMinutes ,unit: 'minute'} //  { at:TempDate}
            });
    

        })

    }else{
        //handle if not found
    }

}//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////// user request to add a bill on meeting(history)

function addBill(elem){

    document.getElementById("shareHoldersList").innerHTML="";
    geoDiv=elem.nextElementSibling.nextElementSibling;
    geo=geoDiv.innerHTML;
    crowdDiv=geoDiv.nextElementSibling;
    crowd=crowdDiv.innerHTML.split(",");
    title=crowdDiv.nextElementSibling.nextElementSibling.firstElementChild.innerHTML;
    var divisions='';

    if(Info=storageRetrieve("MateUserInfo")){
        divisions=" <div class=\"friend\" onclick=\"addShareHolder(this)\" > <div class=\"favatar\" style=background-image:url('"+Info.avatar+"')></div> <div class=\"fname\">"+Info.name+"</div> </div>";

    }

    if(Friends=storageRetrieve("MateFriendsInfo")){

    crowd.forEach(person=>{

        temp=" <div class=\"friend\" onclick=\"addShareHolder(this)\" > <div class=\"favatar\" ></div> <div class=\"fname\">"+person+"</div> </div>";
        for(let f of Friends){
            if(f.Name==person){
                temp=" <div class=\"friend\" onclick=\"addShareHolder(this)\" > <div class=\"favatar\" style=\"background-image:url('"+f.Avatar+"')\" ></div> <div class=\"fname\">"+f.Name+"</div> </div>";
                break;
            }
        }
        divisions+=temp;

    })

    
    document.getElementById("appendedBillInfo").innerHTML=title+"<>"+geo;//////append data
    document.getElementById("crowdListContainer").innerHTML=divisions;
    openMenu("billingPage");



        

    }else{
        //handle if not found
    }





}







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////open/close meeting crowd select form for shareHoldersList

function toggleCrowfForm(){
  
   document.getElementById("crowdForm").classList.toggle("displayBlock");
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////add selected person to shareHoldersList

function addShareHolder(el){

    
        var divisions='';
        var flg=false;
        el.classList.toggle("blueBackground");
    
        avatar=el.firstElementChild.style.backgroundImage;
        if(avatar.length<10){
            avatar="url('./assets/img/boy.svg')";
        }
        name=el.lastElementChild.innerHTML;
        console.log(el.lastElementChild.innerHTML)
        list=document.getElementById("shareHoldersList").children;
    
        
        ///maybe its remove request(even selects)
        if(list.length>0){
            divisions=document.getElementById("shareHoldersList").innerHTML;
            [...list].forEach(f=>{
                divid="shareHoldersList-"+name;
                if(f.id==divid){
                    document.getElementById("shareHoldersList-"+name).remove();
                    flg=true;
                    return;
                }
        
            });
 
        }
      if(!flg){
        divisions+="<div id='shareHoldersList-"+name+"' class='stackedAvatar' style=background-image:"+avatar+"></div>";
        document.getElementById("shareHoldersList").innerHTML=divisions;
      }
        
        
    
        
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function submitBill(){

    if(info=storageRetrieve("MateUserInfo")){

        shareHoldersDiv=document.getElementById("shareHoldersList").children;
        var shareHolders=[];
        [...shareHoldersDiv].forEach(div=>{
            shareHolders.push(div.id.substring(17));
        });
        sum=document.getElementById("addShareSum").value;
        title=document.getElementById("billTitle").value;
        meetingTitle=document.getElementById("appendedBillInfo").innerHTML.split("&lt;&gt;")[0];
        meetingGeo=document.getElementById("appendedBillInfo").innerHTML.split("&lt;&gt;")[1];
        console.log(meetingGeo);
        if(shareHoldersDiv.length<1){
            alert("حداقل یک فرد سهیم باید اضافه شود.");
            return;
        }
        if(sum<1){
            alert("مبلغ هزینه شده را وارد کنید.");
            return;
        }

        bill={Issuer:info.name,Title:title,Sum:sum,Share:shareHolders}

        var data="id="+info.id+"&vc="+info.vc+"&title="+meetingTitle+"&geo="+meetingGeo+"&bill="+JSON.stringify(bill);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                 document.getElementById("splashScreen").remove();

                 if(this.response==-1){
                     localStorage.removeItem("MateUserInfo");
                     alert("bad request:7");
                     location.reload();
                     return;
                 }
                 if(this.response==1){
                     closeMenu("billingPage");
                     return;
                 }
                 if(this.response==0){
                     alert("خطا...مجددا تلاش کنید");
                     return
                 }else{
                    setTimeout(submitBill,60000);
                    return;
                 }
  
            }    
        };

        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/Bill?"+data, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        splashOmitter();
        xhttp.send();


    }else{
        ////////handle if not found
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////process bills and show invoice of a history meeting

function showInvoice(elem){
 
    flg=true;
    friendsInfo=storageRetrieve("MateFriendsInfo");
    userInfo   =storageRetrieve("MateUserInfo")
    meetingTitle=elem.firstElementChild.innerHTML;
    meetingGeo=elem.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    issuerAvatar="./assets/img/boy.svg";
    shareListAvatar=[];
    userBillShare=0;
    userTotalShare=0;
    var shareListAvatarDivs='';
    var divisions='';
 
    billList=JSON.parse(elem.previousElementSibling.innerHTML)

    
    if(billList.length>0){

        billList.forEach(bill=>{

            ///making and init avatar(s)
            userShareOnBill=0;
            shareListAvatarDivs='';
            shareListAvatar=[];
            if(bill.Issuer==userInfo.name){
                issuerAvatar=userInfo.avatar;
            }
            for(let shareHolder of bill.Share ){
       
                if(shareHolder==userInfo.name){
                    shareListAvatar.push(userInfo.avatar);
                    userShareOnBill=parseInt(bill.Sum)/bill.Share.length;
                    userTotalShare+=userShareOnBill;
                    flg=false;
                    continue;
                }
  
                ///searching avatars
                for(let f of friendsInfo){

                    if(f.Name==bill.Issuer){
                        issuerAvatar=f.Avatar;
                    }
                    if (f.Name==shareHolder){
                        shareListAvatar.push(f.Avatar);
                        flg=false;
                        break;
                    }
                
                }

                if(flg){
                    shareListAvatar.push("./assets/img/boy.svg");
                }
                
////////////////////////////            
            }
            ///making bill el(s)
            shareListAvatar.forEach(avatar=>{
                shareListAvatarDivs+="<div class=\"stackedAvatar\" style=\"background-image:url('"+avatar+"')\"></div>";
                });
            divisions+="<div class=\"bill\"> <div class=\"bill-leftside\"> <div class=\"billTitle\">"+bill.Title+"</div> <div class=\"billIssuer\"><div class=\"billIssuerAvatar\" style=\"background-image=url('"+issuerAvatar+"')\"></div> <div class=\"billIssuerName\">"+bill.Issuer+"</div> </div> </div> <div class=\"bill-rightside\"> <div class=\"billSum\">"+bill.Sum+"</div><div class=\"billShare\"> <div class=\"userBillShare\">"+userShareOnBill+" X</div> <div class=\"billShareList\"> "+shareListAvatarDivs+"</div></div></div></div>";
            
        });

        document.getElementById("billListContainer").innerHTML=divisions;
        document.getElementById("TotalShareBanner").innerHTML="<p1>سهم شما:</p1><br><p2>"+userTotalShare+"</p2>"+"<div id=\"invoiceLocator\" onclick=\"panToInvoice('"+meetingGeo+"')\">Title  <i class=\"fas fa-map-marked-alt\"></i></div>";
        openMenu("InvoiceMenu");


    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function panToInvoice(geoStr){
    pathFinder(currentGeo,geoStr,map);
    closeMenu("InvoiceMenu");
    closeMenu("pendingsMenu");
    ToggleMenu();
    document.getElementById("backBTN").style.display="block";
    document.getElementById("backBTN").style.left="2%";

}
//////////////////////////// update invoices(retrieve meetingsList+load history meets)
//async function updateInvoice(){
//
//    retrieveMeetingsList();
//    loadMeetingHistory();
//}
////////////////////////////pinmaker client side failed due to CORS privacy violation, Do somthing about...
//function pinMaker(id,avatar){
//
//    rnd=Math.floor((Math.random()*10)+1);
//
//    var can = document.getElementById("pinCan");
//    var ctx = can.getContext('2d');
//
//    var basePin = new Image();
//    var pic     = new Image();
//
//   
//
//    basePin.onload = function() {
//    ctx.drawImage(basePin, 0, 0,64,64);
//
//        var scale = Math.min(40 / 128, 40 / 128);
//        // get the top left position of the image
//        var x = 12;
//        var y = 6;
//       ctx.drawImage(pic, x, y, 128 * scale, 128 * scale);
//
//       pin=can.toDataURL()
//       
//      console.log();
//
//       row={ID:id,Pin:pin};
//       
//       Cin = {
//        url: row.Pin,
//        size: new google.maps.Size(64, 64),
//        scaledSize: new google.maps.Size(64, 64), // scaled size
//        origin: new google.maps.Point(0,0), // origin
//        anchor: new google.maps.Point(32, 64) // anchor
//     };
//
//
//    new google.maps.Marker({
//        position: {lat: parseFloat(currentGeo.lat), lng: parseFloat(currentGeo.lng)},
//        map: map,
//        //draggable:true,
//        animation: google.maps.Animation.DROP,  
//        icon: Cin
//    });
//
//    }
//
//    basePin.src ="http://www.myiconfinder.com/uploads/iconsets/128-128-6096188ce806c80cf30dca727fe7c237.png"; // "./assets/pins/"+rnd+".svg";
//    pic.src = "http://www.myiconfinder.com/uploads/iconsets/128-128-6096188ce806c80cf30dca727fe7c237.png";
//}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//localStorage.removeItem("MateUserInfo");

//set a meeting record
//var data="id=5cc06283f318f500048e7bc5&vc=331949";
//var xhttp = new XMLHttpRequest();
//xhttp.onreadystatechange = function() {
//if (this.readyState == 4 && this.status == 200) {
 // console.log(this.response);
  
//}    
//};

//xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/PinMap?"+data, true);
////xhttp.setRequestHeader("Content-type", "multipart/form-data");
//xhttp.send();



// → "12/19/2012"



//


//localStorage.removeItem("MateFriendsInfo");

////5cc06283f318f500048e7bc5


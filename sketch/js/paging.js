////global
var countDownID;

function beginAuth(){

    if(data=localStorage.getItem("MateUserInfo")) {
        try {
            info = JSON.parse(data);
           
            
        } catch(e) {
            alert(e); // error in the above string (in this case, yes)!
             ///clear localStorage
             localStorage.removeItem("MateUserInfo")
             //document.getElementById("signInPage").style.display="block";
             //show signInPage
             return
            }
        }else{
            //document.getElementById("signInPage").style.display="block";
            //show signInpage
            return
        }

        if(info.id=="" || info.vc=="")
        return

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(this.response==1){
            document.getElementById("signInPage").remove();
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


///click on submit phone/mail btn
function submitPhone(){

    uid=document.getElementById("phoneNo").value;
    if(uid.length!=10){
        alert("correct phone your number")
        
    }else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response=="0"){
                alert("service error,try again");
                location.reload(); 
            }
            if(this.response=="1"){
                document.getElementById("uidForm").style.left=-100+"vh";
                setTimeout(function(){document.getElementById("uidForm").style.display="none"},1500);
                document.querySelector("#carousel :nth-child(2)").classList.add('blueDot');
                document.querySelector("#carousel :nth-child(1)").classList.remove('blueDot');
                setTimeout(function(){document.getElementById("verifyForm").style.display="block"},1500);
                document.getElementById("verifyForm").style.left=0+"vh";
                var tmp=JSON.stringify({id:"",vc:"",name:"",uid:uid,avatar:""});
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
                if(this.response=="0"){
                    alert("service error,try again");
                    location.reload(); 
                }
                if(this.response=="-1"){
                    localStorage.removeItem("MateUserInfo");
                    location.reload();
                }else{

                    var responseArray=this.response.split(",");

                    clearInterval(countDownID);
                    if(responseArray[1]=='' || responseArray[1]==''){
                        document.getElementById("verifyForm").style.left=-100+"vh";
                        setTimeout(function(){document.getElementById("verifyForm").style.display="none"},1500);
                        document.querySelector("#carousel :nth-child(2)").classList.remove('blueDot');
                        document.querySelector("#carousel :nth-child(3)").classList.add('blueDot');
                        setTimeout(function(){document.getElementById("infoFrom").style.display="block"},1500);
                        document.getElementById("infoFrom").style.left=0+"vh";
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
             info.avatar=avatar;
             localStorage.setItem("MateUserInfo",JSON.stringify(info));
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
    var flag=true;

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
            },"image/png",1)
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
             alert("request failed,try agai");
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
    return;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////a function for openning menu pages
function openMenu(elemID){

    document.getElementById(elemID).style.display="block";
    setTimeout(function(elemID){document.getElementById(elemID).style.right="0vh"},10,elemID);
    return;
}


//localStorage.removeItem("MateUserInfo");



beginAuth();


////5cc06283f318f500048e7bc5
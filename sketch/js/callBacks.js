function serverPostRequest(url,data,callBack){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callBack(this.response);
        }    
    };

    xhttp.open("POST", url+"?"+data, true);
    //xhttp.setRequestHeader("Content-type", "multipart/form-data");
    xhttp.send();


}






///////////////////////////////////////
function AuthCallBack(response){

    if(response==1){
    
        document.getElementById("signInPage").remove();
        setTimeout(()=>{document.getElementById("splashScreen").remove();},8000)

        if(!storageRetrieve("MateFriendsInfo")){
            retrieveFriendsList();
        }
        if(!storageRetrieve("MateMeetingsInfo")){
            retrieveMeetingsList();
        }else{
            processMeetings();
        }


        updateFmarkerTable();
        return
    }
    if(response==0){
        beginAuth();
    }
    if(response==-1){
        localStorage.removeItem("MateUserInfo")
        beginAuth()
    }else{

        alert("system error:7");
        location.reload();
    }
}
////////////////////////////////////////

///////////////////////////////////////
function submitPhoneCallBack(response){
    if(response==0){
        alert("service error,try again");
        location.reload(); 
    }
    if(response==1){
        document.getElementById("uidForm").style.left=-100+"vh";
        setTimeout(function(){document.getElementById("uidForm").style.display="none"},1500);
        document.querySelector("#carousel :nth-child(2)").classList.add('blueDot');
        document.querySelector("#carousel :nth-child(1)").classList.remove('blueDot');
        setTimeout(function(){document.getElementById("verifyForm").style.display="block"},1500);
        document.getElementById("verifyForm").style.left=0+"vh";
        var tmp=JSON.stringify({id:"",vc:"",name:"",uid:uid,visibility:1,mail:"",avatar:""});
        localStorage.setItem("MateUserInfo",tmp);
        countDownID=setInterval(countDown,1000);
        document.getElementById("splashScreen").remove();

    }
}
//////////////////////////////////////////

/////////////////////////////////////////

function submitVcCallBack(response){
    if(response==0){
        alert("service error,try again");
        location.reload(); 
    }
    if(response==-1){
        localStorage.removeItem("MateUserInfo");
        location.reload();
    }else{

        var responseArray=response.split("<>");

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
                    document.getElementById("splashScreen").remove();
                    return    
                }else{
                    
                    document.getElementById("verifyForm").style.left=-100+"vh";
                    setTimeout(function(){document.getElementById("signInPage").remove();},1500);
                    info.vc=vc;
                    info.id=responseArray[0];
                    info.name=responseArray[1];
                    info.avatar=responseArray[2];
                    localStorage.setItem("MateUserInfo",JSON.stringify(info));
                    document.getElementById("splashScreen").remove();
                    return;

                }
            }            
}
/////////////////////////////////

////////////////////////////////

function submitInfoCallBack(response){


        if(response=="reserved"){
            alert("username taken");
            document.getElementById("splashScreen").remove();
            return;
        }
         if(response==1){

            info.name=username;
            localStorage.setItem("MateUserInfo",JSON.stringify(info));
            document.getElementById("signInPage").remove();
            document.getElementById("splashScreen").remove();

         }
         if(response==0){
             alert("request failed,try again");
             document.getElementById("splashScreen").remove();
             return;  
         }
         if(response==-1){
             localStorage.removeItem("MateUserInfo");
             alert("bad request:7");
             location.reload();
             return false;
         }else{
             return false;
         }

}
//////////////////////////////////////////////

/////////////////////////////////////////////

function mailChangeCallBack(response){


        if(response=="reserved"){
            alert("email address taken");
            document.getElementById("splashScreen").remove();
            return;
        }
         if(response==1){

            info.mail=email;
            localStorage.setItem("MateUserInfo",JSON.stringify(info));
            closeMenu("profileMenu");
            document.getElementById("splashScreen").remove();

        }
         if(response==0){
             alert("request failed,try again");
             document.getElementById("splashScreen").remove();
             return;  
         }
         if(response==-1){
             localStorage.removeItem("MateUserInfo");
             alert("bad request:7");
             closeMenu("profileMenu");
             location.reload();
             return false;
         }else{
             alert("request failed,try again");
             document.getElementById("splashScreen").remove();
             return;
         }
      
}

//////////////////////////////////////////////

/////////////////////////////////////////////

function leaveMeetingCallBack(response){


         if(response==-1){
             localStorage.removeItem("MateMeetingsInfo");
             alert("bad request:7");
             return
         }
         if(response==0){
             setTimeout(leaveMeeting,60000,element);
             return;
         }
         if(responseText.length>10){
            /////////////
            element.parentNode.style.height="0vh";
            element.nextElementSibling.nextElementSibling.nextElementSibling.style.display="none";
            setTimeout(function(){element.parentNode.remove()},190);
            localStorage.setItem("MateMeetingsInfo",this.response);
            document.getElementById("updateMeetingsBTN").classList.remove("spining");
            return;

         }else{
             

            document.getElementById("eventContainer").innerHTML="<div id='Meeting404'>لیست قرار شما خالیست :)<br><div  onclick=\"(function(){closeMenu(\'scheduleMenu\');openMenu(\'auxiliaryMap\');})();return;\"> + اضافه کنید.</div></div>";
            localStorage.setItem("MateMeetingsInfo",this.response);
            document.getElementById("updateMeetingsBTN").classList.remove("spining");
            return;
         }
        
}

//////////////////////////////////////////////////

/////////////////////////////////////////////////

function retrieveMeetingsListCallBack(response){

  
         if(this.response==-1){
             localStorage.removeItem("MateMeetingsInfo");
             localStorage.removeItem("MateUserInfo");
             alert("bad request:7");
             location.reload();
             return false;
         }
         if(this.response==0){
             setTimeout(retrieveMeetingsList,60000);
             return false;
         }
         if((this.responseText.length)<10){
             document.getElementById("eventContainer").innerHTML="<div id='Meeting404'>لیست قرار شما خالیست :)<br><div  onclick=\"(function(){closeMenu(\'scheduleMenu\');openMenu(\'auxiliaryMap\');})();return;\"> + اضافه کنید.</div></div>";
             document.getElementById("updateMeetingsBTN").classList.remove("spining");
             return false;

         }else{
             
             localStorage.setItem("MateMeetingsInfo",this.response);
             loadPage("scheduleMenu");
             document.getElementById("updateMeetingsBTN").classList.remove("spining");
             setTimeout(processMeetings,200);
             return true;
         }
}

//////////////////////////////////////////////////////

/////////////////////////////////////////////////////

function retrieveFriendsListCallBack(response){


 
         if(response==-1){
             localStorage.removeItem("MateMeetingsInfo");
             alert("bad request:7");
             return
         }
         if(response==0){
             setTimeout(retrieveFriendsList,60000);
             return;
         }
         if((responseText.length)<10){
             document.getElementById("Flist").innerHTML="<div id=\"Friend404\">لیست وستان شما خالیست :)</div>";
             document.getElementById("updateFriendsBTN").classList.remove("spining");
             return;

         }else{
             
             localStorage.setItem("MateFriendsInfo",response);
             loadPage("friendsMenu");
             document.getElementById("updateFriendsBTN").classList.remove("spining");
             //////
             updateFmarkerTable();

             return;
         }

}

//////////////////////////////////

/////////////////////////////////

function unfriendCallBack(response){
  
            if(response==-1){
                localStorage.removeItem("MateUserInfo");
                alert("bad request:7");
                document.getElementById("updateFriendsBTN").classList.remove("spining");
                return;
            }
            if(response==0){
                setTimeout(unfriend,6000,el);
                return;
            }
            if(response==1){

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

}
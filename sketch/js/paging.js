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


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if(this.response=="1"){
            document.getElementById("signInPage").remove();
            return
        }
        if(this.response=="0"){
            beginAuth();
        }
        if(this.response=="-1"){
            localStorage.removeItem("MateUserInfo")
            beginAuth()
        }else{
            alert("service error:7");
            location.reload();
        }
    }
    };
    xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/HandShake", true);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();



}


///document ready events
document.onreadystatechange = () => {

    if (document.readyState === 'complete') {
        countDown();
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
                setTimeout(function(){document.getElementById("verifyForm").style.display="block"},1500);
                document.getElementById("verifyForm").style.left=0+"vh";
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




    function submitVC(){

        document.getElementById("verifyForm").style.left=-100+"vh";
        setTimeout(function(){document.getElementById("verifyForm").style.display="none"},1500);

      
    }

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
            return;
        }

    }
  //  countDownID=setInterval(countDown,1000);


    function submitInfo(){

        ////compress and upload avatar,filename:objId.jpg
        ///check unsername uniqueness 
        document.getElementById("signInPage").remove();

    }

    beginAuth();
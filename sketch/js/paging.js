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



    function submitPhone(){

        document.getElementById("uidForm").style.left=-100+"vh";
        setTimeout(function(){document.getElementById("uidForm").style.display="none"},1500);

      
    }

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
    
    countDownID=setInterval(countDown,1000);
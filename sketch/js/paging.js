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



    function submitPhone(){

        document.getElementById("uidForm").style.left=-100+"vh";
        setTimeout(function(){document.getElementById("uidForm").style.display="none"},1500);

      
    }

    function submitVC(){

        document.getElementById("verifyForm").style.left=-100+"vh";
        setTimeout(function(){document.getElementById("verifyForm").style.display="none"},1500);

      
    }

function positionSuccess(position){

    geo=position.coords.latitude+","+position.coords.longitude;

    if(info=storageRetrieve("MateUserInfo")){

        
        var data="id="+info.id+"&vc="+info.vc+"&geo="+geo+"&visible="+info.visibility;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          
            if(this.response==-1){
                localStorage.removeItem("MateUserInfo");
                alert("bad request:7");
                location.reload();
            }
            if(this.response=0){
                return;
            }
            
            localStorage.setItem("MateMap",this.responseText);
            setTimeout(magicOrb,10);

          
        }    
        };
        
        xhttp.open("POST", "https://guarded-castle-67026.herokuapp.com/EyeOfProvidence?"+data, true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send();


    }else{

        //handle if not found
    }


}
////////////////////////////////////////////////
function positionError(){
    //set shorter interval 
}
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//////////////update friends position in map

function magicOrb(){
 
    
    if(FriendsMarkerTable.length>0){
        FriendsMarkerTable.forEach(Fmarker=>{
            Fmarker.Marker.setMap(null)
        });
    }

    if(Fmap=storageRetrieve("MateMap")){
        
        Fmap.forEach(personGeo=>{

            FriendsMarkerTable.forEach(Fmarker=>{

                if(personGeo.ID==Fmarker.ID){
                    if(personGeo.Geo==0){
                        
                        Fmarker.Marker.setOpacity(0.5);
                    }else{
                        alert("hi");
                        var latlng = new google.maps.LatLng(parseFloat(personGeo.Geo.split(",")[0]), parseFloat(personGeo.Geo.split(",")[1]));
                        Fmarker.Marker.setPosition(latlng);
                        Fmarker.Marker.setMap(map);    

                    }

                }
            });

        });

      
      

        



    }else{
        //handle if not found
    }

}

/////////////////////////////////////////////////
function whisper(){

    
           ///////////////get user location and init marker/center of map
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionSuccess,positionError);
    } else {
        // Browser doesn't support Geolocation
        var input=confirm("مکان یاب خود را فعال کنید."+"\n"+"برای دیده نشدن از منوی پروفایل اقدام کنید.");
        if(input){
        
            return;
            ///*******/handle unavailable geo location
            // set coordinate to map marker setMap();

        }else{
            
            ///set interval to lognest priod
        }
    }

}

whisper();
setInterval(whisper,20000);
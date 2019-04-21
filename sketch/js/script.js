///global vars
var map,CurrentPin;
var currentGeo ={
    lat: 32.492270, 
    lng: 51.764425
};
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


///////////////get user location and init marker/center of map

if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionSuccess,positionError);
    } else {
        // Browser doesn't support Geolocation
        var input=confirm("You'r location is unavailable,continue anyway?");
        if(input){
            
            ///*******/handle unavailable geo location
            // set coordinate to map marker setMap();

        }else{
            location.reload();
        }
    } 

  
    ///if GPS is available
function positionSuccess(position) {
    currentGeo = {
     lat: position.coords.latitude,
     lng: position.coords.longitude
    };
    map.panTo(currentGeo);
    marker = new google.maps.Marker({
        position: {lat: parseFloat(currentGeo.lat), lng: parseFloat(currentGeo.lng)},
        map: map,
        //draggable:true,
        animation: google.maps.Animation.DROP,  
        icon: CurrentPin
      });
}
    ///if GPS is not available
function positionError(){
  var r=confirm("You'r location is unavailable,continue anyway?");
  if(r){

    ///*****/handle unavailable geo location
    currentGeo=null;
    return setMap();
    
  }else{
    location.reload();
  }

}
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

////init map

function initMap() {
    
    var styledMapType = new google.maps.StyledMapType(
        [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#b5afff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ],
    {name: 'Styled Map'}
    );


    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: parseFloat(currentGeo.lat), lng: parseFloat(currentGeo.lng)},
      zoom: 13,
      disableDefaultUI: true,
      mapTypeControlOptions:{
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map']
      }
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map'); 

    //init markers here
    CurrentPin = {
        url: './assets/img/gps.png',
        size: new google.maps.Size(64, 64),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 48)
      };
    
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

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
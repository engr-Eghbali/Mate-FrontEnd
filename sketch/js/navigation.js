///global vars
var map,map2,CurrentPin,InputMarker,AuxMarker,directionsDisplay,infoWindow;
var FriendsMarkerTable=[];
var currentGeo ={
    lat: 32.492270, 
    lng: 51.764425
};
var lastChoosedPlace;
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

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
      zoom: 14,
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
        scaledSize: new google.maps.Size(64, 64), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(32, 64) // anchor
      };

      google.maps.event.addListenerOnce(map, 'idle', function(){
        map.panTo(currentGeo);
        try {
            Currentmarker.setMap(null);
            
        } catch (error) {}
        Currentmarker = new google.maps.Marker({
            position: {lat: parseFloat(currentGeo.lat), lng: parseFloat(currentGeo.lng)},
            map: map,
            //draggable:true,
            animation: google.maps.Animation.DROP,  
            icon: CurrentPin
        });

        /// init when google is ready!
        directionsDisplay = new google.maps.DirectionsRenderer();
        infoWindow = new google.maps.InfoWindow;
        // do something only the first time the map is loaded
    });
    
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

///document ready events
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

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

        ////check if map is loaded 
        google.maps.event.addListenerOnce(map, 'idle', function(){

            map.panTo(currentGeo);
            try {
                Currentmarker.setMap(null);
                
            } catch (error) {}
            Currentmarker = new google.maps.Marker({
                position: {lat: parseFloat(currentGeo.lat), lng: parseFloat(currentGeo.lng)},
                map: map,
                //draggable:true,
                animation: google.maps.Animation.DROP,  
                icon: CurrentPin
            });

            // do something only the first time the map is loaded
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


    


}   


///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////



////load second-map to get a location from user
function loadAUXmap(){

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


    map2 = new google.maps.Map(document.getElementById('map2'), {
      center: {lat: parseFloat(currentGeo.lat), lng: parseFloat(currentGeo.lng)},
      zoom: 13,
      disableDefaultUI: true,
      mapTypeControlOptions:{
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map']
      }
    });

    map2.mapTypes.set('styled_map', styledMapType);
    map2.setMapTypeId('styled_map'); 

    //init markers here
    InputPin = {
        url: './assets/img/redpin.png',
        size: new google.maps.Size(64, 64),
        scaledSize: new google.maps.Size(64, 64), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(32, 64) // anchor
      };

      google.maps.event.addListenerOnce(map2, 'idle', function(){
        map2.panTo(currentGeo);
        lastChoosedPlace=currentGeo;
        InputMarker = new google.maps.Marker({
            position: {lat: parseFloat(currentGeo.lat), lng: parseFloat(currentGeo.lng)},
            map: map2,
            draggable:true,
            animation: google.maps.Animation.DROP,  
            icon: InputPin
        });

        InputMarker.addListener('dragend', function(event){
            lastChoosedPlace={
                lat:event.latLng.lat(),
                lng:event.latLng.lng()
            }
        });

        google.maps.event.addListener(map2, 'click', function(event) {
            lastChoosedPlace={
                lat:event.latLng.lat(),
                lng:event.latLng.lng()
            }
           
            InputMarker.setMap(null);

            InputMarker= new google.maps.Marker({
                position: {lat: parseFloat(lastChoosedPlace.lat), lng: parseFloat(lastChoosedPlace.lng)},
                map: map2,
                draggable:true,
                animation: google.maps.Animation.DROP,  
                icon: InputPin
            });

            InputMarker.addListener('dragend', function(event){
                lastChoosedPlace={
                    lat:event.latLng.lat(),
                    lng:event.latLng.lng()
                }
            });

        });
        // do something only the first time the map is loaded
    });
    

}
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

////////get formated address of geolocation
function geoCoder(geoLocation){
    var formatedAdd; 
  if(!geoLocation){
        geoLocation=lastChoosedPlace;
    }
    var geocoder = new google.maps.Geocoder;
    var latlng = new google.maps.LatLng(geoLocation.lat,geoLocation.lng);
  
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
           
            if(results[0]) {
                formatedAdd= results[0].formatted_address;
                ////////bad idea...handle this sit
                document.getElementById("meetingAddress").innerHTML=formatedAdd;
                
            } else {
              formatedAdd= "آدرسی برای این مکان ثبت نشده";
            }
        } else {
            // alert('Geocoder failed due to: ' + status);
            formatedAdd= "دسترسی به مکان یاب را فعال کنید";
        }
        
    });
   
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/////////// showing route through A to B and return time+distance

function pathFinder(origin,destination,Gmap){

    var directionsService = new google.maps.DirectionsService();

    ///remove previous route,infowindow and marker
    directionsDisplay.setDirections({routes: []});
    infoWindow.close();
    if(AuxMarker){
        AuxMarker.setMap(null);
    }
    
    if(!Gmap){
        setTimeout(pathFinder(),2000,origin,destination);
        return
    }

    directionsDisplay.setMap(Gmap);

    var request = {
        // from: Blackpool to: Preston to: Blackburn
        origin: origin, 
        destination: destination, 
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {

        var route = response.routes[0].legs[0];

        directionsDisplay.setDirections(response);

            //init marker here
        Pin = {
            url: './assets/img/gps.png',
            size: new google.maps.Size(64, 64),
            scaledSize: new google.maps.Size(64, 64), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(32, 64) // anchor
        };

        AuxMarker = new google.maps.Marker({
            position: {lat: parseFloat(destination.split(",")[0]), lng: parseFloat(destination.split(",")[1])},
            map: Gmap,
            //draggable:true,
            //animation: google.maps.Animation.DROP,  
            icon: Pin
        });
        
        ///open info window
        infoWindow.setContent("<div id='summary'>"+route.duration.text+"<br>"+route.distance.text+"</div>");
        infoWindow.open(Gmap,AuxMarker);
        directionsDisplay.setOptions( { suppressMarkers: true } );        

      } else {

        ///////handle after development cmpl (ZERO_RESULT)
        alert("directions response "+status);
        return null;
      }
    });

}



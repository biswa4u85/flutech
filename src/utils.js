import $ from 'jquery';
const googleGeocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json?';
const clientKey = 'AIzaSyBGBmfhXvgYNa_HPZvqz3Xp6RCaZFMcAFE';

export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +  "Longitude: " + position.coords.longitude);
    var coords = [position.coords.latitude, position.coords.longitude]
    setCookie('coords',coords);
}
    
// function showPosition(position) {
    // console.log(position);
    // var lat = position.coords.latitude;
    // var lng = position.coords.longitude;
    // if (lat && lng) {
	// 	var latlng = 'latlng=' + lat + ',' + lng;
	// 	const url = googleGeocodeApi + latlng + '&client=' + clientKey;
	// 	$.ajax({
	// 		url: url,
	// 		dataType: 'json',
    //         cache: true,
    //         headers: {
    //             'Access-Control-Allow-Origin' : '*'
    //         },
	// 		success: function(data){
	// 			console.log(data);
	// 		}
	// 	});
    // }
    
    // x.innerHTML="Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    // var google_map_pos = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
 
    // /* Use Geocoder to get address */
    // var google_maps_geocoder = new google.maps.Geocoder();
    // google_maps_geocoder.geocode(
    //     { 'latLng': google_map_pos },
    //     function( results, status ) {
    //         console.log(results, status)
    //     }
    // );
// }

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookie(name,value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (2*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function dateFormat(date) {
    var mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var dt = new Date(date);
    var mn = mon[dt.getMonth()];
    var day = dt.getDate();
    var year = dt.getFullYear();
    var hrs = dt.getHours();
    var min = dt.getMinutes();
    return day+'/'+mn+'/'+year+', '+hrs+':'+min;
}
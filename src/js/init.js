var varioDisplay, consoleOutput, googleMap, googleMapMarker;

$.spedmo = $.spedmo || {};
$.spedmo.bleReady = function() {
  varioDisplay = $('#varioDisplay');

  var htmlContent = "";
  htmlContent+='<h1>Vario Display</h1>';
  htmlContent+='<div class="container">';
  htmlContent+='<div class="row"><div class="col-xs-12"><div class="consoleOutput"></div></div></div>';
  htmlContent+='<div class="row"><div class="col-xs-12">Latitude : <span id="showLatitude"></span></div></div>';
  htmlContent+='<div class="row"><div class="col-xs-12">Longitude : <span id="showLongitude"></span></div></div>';
  htmlContent+='<div class="row"><div class="col-xs-12">Altitude Change : <span id="showAltitude"></span></div></div>';
  htmlContent+='<div class="row"><div class="col-xs-12"><div id="map"></div></div></div>';
  htmlContent+='</div>';
  varioDisplay.append(htmlContent);

  consoleOutput = $('.consoleOutput');

  // initalise Google
  googleMap = new google.maps.Map( document.getElementById('map'), {
    zoom: 15,
    center: {lat: -33, lng: 151}
  });
  googleMapMarker = new google.maps.Marker({
    map : googleMap,
		draggable : false
  });

  // define our custom events
	$.spedmo.ble.event.rawLineFeed = function(message) {
		consoleOutput.html($.spedmo.ble.console);
		consoleOutput.scrollTop(consoleOutput.prop('scrollHeight'));
	};

  // update the map with the gps location
  $.spedmo.ble.event.gpsUpdate = function(state) {
    // console.log('Updating Map location to : ' + state.lat + ", " + state.lon)
    $('#showLatitude').html(state.lat);
    $('#showLongitude').html(state.lon);
    var latLng = new google.maps.LatLng(state.lat, state.lon);
    googleMapMarker.setPosition(latLng);
    googleMap.setCenter(latLng);
	};

  $.spedmo.ble.event.altitudeUpdate = function(altitudeChange) {
    $('#showAltitude').html(altitudeChange);
  }

  console.log('Vario JS initalised')
}

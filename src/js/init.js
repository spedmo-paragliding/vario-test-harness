var varioDisplay, consoleOutput, googleMap, googleMapMarker;

$.spedmo = $.spedmo || {};
$.spedmo.bleReady = function() {
  varioDisplay = $('#varioDisplay');

  const htmlContent = `
   <h1>Ugly Vario - Change Me!</h1>
   <p><a href="https://github.com/spedmo-paragliding/vario-test-harness" target="_new">Download Source Code</a></p>
   <div class="container">
   <div class="row"><div class="col-xs-12"><div class="consoleOutput"></div></div></div>
   <div class="row"><div class="col-xs-12">Latitude : <span id="showLatitude"></span></div></div>
   <div class="row"><div class="col-xs-12">Longitude : <span id="showLongitude"></span></div></div>
   <div class="row"><div class="col-xs-12">Altitude (m) : <span id="showAltitude"></span></div></div>
   <div class="row"><div class="col-xs-12">Altitude Change (m/s) : <span id="showAltitudeChange"></span></div></div>
   <div class="row"><div class="col-xs-12"><div id="map"></div></div></div>
   </div>
  `;

  varioDisplay.append(htmlContent);

  consoleOutput = $('.consoleOutput');

  // initalise Google Maps
  googleMap = new google.maps.Map( document.getElementById('map'), {
    zoom: 15,
    center: {lat: -33, lng: 151}
  });

  // Use a default marker for our demo
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
    // if we weren't passed junk data from the device... update our presentation
    if ((typeof state.lat !== 'undefined') && (state.lat!=null) && (typeof state.lon !== 'undefined') && (state.lon!=null)) {
      // console.log('Updating Map location to : ' + state.lat + ", " + state.lon)
      $('#showLatitude').html(parseFloat(state.lat).toFixed(3));
      $('#showLongitude').html(parseFloat(state.lon).toFixed(3));
      var latLng = new google.maps.LatLng(state.lat, state.lon);
      googleMapMarker.setPosition(latLng);
      googleMap.setCenter(latLng);
    }
	};

  $.spedmo.ble.event.altitudeUpdate = function(altitudeUpdate) {
    //console.log(altitudeUpdate)
    $('#showAltitude').html(parseFloat(altitudeUpdate.baroAltitudeM).toFixed(0));
    $('#showAltitudeChange').html(altitudeUpdate.varioChangeMs1);
  }

  console.log('Vario JS initalised')
}

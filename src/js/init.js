var varioDisplay;

var varioScaleMax = 1;

$.spedmo = $.spedmo || {};
$.spedmo.bleReady = function() {
  varioDisplay = $('#varioDisplay');

  const htmlContent = `
   <div class="container">
   <div class="row">
        <div class="col-xs-12">
            <div class="varioBar varioUp">
                <div class="green"></div>
            </div>
            <div class="varioBar varioDown">
                <div class="red"></div>
            </div>
        </div>
   </div>
   </div>
  `;

//   <div class="row"><div class="col-xs-12">Latitude : <span id="showLatitude"></span></div></div>
//   <div class="row"><div class="col-xs-12">Longitude : <span id="showLongitude"></span></div></div>
//   <div class="row"><div class="col-xs-12">Altitude Change (m/s) : <span id="showAltitude"></span></div></div>


  varioDisplay.append(htmlContent);

  consoleOutput = $('.consoleOutput');

  // define our custom events
	$.spedmo.ble.event.rawLineFeed = function(message) {
		console.log($.spedmo.ble.console);
	};

  // update the map with the gps location
  $.spedmo.ble.event.gpsUpdate = function(state) {
    // if we weren't passed junk data from the device... update our presentation
    if ((typeof state.lat !== 'undefined') && (state.lat!=null) && (typeof state.lon !== 'undefined') && (state.lon!=null)) {
      // console.log('Updating Map location to : ' + state.lat + ", " + state.lon)
      // $('#showLatitude').html(parseFloat(state.lat).toFixed(3));
      // $('#showLongitude').html(parseFloat(state.lon).toFixed(3));
    }
	};

  $.spedmo.ble.event.altitudeUpdate = function(altitudeUpdate) {
    //console.log(altitudeUpdate)
    // $('#showAltitude').html(altitudeUpdate.varioChangeMs1);
    var varioChange = altitudeUpdate.varioChangeMs1;
    var varioPercentage = (varioChange / varioScaleMax) * 100;

    if (varioChange < 0) {
        $('.varioBar .red').css({'height' : -varioPercentage + '%'});
        $('.varioBar .green').css({'height':'0'});
    } else {
        $('.varioBar .red').css({'height':'0'});
        $('.varioBar .green').css({'height' : varioPercentage + '%'});
    }
  }

  console.log('Vario JS initalised')
}

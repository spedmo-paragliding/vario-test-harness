var varioDisplay;

var varioScaleMax = 5;
var varioDistance = 0;

var lastLatitude, lastLongitude;

$.spedmo = $.spedmo || {};
$.spedmo.bleReady = function() {
  varioDisplay = $('#varioDisplay');

  const htmlContent = `
   <div class="container">
   <div class="row">
        <div class="col-xs-3">
            <div class="varioIndicator">
              <div>5 m/s</div>
              <div class="marker">4 m/s</div>
              <div class="marker">3 m/s</div>
              <div class="marker">2 m/s</div>
              <div class="marker">1 m/s</div>
              <div>0 m/s</div>
              <div class="marker">-1 m/s</div>
              <div class="marker">-2 m/s</div>
              <div class="marker">-3 m/s</div>
              <div class="marker">-4 m/s</div>
              <div>-5 m/s</div>
            </div>
            <div class="varioBar varioUp">
                <div class="green"></div>
            </div>
            <div class="varioBar varioDown">
                <div class="red"></div>
            </div>
        </div>
        <div class="col-xs-9">
          <div class="readings">
            <strong>Heading</strong>
            <div class="heading">&nbsp;</div>

            <strong>Distance</strong>
            <div class="distance">&nbsp;</div>

            <strong>Speed</strong>
            <div class="speed">&nbsp;</div>

            <span id="varioAltitudeDisplay" style="display:none;">
            <strong>Altitude (Vario)</strong>
            <div class="altitudeVario">&nbsp;</div>
            </span>

            <strong>Altitude (GPS)</strong>
            <div class="altitudeGps">&nbsp;</div>

            <strong>Altitude Change</strong>
            <div class="altitudeChange">&nbsp;</div>
          </div>
        </div>
   </div>
   </div>
  `;

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
      if (typeof lastLatitude!=='undefined' && typeof lastLongitude !== 'undefined') {
        if (lastLatitude!=state.lat || lastLongitude!=state.lon) {
          var varioDistanceChange = calculateDistance(lastLatitude, lastLongitude, state.lat, state.lon);

          varioDistance += varioDistanceChange;
          // update distance display
          $('.distance').html(varioDistance.toFixed(1) + ' km');
          $('.speed').html(state.speed.toFixed(0) + ' km/hr');
        }
      }

      if (typeof state.alt !=='undefined' && (state.alt!=null)) {
          $('.altitudeGps').html((state.alt * 1.0).toFixed(0) + ' m');
      }

      lastLatitude =  state.lat;
      lastLongitude = state.lon;
    }
	};

  $.spedmo.ble.event.altitudeUpdate = function(altitudeUpdate) {
    var varioChange = altitudeUpdate.varioChangeMs1 * 1.0;
    if (isNaN(varioChange)) {
      varioChange = 0.0;
    }
    var varioPercentage = (varioChange / varioScaleMax) * 100;

    if (varioChange < 0) {
        if (varioPercentage < -100) {
          varioPercentage = -100;
        }

        $('.varioBar .red').css({'height' : -varioPercentage + '%'});
        $('.varioBar .green').css({'height':'0'});
    } else {
        if (varioPercentage > 100) {
          varioPercentage = 100;
        }

        $('.varioBar .red').css({'height':'0'});
        $('.varioBar .green').css({'height' : varioPercentage + '%'});
    }

    $('.heading').html(degToCompass(altitudeUpdate.heading));
    $('.altitudeChange').html((varioChange).toFixed(1) + ' m/s');

    if (typeof altitudeUpdate.baroAltitudeM !=='undefined'
        && (altitudeUpdate.baroAltitudeM!=null)
        && (altitudeUpdate.baroAltitudeM!='')) {

        $('#varioAltitudeDisplay').show();
        $('.altitudeVario').html((altitudeUpdate.baroAltitudeM * 1.0).toFixed(0) + ' m');
    }
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  function calculateDistance(lat1, lon1, lat2, lon2)
  {
    console.log('calculating distance between : ' + lat1 + ', ' + lon1 + ' and ' + lat2 + ', ' + lon2);
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    console.log('distance : ' + d);
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value)
  {
      return Value * Math.PI / 180;
  }

  function degToCompass(num) {
      var val = Math.floor((num / 22.5) + 0.5);
      var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[(val % 16)];
  }

  console.log('Simple Vario JS initalised')
}

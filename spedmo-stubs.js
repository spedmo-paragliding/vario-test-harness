var gps = new GPS();

$(document).ready(function () {
  $.spedmo = $.spedmo || {};
	$.spedmo.bleReady = $.spedmo.bleReady || {};
  $.spedmo.ble = $.spedmo.ble || {};
  $.spedmo.ble.console = "";

  // blank methods intended to be overwritten by the developer
  $.spedmo.ble.event = $.spedmo.ble.event || {};
	$.spedmo.ble.event.rawFeed = function(message) {};
	$.spedmo.ble.event.rawLineFeed = function(message) {};
	$.spedmo.ble.event.gpsUpdate = function(message) {};
  $.spedmo.ble.event.altitudeUpdate = function(message) {};

  // hook into the file load field
  document.getElementById('file').onchange = function(){
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent){

      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line++){
        var currentUpdate = lines[line].trim();

        if (currentUpdate.indexOf('$LXWP0')==0) {
          // TODO: eek
        } else if (currentUpdate.indexOf('$GP')==0) {
          gps.update(currentUpdate);
          $.spedmo.ble.event.gpsUpdate(gps.state);
        }

        // identical in the testing harness but possibly different on direct BLE feed
        $.spedmo.ble.event.rawFeed(currentUpdate);
        $.spedmo.ble.event.rawLineFeed(currentUpdate);
        $.spedmo.ble.console += currentUpdate + "\r\n";
      }
    };
    reader.readAsText(file);
  };

  // call developer code
	$.spedmo.bleReady.call();
});

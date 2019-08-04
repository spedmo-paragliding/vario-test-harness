var varioDisplay, consoleOutput;

$.spedmo = $.spedmo || {};
$.spedmo.bleReady = function() {
  varioDisplay = $('#varioDisplay');

  varioDisplay.append('<h1>Vario Display</h1>');
  varioDisplay.append('<div class="container"><div class="row"><div class="col-xs-12"><div class="consoleOutput"></div></div></div></div>');

  consoleOutput = $('.consoleOutput');

  // define our custom events
	$.spedmo.ble.event.rawBleLineFeed = function(message) {
		consoleOutput.html($.spedmo.ble.console);
		consoleOutput.scrollTop(consoleOutput.prop('scrollHeight'));
	};

  // start the ble device scan
  $.spedmo.ble.scan();

  console.log('Vario JS initalised')
}

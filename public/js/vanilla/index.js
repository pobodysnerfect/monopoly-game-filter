/**
 * This is the entry point of the app defined in the webpack configuration
 */

// define 3rd party libraries used throughout app
let $ = require('jquery');

window.$ = $;
window.jQuery = $;
require('bootstrap');
require('datatables.net');

let Main = require('./main');

function eventAttachHandler() {
    let main = new Main();
    main.attachEvents();
}

// attach handler on dom ready
$(document).ready(eventAttachHandler);

const {format} = require('timeago.js');


const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
}
helpers.generatePassword = (length) => {
    var pass = "";
    for (i=0; i < length; i++){
        pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);     
    }
    return pass;
    }



module.exports = helpers;
require("colors");

exports.logDebug = function (message) {
    console.log(
        `[DEBUG]\t${new Date().toString().substring(0, 24)}\t${message}`
    );
}

exports.logWarning = function (message) {
    console.warn(
        `[WARN]\t${new Date().toString().substring(0, 24)}\t${message}`.yellow
    );
}

exports.logError = function (message) {
    console.error(
        `[ERROR]\t${new Date().toString().substring(0, 24)}\t${message}`.red
    );
}
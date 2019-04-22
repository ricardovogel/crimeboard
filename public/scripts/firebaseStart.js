window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.replace("board.html");
        } else {
            window.location.replace("login.html");
        }
    });
};
function signup() {
    let name = document.getElementById("displayName").value;
    let email = document.getElementById("inputEmailR").value;
    let password = document.getElementById("inputPasswordR").value;
    console.log(email)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
        });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user == null) {
            return;
        }
        user.updateProfile({
            displayName: name
        })
            .then(function () {
                window.location.replace("index.html");
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode);
                console.error(errorMessage);
            });
    });
}

function login() {
    let email = document.getElementById("inputEmail").value;
    let password = document.guetElementById("inputPassword").value;
    console.log(email)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            window.location.replace("index.html");
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
        });
}
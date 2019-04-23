window.onload = function () {
    db = firebase.firestore();
    storage = firebase.storage();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user === null) {
            window.location.replace("login.html");
        }

        app.user = user;

        db.collection("userNotes").doc(app.user.uid).get().then(doc => {
            app.notes = JSON.parse(doc.data().notes);
            app.imgnotes = JSON.parse(doc.data().imgnotes);
        });
    });
};


function saveState(dontTrigger) {
    db.collection("userNotes").doc(app.user.uid).set({
        notes: JSON.stringify(app.notes),
        imgnotes: JSON.stringify(app.imgnotes)
    }).then(function () {
        if (!dontTrigger) {
            Swal.fire(
                'Saved!',
                'Your data has been saved successfully',
                'success'
            );
        }
    }).catch(function () {
        console.error("Error adding document: ", error);
        Swal.fire(
            'Something went wrong...',
            'Please try again later',
            'error'
        );
    });
}

function logOut() {
    firebase.auth().signOut()
        .catch(function (error) {
            console.error(error);
        });
}

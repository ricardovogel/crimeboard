window.onload = function () {
    db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function (user) {
        app.user = user;

        db.collection("userNotes").doc(app.user.uid).get().then(doc => {
            app.notes = JSON.parse(doc.data().notes);
        });
    });
};


function saveState() {
    db.collection("userNotes").doc(app.user.uid).set({
        notes: JSON.stringify(app.notes)
    }).then(function () {
        console.log(":D")
    }).catch(function () {
        console.error("Error adding document: ", error);
    });
}

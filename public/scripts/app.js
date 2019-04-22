Vue.component('note', {
    props: ['note'],
    template: `<div class="note" :id="note.id" :style="note.style" :data-x="note.data_x" :data-y="note.data_y">
            <span class="pin"></span>
            <span class="note-text">{{ note.text }}</span>
            <span class="delete-icon" onclick="deleteNote(this.parentElement.id)"><i class="fas fa-trash-alt"></i></span>
            <span class="edit-icon" onclick="edittext(this.parentElement.id)"><i class="fas fa-pen"></i></span>
        </div>`
});

Vue.component('imgnote', {
    props: ['imgnote'],
    template: `<div class="imgnote" :id="imgnote.id" :style="imgnote.style" :data-x="imgnote.data_x" :data-y="imgnote.data_y" :background="imgnote.imageURL">
            <span class="pin"></span>
            <span class="delete-icon" onclick="deleteImgNote(this.parentElement.id)"><i class="fas fa-trash-alt"></i></span>
            <span class="edit-icon" onclick="uploadImage(this.parentElement.id)"><i class="far fa-image"></i></span>
        </div>`
});
//<img :src="imgnote.imageURL">

var app = new Vue({
    el: '#main-app',
    data: {
        notes: [],
        imgnotes: [],
        user: { email: "", displayName: "" }
    }
})


function addNote() {
    let noteToAdd = new Note(app.notes.length, "Hello World");
    app.notes.push(noteToAdd);
}

function addImgNote() {
    let noteToAdd = new Imgnote(app.imgnotes.length);
    app.imgnotes.push(noteToAdd);
}

function edittext(noteNumber) {
    console.log(noteNumber)
    noteNumber = noteNumber.split("-")[1];
    console.log(noteNumber)
    let text = prompt("Enter your text", app.notes[noteNumber].text);
    app.notes[noteNumber].text = text;
}


function deleteImgNote(noteNumber) {
    if (confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
        deleteImgNoteConfirmed(noteNumber);
    }
}

function deleteImgNoteConfirmed(noteNumber) {
    noteNumber = noteNumber.split("-")[1];
    makeNullNode(app.imgnotes[noteNumber]);
    storage.ref().child(`board_pictures/${app.user.uid}/${noteNumber}`).delete().then(function () {
    }).catch(function (error) {
        console.error(error);
    });

}

function deleteNote(noteNumber) {
    if (confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
        deleteNoteConfirmed(noteNumber);
    }
}

function deleteNoteConfirmed(noteNumber) {
    noteNumber = noteNumber.split("-")[1];
    makeNullNode(app.notes[noteNumber]);
}

function clearBoard() {
    if (confirm("Are you sure you want to clear your board? This action cannot be undone.")) {
        clearBoardConfirmed();
    }
}

function clearBoardConfirmed() {
    app.notes = [];
    for (let i = 0; i != app.imgnotes.length; i++) {
        storage.ref().child(`board_pictures/${app.user.uid}/${i}`).delete().then((function () { }))
            .catch(function (error) {
                console.error(error);
            });
    }
    app.imgnotes = [];
}

function uploadImage(noteId) {
    noteId = noteId.split("-")[1] || noteId;
    Swal.fire({
        title: 'Upload file',
        html: `<input id="image-file" type="file" />`,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Upload'
    }).then((result) => {
        if (result.value) {
            let storageRef = storage.ref().child(`board_pictures/${app.user.uid}/${noteId}`);
            let file = document.getElementById("image-file").files[0];
            if (!file) {
                Swal.fire(
                    'No file selected',
                    'Please select a file.',
                    'warning'
                ).then(() => {
                    uploadImage(noteId);
                    return;
                });
            }
            storageRef.put(file).then(function (snapshot) {
                storageRef.getDownloadURL().then(function (url) {
                    app.imgnotes[noteId].style = app.imgnotes[noteId].style.replace(/url\(.*?\)/, `url("${url}")`);
                }).catch((error) => {
                    console.error(error);
                });

                Swal.fire(
                    'Uploaded!',
                    'Your file has been uploaded.',
                    'success'
                );
            }).catch(function (error) {
                Swal.fire(
                    'Upload failed',
                    'The upload failed, try again later...',
                    'error'
                );
            });
        }
    });
}
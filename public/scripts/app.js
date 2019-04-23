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

function edittext(noteID) {
    let noteNumber = noteID.split("-")[1];
    Swal.fire({
        title: 'Change text',
        html: `<input id="text-to-change-to" type="text" value="${app.notes[noteNumber].text}" />`,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Change'
    }).then((result) => {
        if (result.value) {
            app.notes[noteNumber].text = document.getElementById("text-to-change-to").value;
        }
    });
}


function deleteImgNote(noteID) {
    Swal.fire({
        title: 'Are you sure?',
        html: `Are you sure you want to delete this note? This action cannot be undone. Your crimeboard will be saved after the deletion.`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it'
    }).then((result) => {
        if (result.value) {
            let noteNumber = noteID.split("-")[1];
            makeNullNode(app.imgnotes[noteNumber]);
            storage.ref().child(`board_pictures/${app.user.uid}/${noteNumber}`).delete().then(function () {
                Swal.fire(
                    'Picture removed',
                    'This picture has been removed successfully',
                    'success'
                );
                saveState(true);
            }).catch(function (error) {
                if (JSON.parse(error.serverResponse_).error.code != "404") {
                    console.error(error);
                    Swal.fire(
                        'Something went wrong...',
                        'Something went wrong in trying to delete the picture. You might see old pictures showing up. Try again later, or contact the team.',
                        'error'
                    );
                }
            });
        }
    });
}

function deleteNote(noteID) {
    Swal.fire({
        title: 'Are you sure?',
        html: `Are you sure you want to delete this note? This action cannot be undone`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it'
    }).then((result) => {
        if (result.value) {
            let noteNumber = noteID.split("-")[1];
            makeNullNode(app.notes[noteNumber]);
            Swal.fire(
                'Note removed',
                'This note has been removed successfully',
                'success'
            );
        }
    });
}

function clearBoard() {
    Swal.fire({
        title: 'Are you sure?',
        html: `Are you sure you want to clear your crimeboard? This action cannot be undone`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, clear it'
    }).then((result) => {
        if (result.value) {
            clearBoardConfirmed();
        }
    });
}

function clearBoardConfirmed() {
    app.notes = [];
    for (let i = 0; i != app.imgnotes.length; i++) {
        storage.ref().child(`board_pictures/${app.user.uid}/${i}`).delete().then((function () { }))
            .catch(function (error) {
                console.error(error);
                if (JSON.parse(error.serverResponse_).error.code != "404") {
                    Swal.fire(
                        'Something went wrong...',
                        'Something went wrong in trying to clear the pictures. You might see old pictures showing up. Try again later, or contact the team.',
                        'error'
                    );
                }
            });
    }
    app.imgnotes = [];
    Swal.fire(
        'Board cleared',
        'Your crimeboard has been cleared successfully',
        'success'
    );
    saveState(true);
}

function uploadImage(noteID) {
    let noteNumber = noteID.split("-")[1] || noteID;
    Swal.fire({
        title: 'Upload picture',
        html: `Your crimeboard will be saved after uploading.<input id="image-file" type="file" >`,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Upload'
    }).then((result) => {
        if (result.value) {
            let storageRef = storage.ref().child(`board_pictures/${app.user.uid}/${noteNumber}`);
            let file = document.getElementById("image-file").files[0];
            if (!file) {
                Swal.fire(
                    'No file selected',
                    'Please select a file.',
                    'warning'
                ).then(() => {
                    uploadImage(noteNumber);
                    return;
                });
            }
            storageRef.put(file).then(function (snapshot) {
                storageRef.getDownloadURL().then(function (url) {
                    app.imgnotes[noteNumber].style = app.imgnotes[noteNumber].style.replace(/url\(.*?\)/, `url("${url}")`);

                    Swal.fire(
                        'Uploaded!',
                        'Your file has been uploaded.',
                        'success'
                    );
                    saveState(true);
                }).catch((error) => {
                    console.error(error);
                });
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
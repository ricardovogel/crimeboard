Vue.component('note', {
    props: ['note'],
    template: `<div class="note" :id="note.id" :style="note.style" :data-x="note.data_x" :data-y="note.data_y">
            <span class="pin"></span>
            <span class="note-text">{{ note.text }}</span>
            <span class="delete-icon" onclick="deleteNote(this.parentElement.id)"><i class="fas fa-trash-alt"></i></span>
            <span class="edit-icon" onclick="edittext(this.parentElement.id)"><i class="fas fa-pen"></i></span>
        </div>`
});

var app = new Vue({
    el: '#main-app',
    data: {
        notes: [],
        user: { email: "", displayName: "" }
    }
})


function addNote() {
    let noteToAdd = new Note(app.notes.length, "Hello World");
    app.notes.push(noteToAdd);
}

function edittext(noteNumber) {
    let text = prompt("Enter your text", app.notes[noteNumber].text);
    app.notes[noteNumber].text = text;
}

function deleteNote(noteNumber) {
    if (confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
        deleteNoteConfirmed(noteNumber);
    }
}

function deleteNoteConfirmed(noteNumber) {
    console.log(noteNumber)
    makeNullNode(app.notes[noteNumber])
}

function clearBoard() {
    if (confirm("Are you sure you want to clear your board? This action cannot be undone.")) {
        clearBoardConfirmed();
    }
}

function clearBoardConfirmed() {
    app.notes = [];
}
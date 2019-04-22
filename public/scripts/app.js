Vue.component('note', {
    props: ['note'],
    template: `<div class="note" :id="note.id" :style="note.style" :data-x="note.data_x" :data-y="note.data_y">
            <span class="pin"></span>
            <span class="note-text">{{ note.text }}</span>
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
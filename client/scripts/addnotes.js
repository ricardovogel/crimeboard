var amountOfNotes = 0;

function addNote() {
    document.getElementById("crimeboard").innerHTML +=
        `<div id="note-${amountOfNotes}" class="note">
            <span class="pin"></span>
            <span class="note-text" id="text-${amountOfNotes}">Hello world</span>
            <span id="edit-${amountOfNotes}" class="edit-icon" onclick="edittext(${amountOfNotes})"><i class="fas fa-pen"></i></span>
        </div>`;

    console.log(document.getElementById(`edit-${amountOfNotes}`))
    console.log(document.getElementById(`edit-${amountOfNotes}`).onclick)

    amountOfNotes++;
}

function edittext(noteNumber) {
    let text = prompt("Enter your text", document.getElementById(`text-${noteNumber}`).innerHTML);
    text = text.replace(/[.*+?^${}<>()|[\]\\]/g, '\\$&');
    document.getElementById(`text-${noteNumber}`).innerHTML = text;
}
class Note {
    constructor(id, text, style, data_x, data_y) {
        this.id = "n-" + id;
        this.text = text;
        this.style = style || `transform: translate(5px, -5px);`;
        this.data_x = data_x || "5px";
        this.data_y = data_y || "-5px";
    }
}

class Imgnote {
    constructor(id, imageURL, style, data_x, data_y) {
        this.id = "i-" + id;
        imageURL = imageURL || "";
        this.style = style || `transform: translate(5px, -5px); background-image:url(${imageURL})`;
        this.data_x = data_x || "5px";
        this.data_y = data_y || "-5px";
    }
}

function makeNullNode(note) {
    note.style = "display:none;";
    delete note.id;
    delete note.text;
    delete note.data_x;
    delete note.data_y;
    delete note.imageURL;
}

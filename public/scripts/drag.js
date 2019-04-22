function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    updateStyle(target, x, y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

interact('.note')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrict({
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            }),
        ],
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) { }
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent',
                endOnly: true,
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 150, height: 100 },
            }),
        ],

        inertia: true
    })
    .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        updateStyle(target, x, y);
    });


interact('.imgnote')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrict({
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            }),
        ],
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) { }
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent',
                endOnly: true,
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 150, height: 100 },
            }),
        ],

        inertia: true
    })
    .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
        updateStyle(target, x, y);
    });

function updateStyle(target, x, y) {
    let noteNumber = target.id.split("-")[1];
    if (target.className === "note") {
        app.notes[noteNumber].style = target.style.cssText;
        app.notes[noteNumber].data_x = x;
        app.notes[noteNumber].data_y = y;
    } else if (target.className === "imgnote") {
        app.imgnotes[noteNumber].style = target.style.cssText;
        app.imgnotes[noteNumber].data_x = x;
        app.imgnotes[noteNumber].data_y = y;
    }
}

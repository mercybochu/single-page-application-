window.onload = fetchNotes;

// Save note
async function saveNote() {

    const noteInput =
        document.getElementById("noteInput");

    const content = noteInput.value;

    if(content.trim() === "") {
        alert("Please enter a note");
        return;
    }

    await fetch('/add_note', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            content: content
        })
    });

    noteInput.value = "";

    fetchNotes();
}

// Fetch notes
async function fetchNotes() {

    const response = await fetch('/get_notes');

    const notes = await response.json();

    const notesContainer =
        document.getElementById("notesContainer");

    notesContainer.innerHTML = "";

    notes.forEach(note => {

        const div = document.createElement("div");

        div.className = "note";

        div.innerHTML = `<p>${note.content}</p>`;

        notesContainer.appendChild(div);
    });
}

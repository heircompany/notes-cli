const fs = require(`fs`);

let fetchNotes = () => {
  try {
      let noteString =  fs.readFileSync(`notes-data.json`);
      return JSON.parse(noteString);
  } catch (e) {
      return [];
  }
};

let logNote = (note) => {
  if (note) {
      console.log(`-------`);
      console.log(`Title: ${note.title}`);
      console.log(`Body: ${note.body}`);
    } else {
      console.log(`title taken`);
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync(`notes-data.json`, JSON.stringify(notes));
};

let addNote = (title, body) => {
  //fetch all notes
  console.log(`adding note`, title, body);
  let notes = fetchNotes();
  let note = {
    title,
    body
  };
    //check for duplicate note title
let duplicateNotes = notes.filter((note) => note.title === title);

// save note
if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

let getAll = () => {
  //fetch all notes
  return fetchNotes();
  console.log(`getting all notes`);
};

let readNote = (title) => {
  console.log(`reading note`, title);
    //fetch all notes
  let notes = fetchNotes();
  //find and read note
    let filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

let removeNote = (title) => {
  //fetch notes
    let notes = fetchNotes();
  //filter notes, removing one with title of argv
    let filteredNotes = notes.filter((note) => note.title !== title);
  //save new notes array
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNote
};

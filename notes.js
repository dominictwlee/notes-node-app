const fs = require('fs');
const moment = require('moment');

function fetchData() {
  try {
    const notesString = fs.readFileSync('notes-data.json', 'utf8');
    return JSON.parse(notesString);
  } catch (err) {
    return [];
  }
}

function saveData(notes) {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

function addNote(title, body) {
  const notes = fetchData();
  const newNote = {
    title,
    body,
    date: moment().format('DD/MM/YYYY'),
  };

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(newNote);
    saveData(notes);
    return newNote;
  }
  return null;
}

function listNotes() {
  return fetchData();
}

function readNote(title) {
  const notes = fetchData();
  return notes.filter(note => note.title === title);
}

function removeNote(title) {
  const notes = fetchData();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveData(filteredNotes);
  return notes.filter(note => note.title === title);
}

module.exports = {
  addNote,
  listNotes,
  readNote,
  removeNote,
};

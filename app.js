function printNote(note) {
  console.log('=============');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
  console.log(`Date: ${note.date}`);
}

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b',
};

const notes = require('./notes');
const argv = require('yargs')
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help()
  .argv;

const command = argv._[0];
// console.log('YARGS', argv)

if (command === 'add') {
  const newNote = notes.addNote(argv.title, argv.body);
  if (newNote) {
    console.log('Note Created');
    printNote(newNote);
  } else {
    console.log('Note title already in use');
  }
} else if (command === 'list') {
  const noteList = notes.listNotes();
  console.log(`Printing ${noteList.length} notes`);
  for (const note of noteList) {
    printNote(note);
  }
} else if (command === 'read') {
  const [selectNote] = notes.readNote(argv.title);
  if (selectNote) {
    console.log('Note Found');
    printNote(selectNote);
  } else {
    console.log('Note Not Found');
  }
} else if (command === 'remove') {
  const [deletedNote] = notes.removeNote(argv.title);
  if (deletedNote) {
    console.log('Note Deleted');
    printNote(deletedNote);
  } else {
    console.log('Note Not Found');
  }
} else {
  console.log('Not recognised');
}

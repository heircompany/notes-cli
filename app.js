const fs = require(`fs`);
const _ = require(`lodash`);
const yargs = require(`yargs`);

const notes = require(`./notes`);
const options = require(`./options`);

const argv = yargs
  .command(`add`, `add a new note`, {
    title: options.titleOptions,
    body: options.bodyOptions
  })
  .command(`list`, `list all notes`)
  .command(`read`, `read a note`, {
    title: options.titleOptions
  })
  .command(`remove`, `remove a note`, {
    title: options.titleOptions
  })
  .help()
  .argv;
let command = argv._[0];
// console.log(`Command: `, command);
// console.log(`Process`, process.argv);
// console.log(`Yargs`, argv);

if (command === `add`) {
  let note = notes.addNote(argv.title, argv.body);
  if(note) {
          console.log(`note added`);
          notes.logNote(note);
        } else {
          console.log(`note title taken`);
        }
    } else if (command === `list`) {
      let allNotes = notes.getAll();
      console.log(`Showing ${allNotes.length} note(s)`);
      allNotes.forEach((note) =>  notes.logNote(note));
    } else if (command === `read`) {
        let note = notes.readNote(argv.title);
        if(note) {
                console.log(`note found`);
                notes.logNote(note);
              } else {
                console.log(`note not found`);
              }
    } else if (command === `remove`) {
        let noteRemoved = notes.removeNote(argv.title);
        let message = noteRemoved ? `${title} removed` : 'note not found';
        console.log(message);
    } else {
        console.log(`command not recognized`);
    }

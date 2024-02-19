//  variables
const noteList = document.querySelector(".note-list");

//  eventlisteners
eventlisteners();
//  form submission
function eventlisteners() {
  const noteBTN = document
    .querySelector("#form")
    .addEventListener("submit", newNote);

  //remove note
  document.querySelector(".note-list").addEventListener("click", removeNote);
}

document.addEventListener("DOMContentLoaded", localStorageLoaded);

//  function
//  Adding new note to the list
function newNote(e) {
  e.preventDefault();
  //  access to the value
  const note = document.querySelector(".input-text").value;

  // creating a new tag
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(note));
  noteList.appendChild(li);

  // adding remove btn to li
  const removeBTN = document.createElement("a");
  removeBTN.textContent = "X";
  removeBTN.classList = "remove-note";
  li.appendChild(removeBTN);

  addNoteToLocalStorage(note);

  this.reset();

  alert("Note saved successfully")
}

//  remove note from list
function removeNote(e) {
  if (e.target.classList.contains("remove-note")) {
    e.target.parentElement.remove();
  }
  removeNoteLocalstorage(e.target.parentElement.textContent);
}

//  add note to the local storage
function addNoteToLocalStorage(note) {
  const notes = getNoteToLocalStorage();

  notes.push(note);

  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(notes);
}

//  get note on local storage
function getNoteToLocalStorage() {
  let notes;

  let getFormLS = localStorage.getItem("notes");

  if (getFormLS === null) {
    notes = [];
  } else {
    notes = JSON.parse(getFormLS);
  }
  return notes;
}

function localStorageLoaded() {
  const notes = getNoteToLocalStorage();

  notes.forEach(function (note) {
    // creating a new tag
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(note));
    noteList.appendChild(li);

    // adding remove btn to li
    const removeBTN = document.createElement("a");
    removeBTN.textContent = "X";
    removeBTN.classList = "remove-note";
    li.appendChild(removeBTN);
  });
}
//  also remove note from local storage
function removeNoteLocalstorage(noteContent) {
  //  get notes from localStorage
  const noteDelete = noteContent.substring(0, noteContent.length - 1);

  const noteFromLS = getNoteToLocalStorage();
  noteFromLS.forEach(function (note, index) {
    if (note === noteDelete) {
      noteFromLS.splice(index, 1);
    }
  });
  //  set new array of notes to the local Storage
  localStorage.setItem("notes", JSON.stringify(noteFromLS));
}

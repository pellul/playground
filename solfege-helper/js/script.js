Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)];
}

const GKeyNotes = {
  B: ['B', 'SI', 'シ', 'し'],
  C: ['C', 'DO', 'ド', 'ど'],
  D: ['D', 'RE', 'レ', 'れ'],
  E: ['E', 'MI', 'ミ', 'み'],
  F: ['F', 'FA', 'ファ', 'ふぁ'],
  G: ['G', 'SOL', 'ソ', 'そ'],
  A: ['A', 'LA', 'ラ', 'ら'],
  H: ['B', 'SI', 'シ', 'し'],
  I: ['C', 'DO', 'ド', 'ど'],
  J: ['D', 'RE', 'レ', 'れ'],
  K: ['E', 'MI', 'ミ', 'み'],
};

const FKeyNotes = {
  B: ['D', 'RE', 'レ', 'れ'],
  C: ['E', 'MI', 'ミ', 'み'],
  D: ['F', 'FA', 'ファ', 'ふぁ'],
  E: ['G', 'SOL', 'ソ', 'そ'],
  F: ['A', 'LA', 'ラ', 'ら'],
  G: ['B', 'SI', 'シ', 'し'],
  A: ['C', 'DO', 'ド', 'ど'],
  H: ['D', 'RE', 'レ', 'れ'],
  I: ['E', 'MI', 'ミ', 'み'],
  J: ['F', 'FA', 'ファ', 'ふぁ'],
  K: ['G', 'SOL', 'ソ', 'そ'],
};

let goods = 0;
let bads = 0;

const setNewNote = container => container.innerHTML = Object.keys(GKeyNotes).sample();
const switchKey = radio => {
  const keyContainer = document.getElementById('key');
  // '!' is the hymnus font's G-key symbole, '?' is F-key.
  keyContainer.innerHTML = (radio.value === 'sol') ? '!' : '?';
  setNewNote(document.getElementById('answer'))
}

const check = input => {
  const value = input.value.toUpperCase();
  const answer = document.getElementById('answer').innerHTML.toUpperCase();
  const notes = document.getElementById('fa-radio').checked ? FKeyNotes : GKeyNotes;
  if (notes[answer].indexOf(value) >= 0) {
    document.getElementById('goods').innerHTML = ++goods;
    setNewNote(document.getElementById('answer'));
  } else {
    document.getElementById('bads').innerHTML = ++bads;
  }
  input.value = '';
}

window.onload = () => {
  document.getElementById('sol-radio').checked = true;
  setNewNote(document.getElementById('answer'));
};

let USE_BUTTONS = false;

let magi_health = 80;
let boss_health = 80;
let spell = 0;

function maybe_hide_buttons(){
  if (!USE_BUTTONS) {
    document.getElementById("buttons").innerHTML = "";
  }
}

async function configure_spells(mode) {
  await fetch('/configure_spells/' + mode);
}

async function get_spell() {
  const response = await fetch('/spell');
  const result = await response.json();
  spell = result['spell'];
}

function cast_spell(spell) {
  fetch('/cast/0');
  fetch('/cast/' + spell);
}

function jump_in_video(time){
  document.getElementById("boss_video").currentTime = time;
}

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, 1000 * s));
}
async function fight_round(times){
  while (true) {
    jump_in_video(times[0]);
    await sleep(times[1] - times[0]);
    await get_spell();
    if (spell == 1) {;
      magi_health = Math.max(magi_health - 10, 0);
    } else {
      magi_health = Math.max(magi_health - 50, 0);
    }
    document.getElementById("magi_hp").innerHTML = magi_health;
    if (magi_health <= 0) {
      await sleep(4);
      window.location.replace("/");
    }
    await sleep(times[2] - times[1]);
    await get_spell();
    if (spell == 2) {
      await sleep(times[3] - times[2]);
      await get_spell();
      if (spell == 3) {
        boss_health = Math.max(boss_health - 30, 0);
        document.getElementById("dragon_hp").innerHTML = boss_health;
        return;
      }
    }
    spell = 0;
  }
}

async function main(){
  await configure_spells("SELECT_AND_CAST");
  await fight_round([24, 52, 66, 70]);
  await fight_round([70, 85, 100, 104]);
  await fight_round([104, 116, 131, 136]);
  await sleep(65);
  window.location.replace("/");
}

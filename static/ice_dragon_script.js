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
    if (spell == 4) {
      await sleep(times[3] - times[2]);
      await get_spell();
      if (spell == 2) {
        await sleep(times[4] - times[3]);
        await get_spell();
        if (spell == 3) {
          boss_health = Math.max(boss_health - 30, 0);
          document.getElementById("ice_dragon_hp").innerHTML = boss_health;
          return;
        }
      }
    }
    spell = 0;
  }
}

async function main(){
  await configure_spells("SELECT_AND_CAST");
  await fight_round([0, 26, 43, 58, 62]);
  await fight_round([62, 81, 100, 114, 119]);
  await fight_round([119, 138, 156, 171, 176]);
  await sleep(72);
  window.location.replace("/");
}

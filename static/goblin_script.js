async function fight_round(times, goblin_attacks){
  while (true) {
    jump_in_video(times[0]);
    await sleep(times[1] - times[0]);
    if (goblin_attacks) {
      magi_health = Math.max(magi_health - 20, 0);
      document.getElementById("magi_hp").innerHTML = magi_health;
      if (magi_health == 0) {
        window.location.replace("/");
      }
    }
    await get_spell();
    await sleep(times[2] - times[1])
    await get_spell();
    if (spell == 1) {
      if (boss_health == 80 || boss_health == 10) {
        boss_health -= 10;
      } else {
        boss_health -= 20;
      }
      document.getElementById("goblin_hp").innerHTML = boss_health;
      await sleep(times[3] - times[2]);
      return;
    }
  }
}

async function main(){
  await configure_spells("CAST_ONLY");
  await fight_round([59, 113, 116, 123], true);
  await fight_round([123, 123, 127, 133], false);
  await fight_round([133, 135, 138, 145], false);
  await fight_round([145, 145, 149, 154], false);
  await fight_round([154, 163, 166, 173], true);
  await sleep(33);
  window.location.replace("/");
}

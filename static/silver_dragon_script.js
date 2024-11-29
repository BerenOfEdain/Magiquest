function play_clip(start_time, duration) {
    jump_in_video(start_time);
    return sleep(duration);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getDigitArray(num){
    let numStr = num.toString();
    let out = [];
    for (let i = 0; i < numStr.length; i++) {
        out.push(parseInt(numStr[i]));
    }
    return out;
}


const crystal_times = [182, 129.5, 132, 192, 127];
let selections = [];

function choose(num) {
    selections.push(num);
}

function compareArrays(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false
        }
    }
    return true
}

async function fight_round(cutscene_start, cutscene_duration, num_crystals) {
    await play_clip(cutscene_start, cutscene_duration);
    while (true) {
        var crystals = [];
        for (var i = 0; i < num_crystals; i++) {
            crystals.push(getRandomInt(5));
        }
        for (let j = 0; j < crystals.length; j++) {
            await play_clip(crystal_times[crystals[j]], 2.5);
        }
        selections = [];
        await play_clip(194, 8);
        if (!USE_BUTTONS) {
            let crystals_as_single_num = await get_spell();
            selections = getDigitArray(crystals_as_single_num);
            console.log(selections);
        }
        if (compareArrays(crystals, selections)) {
            boss_health -= 20;
            document.getElementById("silver_dragon_hp").innerHTML = boss_health;
            await play_clip(91, 10);
            return;
        } else {
            magi_health -= 40;
            document.getElementById("magi_hp").innerHTML = magi_health;
            await play_clip(145, 9);
            if (magi_health <= 0) {
                window.location.replace("/");
            }
        }
    }
}

async function main() {
    await configure_spells("CRYSTALS");
    await fight_round(21, 53, 2);
    await fight_round(101, 25, 2);
    await fight_round(216, 20, 2);
    await fight_round(274, 22, 2);
    await play_clip(333, 42);
    window.location.replace("/");
}
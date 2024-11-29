# MagiQuest at Home

This repo provides a way of playing legacy Magiquest at home.
It's obviously not the same as actually being there, but this is the best approximation I can create. Check out the photos under `game_photos/` to see the game in action!

Unfortunately, as I don't have access to raw video footage, I've had to extract segments from Youtube videos for various scenes.
My code jumps around in the videos based on actions performed (for instance based on if a user casts the correct spell during some time interval).
As these videos are owned by other people, I don't feel comfortable including them here so you will have to download videos of choice and tweak the timing.
(If someone wants to give me permission, I'll use their videos and credit them.)

Also if you want to play without building a wand and sensors, you can set `USE_BUTTONS` to `true` at the top of `static/common.js`.
This will add buttons you can click on to cast spells. If doing this, feel free to skip the *Electronics Setup* part of the instructions.

## Electronics Setup

You'll need the following:
 * An esp32 dev board with power source
 * 6 IR receivers and an 6 IR trasmitter like [these](https://www.amazon.com/gp/product/B0816P2545)
 * Wires
 * Something to provide 38 kHZ PWM (I used an Arduino for this.)

To power the esp32, it's probably easiest to get a USB Micro B to USB chord like [this](https://www.amazon.com/dp/B07KFRTHZN) and connect that to a USB power source.

**TODO** Add nice wiring diagrams.

### Sensors

You'll need to fill in three pieces of information in the code in `esp32_magiquest.ino`:
 * `ssid` - Set to your wifi name. If you have 5G and 2G, use 2G as the esp32 cannot handle 5G.
 * `password` - Set to your wifi password.
 * `apiPath` - Set to base URL for your web server. This depends on the IP address assigned by the router to your device.

Then compile and push to an esp32. The Arduino IDE is fine for this.

For each GPIO pin utilized (23, 2, 4, 5, 18, 22), you'll need to wire that pin to the DAT pin of an IR sensor.
Each IR sensor should have its VCC pin connected to the 3.3V pin on the esp3 and its GND pin connected to the GND pin on the Arduino.

### Wand

The wand can be any source of 38 kHZ PWM supplied to the IR transmitter.
Specifically, supply the PWM to the DAT pin, and also connect VCC to 3.3V and GND to ground.
You can do this with effectively any microcontroller - I used an Arduino.

A sample brief program to generate this PWM on an Arduino using pin 8 is given in `pwm.ino`.

### How It Works

The sensor connected to pin 23 is the "cast" sensor, and the other sensors correspond to "runes".
To cast a spell in most fights, you point the wand at the corresponding rune sensor and then at the cast sensor.

**TODO** Add a table telling which sensor maps to which spell for each fight.

There are two exceptions to this:
 * For the goblin king, the only spell involved is lightning which is cast by pointing the wand at the cast sensor.
 * For the silver dragon, the wand doesn't work; you click buttons in the web interface.

I may at a future date make the wand work for the silver dragon.
This is a bit more complicated though because pointing a wand at a sensor twice may get double counted.
For other fights, all that matters is which spell gets cast last during a fixed time interval so there's no issue with double counting.

## Server Setup

For each boss fight, you'll need to download a corresponding Youtube video of the fight to the Static folder and give it the same name as in the boss fight javascript file.
As these videos are owned by other people, I didn't want to include them here. You may have to adjust the timing in the javascript depending on the video chosen.

Before playing for the first time, run the Python script `create_db.py` to create a SQLite database.
This is not to store player history; it exists only to keep up with what spells are selected/cast by the user.

Then to play run the Python script `server.py`.

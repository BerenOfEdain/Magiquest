from flask import Flask, render_template, session, url_for
import json
import sqlite3

app = Flask('__name__')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/configure_spells/<mode>')
def configure_spells(mode):
    print("configured")
    conn = sqlite3.connect('data.db')
    conn.execute(f"update spell_data set mode='{mode}';")
    conn.commit()
    return ""

@app.route("/cast/<spell_id>")
def cast(spell_id):
    spell_id = int(spell_id)
    conn = sqlite3.connect('data.db')
    _, spell_mode, selected_spell, cast_spell = next(conn.execute("select * from spell_data;"))
    if spell_mode == 'SELECT_AND_CAST':
        if spell_id:
            conn.execute(f"update spell_data set selected_spell='{spell_id}';")
        else:
            conn.execute(f"update spell_data set cast_spell=selected_spell;")
    elif spell_mode == 'CAST_ONLY':
        if spell_id == 0:
            conn.execute("update spell_data set cast_spell=1;")
    elif spell_mode == 'CRYSTALS':
        if spell_id:
            if cast_spell:
                new_cast_spell = int(str(cast_spell) + str(spell_id - 1))
            else:
                new_cast_spell  = str(spell_id - 1)
            conn.execute(f"update spell_data set cast_spell={new_cast_spell};")
            print("spell ", new_cast_spell)
    conn.commit()
    return ""

@app.route('/spell')
def spell():
    conn = sqlite3.connect('data.db')
    spell = next(conn.execute('select * from spell_data;'))[3]
    conn.execute(f"update spell_data set selected_spell=0;")
    conn.execute(f"update spell_data set cast_spell=0;")
    conn.commit()
    return json.dumps({'spell': spell})

@app.route('/dragon')
def dragon():
    return render_template('dragon.html')

@app.route('/goblin')
def goblin():
    return render_template('goblin.html')

@app.route('/ice_dragon')
def ice_dragon():
    return render_template('ice_dragon.html')

@app.route('/xavier')
def xavier():
    return render_template('xavier.html')

@app.route('/silver_dragon')
def silver_dragon():
    return render_template('silver_dragon.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=True)

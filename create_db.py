import sqlite3

conn = sqlite3.connect('data.db')

query = """
create table spell_data
(id int primary key not null,
mode varchar(50),
selected_spell int,
cast_spell int);
"""
conn.execute(query)

query = "insert into spell_data (id, mode, selected_spell, cast_spell) values (1, '', 0, 0);"
conn.execute(query)

conn.commit()

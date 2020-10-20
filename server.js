const sqlite3 = require('sqlite3').verbose();

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

/* Connect to Database */
const db = new sqlite3.Database('./db/election.db', err => {
    if(err){
        return console.error(err.message);
    }

    console.log('Connected to the election database!');
});

/* DB TEST */
/* db.all('SELECT * FROM candidates', (err, rows) => {
    console.log(rows);
}); */

/* GET a single candidate */
/* db.get('SELECT * FROM candidates WHERE id = 1', (err, row) => {
    if(err){
        console.log(err);
    }
    console.log(row);
}); */

/* DELETE single record */
/* db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result, this, this.changes);
  }); */

/* INSERT new row */
const insertSql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                    VALUES (?,?,?,?)`;
const params= [1,'Ronald','Firbank',1];
//ES5 function so I can use "this" keyword
db.run(insertSql,params, function(err, result){
    if(err){
        console.log(err);
    }
    console.log(result, this.lastID);
});

app.use((req,res)=>{
    res.status(404).end();
});


// Listener
// ===========================================================
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

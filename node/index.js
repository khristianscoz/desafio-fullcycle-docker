const express = require('express')
const app = express()
const port = 9000
const config = {
    host: 'db',
    user: 'root',
    password: '123',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sqlCreateTabel = `CREATE TABLE IF NOT EXISTS people(id int auto_increment, name varchar(250), primary key(id)) `
connection.query(sqlCreateTabel)
connection.end()

app.use(express.urlencoded());
app.get('/', function(req, res){
    const connection = mysql.createConnection(config)
    const sqlQueryData = `SELECT * FROM people`
    var values = ''
    connection.query(sqlQueryData, function(err, rows, fields) {
        rows.forEach(function(row) {
            values = values + '<li>' + row.name + '</li>'
        })
        
        res.send(`
        <h1>Full Cycle Rocks!</h1>
        <div>
            <form method="POST" action="/">
                <label>Nome</label>
                <input type="text" name="name" id="name" />
                <input type="submit" name="submit_button" value="Adicionar" />
            </form>
        </div>
        <div>
            <h1>Result:</h1>
            <ul>
            ${values}
            </ul>
        </div>
	    `)
      })
    connection.end()
});

app.post('/', function(req, res){
    const connection = mysql.createConnection(config)
    const sqlInsertData = `INSERT INTO people(name) values (?)`
    connection.query(sqlInsertData, [req.body.name])
    connection.end()
	res.redirect('/')
});

app.listen(port)
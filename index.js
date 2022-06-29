const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const createPool = require("mysql");


app.use(cors());
app.use(express.json());// know data in json

app.use(bodyParser.urlencoded({ extended: false })); //work with post requisition

const port = process.env.PORT || 3001;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "multi_company",
    port: 3307
});

//console.log(db);


app.get('/', (req, res) =>{
   res.send("Funciona");
});

//get all
app.get('/stores', (req, res) => {
    try {
        let SQL = "SELECT * FROM store";
    
        db.query(SQL,(err, rows) => {
            console.log(' erro => ', err);
            console.log(' rows => ', rows);
            res.send(rows);
        });        
    } catch (error) {
        console.log(error);
    };
});

//get an 
app.get('/stores/:id', (req, res) =>{

    db.query('SELECT * FROM store WHERE store_id = '+req.params.id , (err, rows, fields) =>{
        if (!err)
        res.send(rows)
        else
        console.log(err);
    });
});

//delete all information 
app.delete('/stores/:id', (req, res) => {

    db.query('DELETE FROM store WHERE store_id = '+req.params.id, (err, rows, fields) => {
        if (!err)
            res.send('Deleted success.');
        else
            console.log(err);
    })
});

//insert an shop
app.post('/stores', (req, res) => {
    db.query('INSERT INTO store (storename, zipcode, address, state, city, cnpj, telephone, description, status) VALUES ("'+req.body.storename+'", "'+req.body.zipcode+'", "'+req.body.address+'", "'+req.body.state+'", "'+req.body.city+'", "'+req.body.cnpj+'", "'+req.body.telephone+'", "'+req.body.description+'", "'+req.body.status+'" )', 
    (err, rows, fields) => {
        if(!err)
        res.send('Registered successfully .');
        else
        console.log(err);
    }
     );  
});

//update 
app.put('/stores/:id', (req, res) => {
    console.log(req);
    const store_id =  req.body.id;
    db.query('UPDATE store SET storename = "'+req.body.storename+'", zipcode= "'+req.body.zipcode+'",  address="'+req.body.address+'",  state="'+req.body.state+'", city="'+req.body.city+'", cnpj="'+req.body.cnpj+'", telephone="'+req.body.telephone+'", description="'+req.body.description+'", status="'+req.body.status+'" WHERE  store_id = '+req.params.id, 
    (err, rows, fields) => {
        if (!err)
        res.send('successfully changed .');
        else
        console.log(err );
    }
    );
    
} );


app.listen(port, ()=> {
    console.log(`rodando na porta ${port}`);
});
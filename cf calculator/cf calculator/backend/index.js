import express from 'express'
import mysql from 'mysql'
import cors from 'cors'


const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.post("/", (req, res) => {
    const q_createTable = `
CREATE TABLE IF NOT EXISTS cf_calculation (
  electricityUsage FLOAT NOT NULL,
  naturalGasUsage FLOAT NOT NULL,
  carMileage FLOAT NOT NULL,
  flightMileage FLOAT NOT NULL,
  result FLOAT NOT NULL
);
`;

const q_insertData = `
INSERT INTO cf_calculation (electricityUsage, naturalGasUsage, carMileage, flightMileage, result)
VALUES (?, ?, ?, ?, ?);
`;

const values = [
    req.body.electricityUsage,
    req.body.naturalGasUsage,
    req.body.carMileage,
    req.body.flightMileage,
    req.body.result
]

// Execute the CREATE TABLE query
db.query(q_createTable, (err, data) => {
  if (err) throw err;

  // Execute the INSERT INTO query
  db.query(q_insertData, values, (err, data) => {
    if (err) return res.json(err);
    else return res.json("calculation added");
  });
});
})

app.listen(8800, () => {
    console.log('connected to backend')
})


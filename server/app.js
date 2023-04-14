const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var cars = [
  {
    id: 1,
    make: "abc",
    color: "red",
    price: 10000000,
  },
  {
    id: 2,
    make: "abc",
    color: "red",
    price: 10000000,
  },
  {
    id: 3,
    make: "abc",
    color: "red",
    price: 10000000,
  },
  {
    id: 4,
    make: "abc",
    color: "red",
    price: 10000000,
  },
];

app.get("/cars", (req, res) => {
  res.send(cars);
});

app.post("/cars", (req, res) => {
  const id = req.body.id;
  const make = req.body.make;
  const color = req.body.color;
  const price = req.body.price;

  cars.push({ id: id, make: make, color: color, price: price });
  res.send("Car added succesfully");
});

app.post("/cars/:id", (req, res) => {
  const make = req.body.make;
  const color = req.body.color;
  const price = req.body.price;
  let id = req.body.id;
  let x = parseInt(id);
  let pr = parseInt(price);
  // console.log(JSON.stringify(data) + id);

  cars.forEach((item, index) => {
    if (item.id === id) {
      cars.splice(index, 1);
    }
  });

  cars.push({ id: x, make: make, color: color, price: pr });
  res.send("added");
});

// app.get("/cars/delete/:id", (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   // console.log(JSON.stringify(data) + id);

//   cars.forEach((item, index) => {
//     if (item.id === id) {
//       cars.splice(index, 1);
//     }
//   });

//   res.send("deleted");
// });

app.delete("/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex((car) => car.id === id);
  if (index !== -1) {
    cars.splice(index, 1);
    res.send(`Car with ID ${id} deleted`);
  } else {
    res.status(404).send("Car not found");
  }
});

app.listen(3000, () => {
  console.log("listning on 3000.");
});

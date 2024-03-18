const express = require("express");
const app = express();

// 扱うデータをJSON形式と指定
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running");
});

// DB
const customers = [
  {
    id: 1,
    name: "山田太郎",
    age: 25,
    active: false,
  },
  {
    id: 2,
    name: "田中花子",
    age: 32,
    active: false,
  },
];

app.get("/api/customers", (req, res) => {
  res.json(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res.status(404).send("The customer with the given ID was not found");
  res.json(customer);
});

app.post("/api/customers", (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).send("名前と年齢は必須です。");
  }
  const customer = {
    id: customers.length + 1,
    name: req.body.name,
    age: req.body.age,
    active: false
  };
  customers.push(customer);
  res.json(customer);
});

app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res.status(404).send("The customer with the given ID was not found");
  customer.name = req.body.name;
  customer.age = req.body.age;
  res.json(customer);
});

app.put("/api/customers/active/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res.status(404).send("The customer with the given ID was not found");
  customer.active = !customer.active;
  res.json(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res.status(404).send("The customer with the given ID was not found");
  const index = customers.indexOf(customer);
  customers.splice(index, 1);
  res.json(customer);
});

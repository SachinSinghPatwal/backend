import express from "express";
const app = express();
const port = 3000;
app.use(express.json());

let allData = [];
let Id = 1;

// app.get("/", (req, res) => {
//   res.send("helo from sachin and his dick mf bitch");
// });
// app.get("/ice-tea", (req, res) => {
//   res.send("what ice tea would u prefer");
// });
// app.get("/X", (req, res) => {
//   res.send("Sachin singh patwal");
// });

// add something in data
app.post("/data", (req, res) => {
  const { name, price } = req.body;
  const newData = { id: Id++, name, price };
  allData.push(newData);
  res.status(201).send(newData);
});

// get all data
app.get("/data", (req, res) => {
  res.status(200).send(allData);
});

// get one data
app.get("/data/:id", (req, res) => {
  const particularData = allData.find(
    (each) => each.id == parseInt(req.params.id)
  );
  if (!particularData) res.status(404).send("not found requested data");
  res.status(200).send(particularData);
});

// update a particular data
app.put("/data/:id", (req, res) => {
  const updateData = allData.find(
    (each) => each.id === parseInt(req.params.id)
  );
  if (!updateData) res.status(404).send("not found requested data");
  const { name, price } = req.body;
  updateData.name = name;
  updateData.price = price;
  res.status(200).send(updateData);
});

// delete data
app.delete("/data/:id", (req, res) => {
  const index = allData.findIndex(
    (each) => each.id === parseInt(req.params.id)
  );
  if (index <= -1) return res.status(404).send("not found");
  allData.splice(index, 1);
  return res.status(200).send(allData);
});

app.listen(port, () => {
  console.log(`serve is running at port: ${port}...`);
});

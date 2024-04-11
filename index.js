const express = require("express");
const app = express();
const port = 3000;
const sAdmin = require("./Routes/S_admin");
const Users = require("./Routes/users");
const Vehicle = require("./Routes/vehicle");
const Materials = require("./Routes/materials");
const RoutePlanning = require("./Routes/RoutePlanning");
const Shipments = require("./Routes/Shipments");
const Orders = require("./Routes/Orders");
const participants = require('./Routes/participants')
const tasks=require('./Routes/ShipmentTasks')
const { authenticate } = require('./authenticationFunction/AuthFonction')
const passport = require('passport');
const auth=require('./Routes/AuthRoute')
const cors=require('cors')
// route

app.use(cors({
  origin:'http://localhost:5173'
}))



app.use(express.json());
// app.use(express.urlencoded({ extende: true }));
app.use("/auth",auth)

app.use("/sAdmin",sAdmin);
app.use("/users", Users);
app.use("/vehicle", Vehicle);
app.use("/materials", Materials);
app.use("/routePlanning", RoutePlanning);
app.use("/shipments", Shipments);
app.use("/orders",Orders);
app.use("/participant",participants)
app.use("/shipmentTasks",tasks)
app.listen(port, () => {
  console.log("le serveur a démaré au port" + port);
});

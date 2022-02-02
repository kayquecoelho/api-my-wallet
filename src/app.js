import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb"; 
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("my-wallet")
})

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required()
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required()
});

const app = express();
app.use(json());
app.use(cors());

app.post("/sign-up", async (req, res) => {
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  if (validation.error) {
    const arrErrors = validation.error.details.map((e) => e.message);
    const message = arrErrors.join(", ");
    return res.status(422).send(message);
  }

  try {
    const isRegistrated = await db.collection("users").findOne({ email: user.email });

    if (isRegistrated){
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);
    await db.collection("users").insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
    
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/sign-in", async (req, res) => {
  const login = req.body;
  const validation = loginSchema.validate(login);

  if (validation.error){
    const arrErrors = validation.error.details.map((e) => e.message);
    const message = arrErrors.join(", ");
    return res.status(422).send(message);
  }

  try {
    const user = await db.collection("users").findOne({ email: login.email });

    if (user && bcrypt.compareSync(login.password, user.password)) {
      const token = uuid();

      await db.collection("sessions").insertOne({ token, userID: user._id });

      return res.send(token);
    } 
    
    res.sendStatus(401);
  } catch (error) {
    console.log(error); 
    res.sendStatus(500);
  }
})

app.get("/transactions", async (req, res) => {
  const { authorization } = req.headers;
  const authorizationSchema = joi.string().pattern(/^Bearer /).required();
  const validation = authorizationSchema.validate(authorization);

  if (validation.error) {
    return res.status(422).send("O formato do header é inválido!");
  }

  const token = authorization?.replace("Bearer ", "");

  if (!token){
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userID });
    const transactions = await db.collection("transactions").find({ userID: session.userID}).toArray();

    const message = {
      name: user.name,
      transactions
    }; 
    
    res.send(message);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  
})

app.listen(5000, () => {
  console.log("Server is listening on port 5000.")
});
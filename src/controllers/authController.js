import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../db.js"

export async function registrateUser(req, res) {
  const user = req.body;
  
  try {
    const passwordHash = bcrypt.hashSync(user.password, 10);
    await db.collection('users').insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function login (req, res) {
  const login = req.body;

  try {
    const user = await db.collection('users').findOne({ email: login.email });

    if (user && bcrypt.compareSync(login.password, user.password)) {
      const token = uuid();

      await db.collection('sessions').insertOne({ token, userID: user._id });

      return res.send({ token, name: user.name });
    }

    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
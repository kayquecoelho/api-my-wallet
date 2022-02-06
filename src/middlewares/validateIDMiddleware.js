import { ObjectId } from "mongodb";
import db from "../db.js";

export async function validateIDMiddleware(req, res, next){
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(422);
  }
  
  try {
      const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id)});

      if (!transaction) {
        return res.sendStatus(404);
      }
      
      res.locals.transaction = transaction;
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }

  next();
}
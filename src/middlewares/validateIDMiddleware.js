import { ObjectId } from "mongodb";
import db from "../db.js";
import idSchema from "../schemas/idSchema.js";

export async function validateIDMiddleware(req, res, next){
  const { id } = req.params;
  const { session } = res.locals;
  
  if (!id) {
    return res.sendStatus(422);
  }

  const validation = idSchema.validate(id);

  if(validation.error) {
    return res.sendStatus(422);
  }
  
  try {
      const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id)});

      if (!transaction) {
        return res.sendStatus(404);
      }
    
      const isAuth = await db.collection("transactions").findOne({ 
        _id: new ObjectId(id), 
        userID: new ObjectId(session.userID) 
      })
      
      if (!isAuth){
        return res.status(401).send("Você não tem autorização!")
      }

      res.locals.transaction = transaction;
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }

  next();
}
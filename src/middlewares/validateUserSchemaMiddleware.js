import userSchema from "../schemas/userSchema.js";
import db from "../db.js";

export async function validateUserSchemaMiddleware(req, res, next){
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  if (validation.error) {
    const arrErrors = validation.error.details.map((e) => e.message);
    const message = arrErrors.join(', ');
    return res.status(422).send(message);
  }

  const isRegistrated = await db.collection('users').findOne({ email: user.email });

  if (isRegistrated) {
    return res.sendStatus(409);
  }

  next();
}
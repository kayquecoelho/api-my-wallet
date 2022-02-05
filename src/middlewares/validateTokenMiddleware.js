import db from "../db.js";
import authSchema from "../schemas/authSchema.js";

export async function validateTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const validation = authSchema.validate(authorization);
  
  if (validation.error) {
    return res.status(422).send('O formato do header é inválido!');
  }
  
  const token = authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.sendStatus(401);
  }

  const session = await db.collection('sessions').findOne({ token });
  if (!session) {
    return res.sendStatus(401);
  }

  res.locals.session = session;

  next();
}
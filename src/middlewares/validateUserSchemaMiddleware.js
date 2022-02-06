import userSchema from '../schemas/userSchema.js';
import db from '../db.js';
import { stripHtml } from 'string-strip-html';

export async function validateUserSchemaMiddleware(req, res, next) {
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  if (validation.error) {
    const arrErrors = validation.error.details.map((e) => e.message);
    const message = arrErrors.join(', ');
    return res.status(422).send(message);
  }

  const passwordStripped = stripHtml(user.password).result.trim();
  if (passwordStripped !== user.password) {
    const message = 'HTML is not allowed, empty spaces are not allowed ';
    return res.status(422).send(message);
  }

  const arrName = stripHtml(user.name).result.trim().split(' ');
  const nameFiltered = arrName.filter((str) => !(str === ''));
  user.name = nameFiltered.join(' ');

  const isRegistrated = await db
    .collection('users')
    .findOne({ email: user.email });

  if (isRegistrated) {
    return res.sendStatus(409);
  }

  next();
}

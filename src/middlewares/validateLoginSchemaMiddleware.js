import loginSchema from "../schemas/loginSchema.js";

export function validateLoginSchemaMiddleware(req, res, next) {
  const login = req.body;
  const validation = loginSchema.validate(login, { abortEarly: false });
  
  if (validation.error) {
    const arrErrors = validation.error.details.map((e) => e.message);
    const message = arrErrors.join(', ');
    return res.status(422).send(message);
  }

  next();
}
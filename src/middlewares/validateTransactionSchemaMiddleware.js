import transactionSchema from "../schemas/transactionSchema.js";
import { stripHtml } from "string-strip-html";

export function validateTransactionSchemaMiddleware(req, res, next) {
  const transaction = req.body;
  const validation = transactionSchema.validate(transaction, { abortEarly: false });
  
  if (validation.error) {
    const arrErros = validation.error.details.map(e => e.message);
    const message = arrErros.join(", ");
    return res.status(422).send(message);
  }

  const arrDescription = stripHtml(transaction.description).result.trim().split(" ");
  const descriptionFiltered = arrDescription.filter(str => !(str === ""));
  transaction.description = descriptionFiltered.join(" ");

  next();
}
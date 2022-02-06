import transactionSchema from "../schemas/transactionSchema.js";
import { stripHtml } from "string-strip-html";
import updatedTransactionSchema from "../schemas/updateTransactionSchema.js";

export function validateTransactionSchemaMiddleware(req, res, next) {
  const transaction = req.body;
  let validation;
  if (req.method === "PUT"){
    validation = updatedTransactionSchema.validate(transaction, { abortEarly: false });
  } else {
    validation = transactionSchema.validate(transaction, { abortEarly: false });
  }
  
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
import joi from 'joi';

const transactionSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().pattern(/^[a-zA-Z]{3,}$/).required(),
  type: joi.string().valid("entrada", "saída").required()
})

export default transactionSchema;
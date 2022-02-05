import joi from 'joi';

const transactionSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().pattern(/[a-zA-z]{3}/).required(),
})

export default transactionSchema;
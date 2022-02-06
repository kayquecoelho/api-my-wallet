import joi from 'joi';

const updatedTransactionSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().pattern(/^[a-zA-Z\s]{3,}$/).required(),
})

export default updatedTransactionSchema;
import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export default loginSchema;
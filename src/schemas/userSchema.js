import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().pattern(/^[a-zA-Z\s]{3,}$/).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(/^[a-zA-Z0-9]{3,}$/).required(),
});

export default userSchema;
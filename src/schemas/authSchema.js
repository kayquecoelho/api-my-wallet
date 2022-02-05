import joi from 'joi';

const authSchema = joi.string().pattern(/^Bearer /).required();

export default authSchema;
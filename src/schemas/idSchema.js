import joi from 'joi';

const idSchema = joi.string().length(24).required();

export default idSchema;
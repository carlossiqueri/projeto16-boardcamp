import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(11),
  cpf: joi
    .string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  birthday: joi.date().required(),
});

export default customerSchema;

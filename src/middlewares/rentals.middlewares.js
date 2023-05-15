import { rentalSchema } from "../schemas/rentalSchema";

export const rentalMiddleware = (req, res, next) => {
  const validate = rentalSchema.validate(req.body, { abortEarly: false });
  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  next();
};

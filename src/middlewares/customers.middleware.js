import { db } from "../database/database.connection.js";
import gameSchema from "../schemas/gameSchema.js";

const customerMiddleware = async (req, res, next) => {
  const { cpf } = req.body;

  const validate = gameSchema.validate(req.body, { abortEarly: false });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const validateCpf = await db.query(
      `SELECT * FROM customers WHERE cpf=($1)`,
      [cpf]
    );

    if (validateCpf.rows[0]) return res.sendStatus(409);
  } catch (err) {
    res.status(500).send(err.message);
  }
  next();
};

const customerByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const validateCustomerId = await db.query(
      `SELECT * FROM customers WHERE id=($1);`,
      [id]
    );
    if (!validateCustomerId.rows[0]) return res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
  next();
};

export { customerMiddleware, customerByIdMiddleware };

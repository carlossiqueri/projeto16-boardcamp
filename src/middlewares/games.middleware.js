import { db } from "../database/database.connection.js";
import gameSchema from "../schemas/gameSchema.js";

const gamesMiddleware = async (req, res, next) => {
  const validate = gameSchema.validate(req.body, { abortEarly: false });

  if (validate.error) {
    const errors = validate.error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const verifyName = await db.query(`SELECT * FROM games WHERE name=($1)`, [
      req.body.name,
    ]);
    if (verifyName.rows[0]) {
      res.sendStatus(409);
      return;
    }
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
  next();
};
export default gamesMiddleware;

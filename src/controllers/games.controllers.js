import { db } from "../database/database.connection.js";

export const getGames = async (req, res) => {
  try {
    const games = await db.query(`SELECT * FROM games;`);
    res.status(200).send(games.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postGames = async (req, res) => {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

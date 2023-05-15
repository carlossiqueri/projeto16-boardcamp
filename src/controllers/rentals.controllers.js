import { db } from "../database/database.connection";
import dayjs from "dayjs";

export const postRental = async (req, res) => {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customer = await db.query(
      `SELECT * FROM customers WHERE id =( $1);`,
      [customerId]
    );
    if (!customer.rows[0]) return res.sendStatus(400);

    const rentedGame = await db.query(`SELECT * FROM games WHERE id =( $1);`, [
      gameId,
    ]);

    if (!rentedGame.rows[0]) return res.sendStatus(400);

    const rentPrice = rentedGame.rows[0].pricePerDay;

    const rentLog = await db.query(
      `SELECT * FROM rentals WHERE "gameId=($1);`,
      [gameId]
    );
    if (rentLog.rows.length >= rentedGame.rows[0].stockTotal)
      return res.sendStatus(400);

    // valor incial de returnDate e delayFee ao inserir o alugel

    const returnDate = null;
    const delayFee = null;

    // rentDate e originalPrice setup

    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = daysRented * rentPrice;

    // post do aluguel em si

    await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ( $1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getRentals = async (req, res) => {
    try{
        const unformatRentals = await db.query(`
            SELECT rentals.*,
            customers.id AS customers_id,
            customers.name AS customers_name
        `)
    } catch (err) {
    res.status(500).send(err.message);
  }
}
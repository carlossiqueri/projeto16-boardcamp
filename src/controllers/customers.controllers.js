import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export const postCustomers = async (req, res) => {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customersNoBirth = await db.query(`SELECT * FROM customers;`);
    const customersWithBirth = customersNoBirth.rows.map((p) => ({
      ...p,
      birthday: dayjs(p.birthday).format("YYYY-MM-DD"),
    }));
    res.status(200).send(customersWithBirth);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getCustomersById = async (req, res) => {
  const { id } = req.params;
  try {
    const customerById = await db.query(
      `SELECT * FROM customers WHERE id=($1);`,
      [id]
    );
    res.status(200).send(customerById.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  try {
    await DataView.query(
      `UPDATE customers SET name=($1), phone=($2), cpf=($3), birthday=($4) WHERE id=($5);`,
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

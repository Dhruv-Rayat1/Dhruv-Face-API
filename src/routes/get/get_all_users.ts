import express, { Request, Response } from "express";

import { pool } from "../../core/database/pool";
import { authenticate_token } from "../../core/authentication/auth";
import { get_all_users } from "../../core/middleware/get_middleware";

let router = express.Router();

router.get(
  "/",
  authenticate_token,
  get_all_users,
  async (req: Request, res: Response) => {
    const query_select_all = "SELECT * FROM users";
    let sql_res;

    try {
      sql_res = await pool.query(query_select_all);
    } catch (err: any) {
      return res.status(500).send({ detail: err.stack });
    }

    return res.send(sql_res.rows);
  }
);

// Exporting the module, so we can use it from the main file
module.exports = router;

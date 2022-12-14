import { Request, Response, NextFunction } from "express";

import { roles } from "../data/roles";
import { decode_token } from "../jwt/decrypt_token";

export let delete_user: (
  req: Request,
  res: Response,
  next: NextFunction
) => any = (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let decode = decode_token(token!);

  if (decode.role === roles.ADMIN || decode.role === roles.GOD) return next();

  if (decode.username === req.body.username) {
    next();
  } else {
    return res
      .status(401)
      .send({ detial: "Token must be the same as the user being deleated." });
  }
};

export let delete_admin: (
  req: Request,
  res: Response,
  next: NextFunction
) => any = (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let decode = decode_token(token!);

  if (decode.role !== roles.GOD)
    return res
      .status(401)
      .send({ detail: "You need to be GOD to access this endpoint" });

  next();
};

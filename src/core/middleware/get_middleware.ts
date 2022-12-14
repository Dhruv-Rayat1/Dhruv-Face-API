import { Request, Response, NextFunction } from "express";

import { roles } from "../data/roles";
import { decode_token } from "../jwt/decrypt_token";

export let get_all_users: (
  req: Request,
  res: Response,
  next: NextFunction
) => any = (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let decode = decode_token(token!).role;

  if (decode !== roles.GOD && decode !== roles.ADMIN)
    return res.status(401).send({ detail: "Incorrect role" });

  next();
};

export let get_specific_user: (
  req: Request,
  res: Response,
  next: NextFunction
) => any = (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let decode = decode_token(token!);

  if (decode.role === roles.CREATE_USER)
    return res.status(401).send({ detail: "Incorrect role" });

  if (req.query.username !== decode.username) {
    if (decode.role === roles.GOD || decode.role === roles.ADMIN) {
      next();
    } else {
      return res
        .status(403)
        .send({ detail: "Please use the same token as the user" });
    }
  } else {
    next();
  }
};

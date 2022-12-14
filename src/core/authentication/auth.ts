import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${__dirname}/../../.env` });

export let authenticate_token: (
  req: any,
  res: Response,
  next: NextFunction
) => any = (req: any, res: Response, next: NextFunction) => {
  const auth_header = req.headers["authorization"];
  const token = auth_header && auth_header.split(" ")[1]; // Splitting because it goes: "Bearer [space] TOKEN"
  if (token === null) return res.sendStatus(401);

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ result: "Forbidden" });

    req.user = user;
    next();
  });
};

import express, { Application, Request, Response } from "express";
const cors = require("cors");
const app: Application = express();

const port = 3000;

app.use(cors());
app.use(express.json());

// Routes -- GET
const get_all_users = require("./routes/get/get_all_users");
const get_specific_user = require("./routes/get/get_specific_user");

// ---------------------------- //

// Routes -- POST
const create_admin = require("./routes/post/create_admin");
const create_user_no_verification = require("./routes/post/create_user_no_verification");
const verify_email_create_user = require("./routes/post/verify_email_create_user");
const create_user = require("./routes/post/create_user");
const user_login = require("./routes/post/user_login");
const create_post = require("./routes/post/create_post");

// ---------------------------- //

// Routes -- DELETE
const delete_user = require("./routes/delete/delete_user");
const delete_admin = require("./routes/delete/delete_admin");

// ---------------------------- //

// Routes -- PUT
const update_user = require("./routes/put/update_user");

// ---------------------------- //

// Routes -- AUTH
const login = require("./core/authentication/login");

// ----------------------------------------------------------------------- //

// Use Routes -- GET
app.use("/get/get_all_users", get_all_users);
app.use("/get/get_specific_user", get_specific_user);

// ---------------------------- //

// Use Routes -- POST
app.use("/post/create_admin", create_admin);
app.use("/post/create_user_no_verification", create_user_no_verification);
app.use("/post/verify_email_create_user", verify_email_create_user);
app.use("/post/create_user", create_user);
app.use("/post/user_login", user_login);
app.use("/post/create_post", create_post);

// ---------------------------- //

// Use Routes -- DELETE
app.use("/delete/delete_user", delete_user);
app.use("/delete/delete_admin", delete_admin);

// ---------------------------- //

// Use Routes -- PUT
app.use("/put/update_user", update_user);

// ---------------------------- //

// Use Routes --- AUTH
app.use("/auth/login", login);

// Base endpoint
app.get("/", (req: Request, res: Response) => {
  res.send({ detail: "Welcome to the Dhruv-Face API!" });
});

// Fallback
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    detail: "This endpoint does not exist, please pick one that does",
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

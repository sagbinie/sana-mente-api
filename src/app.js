import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import "core-js/stable";
import "regenerator-runtime/runtime";

import { createRoles } from "./libs/initialSetup";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import documentRoutes from "./routes/document.routes";

const app = express();
createRoles();

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/documents", documentRoutes);

export default app;

import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: "http://localhost:3000",
    // origin: "https://g88bg4sl-3000.inc1.devtunnels.ms",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

//routes imports
import productRouter from "./routes/product.routes.js";

import userRouter from "./routes/auth.routes.js";
import contactRouter from "./routes/contact.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import orderRouter from "./routes/order.routes.js";

//routes declaration
app.use("/api/v1/", paymentRouter);
app.use("/api/v1/", orderRouter);
app.use("/api/v1/", productRouter);
app.use("/api/v1/", contactRouter);
app.use("/api/v1/auth", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default app;

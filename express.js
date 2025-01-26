import express from "express";

export default function initExpress() {
  const app = express();
  const port = 8000;

  app.get("/health", (req, res) => {
    res.send("OK");
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });
}

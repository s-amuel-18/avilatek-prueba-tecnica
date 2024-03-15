// import http from "http";
import app from "./app";

const PORT = 3000;

// const server = http.createServer(app);

app.listen(PORT, () => {
  try {
    console.log("[SERVER STARTED]");
  } catch (error) {
    console.log("[SERVER ERROR]");
  }
});

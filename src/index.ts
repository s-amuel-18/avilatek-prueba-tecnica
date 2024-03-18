import app from "./app";
import { environment } from "./config/environment.config";

app.listen(environment.APP_PORT, () => {
  try {
    console.log("[SERVER STARTED]");
  } catch (error) {
    console.log("[SERVER ERROR]");
  }
});

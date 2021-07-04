import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Video";
import "./models/Comment";
import app from "./Server";

const PORT = process.env.PORT;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
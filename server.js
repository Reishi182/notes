import "dotenv/config";
import app from "./app.js";
import db from "./db.js";
const port = process.env.APP_PORT;

async function checkConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Database connection successful");
    connection.release;
  } catch (err) {
    console.error("Database connection failed", err.message);
    process.exit(1);
  }
}

checkConnection();

app.listen(port, () => {
  console.log(`server is listening http://localhost:${port}`);
});

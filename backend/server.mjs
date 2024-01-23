import { app } from "./app.mjs";
import { connectDB } from "./db/index.mjs"

const PORT = process.env.PORT || 8080;

// Connect Database (MongoDb)
connectDB();

// Start Express Server
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`))


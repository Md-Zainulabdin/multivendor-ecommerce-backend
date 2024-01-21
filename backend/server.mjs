import { app } from "./app.mjs";

const PORT = process.env.PORT || 8080;

// Start Express Server
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`))


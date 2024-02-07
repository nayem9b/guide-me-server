import app from "./app";
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const main = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
  });
};

main();

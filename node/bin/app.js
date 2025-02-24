import express from "express";
import mongoose from 'mongoose';
const app = express();

mongoose.connection.on("error", function (err) {
  console.error(err);
});
mongoose.connection.once("open", function () {
  console.log(`[mongodb] connected to mongodb://root:1234@mongo:27017/`);
});
mongoose.connect(`mongodb://root:1234@mongo:27017/`, {
  authSource: "admin"
});

app.get('/', (req, res) => res.send('Hello, docker!'));
app.listen(3000, () => console.log('[express] running on port 3000'));
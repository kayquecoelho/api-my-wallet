import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
app.use(json());
app.use(cors());

app.use(router);

app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});

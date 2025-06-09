import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.connection.js';
import cors from 'cors';
import githubRoutes from './routes/github.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('welcome');
});

app.use('/api/github', githubRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/auth', authRoutes);

app.get('/', (_, res) => res.send('Genshin DnD API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

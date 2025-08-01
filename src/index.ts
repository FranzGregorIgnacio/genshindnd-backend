import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import pingRoute from './routes/ping';
import userRoutes from './routes/users';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/ping', pingRoute);
app.use('/api/users', userRoutes);

app.get('/', (_, res) => res.send('Genshin DnD API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

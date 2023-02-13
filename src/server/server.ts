import express from 'express';
import cors from 'cors';
import { getAll, create, deleteById } from './controller.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Cool'});
});

app.get('/api/notes', getAll);
app.post('/api/notes', create);
app.delete('/api/notes/:id', deleteById);

app.listen(port);



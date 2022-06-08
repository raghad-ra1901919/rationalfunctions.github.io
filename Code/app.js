import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import router from './router.js';


const port = process.env.PORT || 9090;
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);

app.get("/", (req, res) => {
   res.sendFile('public/login.html', { root: '.' });
});

app.listen(port, () => console.log(`server listening on http://localhost:${port}`));

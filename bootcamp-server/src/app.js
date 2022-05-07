import express from 'express';
import appRoutes from './router/api.routes.js';
import { config } from './config/index.js'
import cors from 'cors';
import bodyParser from 'body-parser';


const { env, PORT} = config;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', appRoutes);


app.listen(PORT, () => {
     console.log(`listening in ${env} mode on port ${PORT}`);
})

export default app;

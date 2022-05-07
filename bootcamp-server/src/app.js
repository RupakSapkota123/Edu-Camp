import express from 'express';
import dotenv from 'dotenv'
//load env vars
dotenv.config({path: './config/config.env'})

const router = express.Router();
const app = express();


const PORT = process.env.PORT || 9000
const mode = process.env.PORT

console.log(mode)

router.get('/', (req, res) => {
     res.json({'Hello World!': 'Welcome to the bootcamp server'});

})

router.get('/api/v1/bootcamp', (req, res) => {
     res.json({'Hello World!': 'Welcome to the bootcamp server'});
})

app.use(router);

app.listen(PORT, () => {
     console.log(`listening in ${mode} mode on port ${process.env.PORT}`);
})

export default app;

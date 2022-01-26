import express from 'express';
import cookieSession from 'cookie-session';
import { router } from './routes/loginRoutes';
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieSession({keys: ['secretKey']}));
app.use(router);

app.listen(3001, ()=>{
    console.log('Server is running on 3001');
});

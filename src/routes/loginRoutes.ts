import {Router, Response, Request, NextFunction}from 'express';

interface RequestWithBody extends Request{
    body: {[key: string]: string | undefined}
};

function requireAuth(req:Request, res:Response, next: NextFunction): void{
    if(req.session && req.session.loggedIn){
        next();
        return;
    }
    res.status(403);
    res.send('Access is denied')
};

const router = Router();

//LOGIN FORM
router.get('/login', (req:Request, res:Response)=>{
    res.send(`
        <form method="POST">
            <div>
                <label> Email </label>
                <input name="email" type="email"/>
            </div>
            <div>
                <label> Password </label>
                <input name="password" type="password"/>
            </div>
            <button>Submit</button>
        </form>
    `);
});

//IF LOGIN DATA IS TRUE REDIRECT TO NEEDED URL
router.post('/login', (req: RequestWithBody, res: Response)=>{
    const {email, password} = req.body;
    if(email && password && email === 'zeynal24@mail.ru' && password==='zeynal24'){
        // show that user is logged in
        req.session = {loggedIn: true};

        //redirected to route
        res.redirect('/');
    }
    else{
        res.send('Yuo should write an email')
    }
});

//CHEKING IF SESSION IS TRUE SHOW RELATED RESPONSE
router.get('/', (req: Request, res: Response)=>{
    if(req.session && req.session.loggedIn){
        res.send(`<div>
            <h1>You are logged in</h1>
            <a href="/logout">Log out</a>
        </div>`
    )
    }else{
        res.send(`<div>
        <h1>You are not logged in</h1>
        <a href="/login">Log In</a>
    </div>`)
    }
});

// LOG OUT SIDE
router.get('/logout', (req:Request, res:Response)=>{
    req.session = undefined;
    res.redirect('/');
});


// AFTER LOGIN CHECKING IF ROUTE PROTECTED OR NOT
router.get('/protected', requireAuth, (req:Request, res:Response)=>{
    res.send('Welcome to protected route, user is logged')
});

export {router};
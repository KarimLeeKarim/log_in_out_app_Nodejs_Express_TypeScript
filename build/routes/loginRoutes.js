"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
;
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Access is denied');
}
;
const router = (0, express_1.Router)();
exports.router = router;
//LOGIN FORM
router.get('/login', (req, res) => {
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
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === 'zeynal24@mail.ru' && password === 'zeynal24') {
        // show that user is logged in
        req.session = { loggedIn: true };
        //redirected to route
        res.redirect('/');
    }
    else {
        res.send('Yuo should write an email');
    }
});
//CHEKING IF SESSION IS TRUE SHOW RELATED RESPONSE
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`<div>
            <h1>You are logged in</h1>
            <a href="/logout">Log out</a>
        </div>`);
    }
    else {
        res.send(`<div>
        <h1>You are not logged in</h1>
        <a href="/login">Log In</a>
    </div>`);
    }
});
// LOG OUT SIDE
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
// AFTER LOGIN CHECKING IF ROUTE PROTECTED OR NOT
router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to protected route, user is logged');
});

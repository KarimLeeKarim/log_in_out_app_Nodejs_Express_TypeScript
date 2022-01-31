# Log In and Out App Nodejs Express TypeScript.

*Brief info: In this small and simple app I have tried to show you how is working Node Express with TypeScript*

1. Firstly install 2 modules [Nodemon](https://www.npmjs.com/package/nodemon) & [Concurrently](https://www.npmjs.com/package/concurrently):<br>
 - Nodeman will monitor for any changes in your source and automatically restart your server when your code changes.<br>
 - Concurrently module will help us to run  many scripts.<br>
 
*Also be advised that in package.json in scripts field `tsc -w` will create compilation from TS to JS process but automatic*
```bash
npm i nodemon concurrently
```

2.And here we goo
```bash
npm run start
```

const app = require('express')();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));
let user = {
    user_id: "kim",
    user_pwd: "1111"
};

app.get('/', (req, res)=>{
    if(req.session.logined){
        res.render('logout.ejs', {id:req.session.user_id});
        console.log(req.session);
        
    }else{
        console.log(req.session);
        res.render('login.ejs');
    }
});

app.post('/', (req,res)=>{
    if(req.body.id == user.user_id && req.body.pwd == user.user_pwd){
        req.session.logined=true;
        req.session.user_id=req.body.id;
        res.render('logout.ejs', {id: req.session.user});
    }else{
        res.send(`
        <h1> Who are you? </h1>
        <a href="/">back</a>
        `);
    }
});
app.post('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log('listening 3000Port');
});
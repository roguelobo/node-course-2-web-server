const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

const app = express();

// add partials passing in their location
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//////////////////////////
// MIDDLEWARE
//  This is called before the page is served up.
//  app.use((req, res, next)=>{});
//////////////////////////
app.use((req, res, next)=>{
    // Anything that comes from the client, browser, phone, whatever, is contained in the req object.
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });

    // you have to call next() or this function will never return and the app will hang.
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
//     /* ***************************************
//         NOTE:
//         Not calling next() in this middleware because we want to stop here!
//     ****************************************** */
// });

// middleware
app.use(express.static(__dirname + '/public'));


// Helpers
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});


//////////////////////
// Routes
//////////////////////
app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'yo momma mamba jamba'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'failure'
    });
});


app.listen(3000, ()=>{
    console.log("Server up on port 3000");
});









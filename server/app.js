const express = require('express');
const path = require('path');
const bodyParser  = require('body-Parser')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.setHeader("Set-Cookie", "token= 12345")
    res.send('Hello API')
});

app.use(express.static(path.join(__dirname, 'static')));

const productRoute = require('./routes/product');
app.use(productRoute.router);

const customerRoute = require('./routes/customer');
app.use(customerRoute.router);

// const middleware = require('./middlewares/aunt-middleware')
// app.use(middleware);
const businessRouter = require('./routes/business');
app.use(businessRouter.router);



app.listen(4000, () => {
    console.log(`Server started on port`+ 4000);
});
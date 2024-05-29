const express = require("express");
const app = express();
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error.js")
const userRoute = require('./routes/userRoute.js')
const cartRoute = require('./routes/cartRoute.js')
const productRoute = require('./routes/productRoute.js')
const teamRoute = require('./routes/teamRoute.js')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const {fileURLToPath} = require("url");
const contactRoute = require("./routes/contactRoute.js")
dotenv.config()
const path = require('path')


const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// console.log(path.join(__dirname,'../frontend/dist/index.html'))
// app.use(express.static(path.join(__dirname,'../frontend/dist')))

app.get('/',(req,res)=>{
    res.send({message:"Hello"})
})

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// })

app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/team',teamRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1',contactRoute);



app.use(errorMiddleware);

module.exports = app;
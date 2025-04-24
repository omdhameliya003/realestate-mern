const experss= require("express");
require("./db/connect");
const dotenv=require("dotenv");
const cors= require('cors');
const auth=require("./routes/auth")
const property=require("./routes/property")
dotenv.config();
const PORT=process.env.PORT || 5000;

const app=experss();
app.use(experss.json())
app.use(cors())

 app.use('/auth',auth);
 app.use("/",property)

app.use((req, res) => {
   res.status(404).send(`Route not found: ${req.method} ${req.originalUrl}`);
 });

app.listen(PORT,()=>{
    console.log("server start..")
})
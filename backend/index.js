const experss= require("express");
require("./db/connect");
const dotenv=require("dotenv");
const cors= require('cors');
const auth=require("./routes/auth")
const propertyRoute=require("./routes/propertyRoute")
const savedPropertyRoute= require("./routes/savedPropertyRoute")
const comment= require("./routes/CommentRoute")
const RequiestRoute= require("./routes/RequiestRoute")
const MessageRoute= require("./routes/MessageRoute")
const EmailRouter= require("./routes/EmailRoute")
dotenv.config();
const PORT=process.env.PORT || 5000;

const app=experss();
app.use(experss.json())
app.use(cors())

 app.use('/auth',auth);
 app.use("/",propertyRoute)
 app.use("/",savedPropertyRoute)
 app.use("/",comment)
 app.use("/",RequiestRoute)
 app.use("/",MessageRoute)
 app.use("/",EmailRouter)
 

app.use((req, res) => {
   res.status(404).send(`Route not found: ${req.method} ${req.originalUrl}`);
 });


app.listen(PORT,()=>{
    console.log("server start..")
})
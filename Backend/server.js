require('dotenv').config();         // You can access .env now
const app = require('./src/app');


// Create Server
app.get('/',(req,res)=>{
    res.send("Hello World")
})


// Start server
app.listen(3000,()=>console.log("Server started at port 3000"))
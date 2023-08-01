import express from 'express'
import cRouter from '../routes/cartRoute.js'
import pRouter from '../routes/productRoute.js'
import handlebars from 'handlebars'


const app = express()
const PORT = 8080
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));



app.engine("handlebars", handlebars.engine());
app.set("views", main.handlebars + "/public/views");
app.set("/public/views");
app.set("view engine", "handlebars");


app.use("/api/cart", cRouter)
app.use("/api/products", pRouter)




app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})
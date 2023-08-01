import Router from "express"
import ProductManager from "../ProductManager.js"
const pRouter = Router()

const products = new ProductManager("../data/data.json")

pRouter.get('/', (req, res) => {
    res.status(200).send(products.getProducts())
})

pRouter.get('/:pid', (req, res) => {
    const { pid } = req.params;

    const result = products.getProductByID(pid);

    if( result.id ){
        res.status(200).send(result)
    }else{
        res.status(400).send(result)
    }
})

pRouter.put('/:pid', (req,res) => {
    const {pid} = req.params;
    const {title, description, code, price,  stock, thumbnail} = req.body;

    const result = products.updateProduct(pid, {title, description, code, price,  stock, thumbnail});

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
})

pRouter.delete('/:pid', (req, res) => {
    const { pid } = req.params;

    const result = products.deleteProduct(pid);

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
    
})

pRouter.post('/', (req,res) => {
    const {title, description, code, price, stock, thumbnail} = req.body;

    if(!title){
        throw new Error('Please add a title')
    }

    if(!description){
        throw new Error('Please add a description')
    }

    if(!code){
        throw new Error('Please add a code')
    }

    if(!price){
        throw new Error('Please add a price')
    }

    if(!stock){
        throw new Error('Please add a stock')
    }

    const product = {title, description, code, price, stock, thumbnail}
    const productAdded = products.addProduct(product);
    res.status(200).send(productAdded)
})


export default pRouter;
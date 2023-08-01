import { Router } from "express";
import CartManager from "../CartManager.js";
const cRouter = Router()

const cartGenerated = new CartManager('./src/carritos.json')


cRouter.post('/', (req, res) => {
    const cart = cartGenerated.generateCart();
    res.status(200).send(cart);
})

cRouter.get('/:cid', (req, res) => {
    const { cid } = req.params;

    const getCart = cartGenerated.getCartByID(cid)
    if(getCart.id){
        res.status(200).send(getCart)
    }else{
        res.status(400).send(getCart)
    }
})

cRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    
    const result = cartGenerated.addProductToCart(cid, pid)
    
    if(result.cart){
        res.status(200).send(result)
    }else{
        res.status(400).send(result)
    }
})

export default cRouter;
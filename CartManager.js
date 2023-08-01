import fs from 'fs';

class CartManager {
    constructor(filepath) {
        CartManager.id += 0
        this.filepath = filepath
    }

    generateCart(){
        const cartProducts = this.readCart()
        const cart = {productsInCart: []}
    }



    readCart(){
        let info = []
        try {
            const products = JSON.parse(fs.readFileSync(this.filepath, 'utf-8'))
            products.forEach(e => {info.push(e)
            })
        } catch {
            console.log("Cart is empty")
        }
        return info
    }
    
    addProductToCart(cid, pid) {
        const carProducts = this.readCart();

        let indCart = carProducts.findIndex(c => c.id == cid);
        if (indCart == -1) {
            return { err: 'Invalid id' };
        }

        let productInd = carProducts[indCart].products.findIndex(prod => prod.id == pid)
        if (productInd == -1) {
            const add = { id: pid, quantity: 1 }

            carProducts[indCart].products.push(add)
            fs.writeFileSync(this.filepath, JSON.stringify(carProducts, null, 2))

            return { message: 'Product added', cart: carProducts[indCart].products };

        } else {
            carProducts[indCart].products[productInd].quantity += 1;

            fs.writeFileSync(this.filepath, JSON.stringify(carProducts, null, 2))

            return { message: 'Product added', cart: carProducts[indCart].products }
        }
    }





    getCartByID(cid) {
        const cartProducts = this.readCart()
        let cartSearch = cartProducts.find(cart => cart.id == cid)
        if (cartSearch) {
            return cartSearch
        } else {
            return {error: "Invalid ID"}
        }
    }




}

export default CartManager
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { Injectable } from "@angular/core";

@Injectable()
export class CartService {

    constructor(public storage: StorageService){

    }

    createOrClearCart() : Cart {
        let cart : Cart = {
            items: []
        };
        this.storage.setCart(cart);

        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }

        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        //Caso não encontre o elemento na lista, a função retorna -1
        let position = cart.items.findIndex(item => item.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);

        return cart;
    }

}
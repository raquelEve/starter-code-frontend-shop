// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
    

    //buscamos el producto por la id => posicion 0 porque el filter devuelve un array
    const prodSelected=products.filter(products => products.id == id)[0];
    
    //comprobamos si está en el array card
    let encontrado = cart.find(element => element.id === prodSelected.id);
    
    if(encontrado != undefined){
        //producto está en card actualizamos quantity
       encontrado.quantity++;
    }else{
        //producto no está añadimos quantity =1 y hacemos push en cart
        let element = {...prodSelected};//copia sin referencia
        element["quantity"]=1;
        cart.push(element);
    }
}

// Exercise 2
function cleanCart() {
    cart = [];
    printCart();
}

// Exercise 3
//llama a los descuentos applyPromotionsCart();
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
   
    total = 0;
    applyPromotionsCart();
    cart.forEach(value => {
        
        let calculo = 0;
        //comprobamos si hay preciodescuento
        if (value.offer != undefined && value.offer.subtotalWithDiscount != undefined) {
                
            calculo = value.quantity * value.offer.subtotalWithDiscount;
            total += Number(calculo.toFixed(2));
        } else {
            calculo = value.quantity * value.price;
            total += Number(calculo.toFixed(2));
        }
    });
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    // descuentos en (3) cooking oil => id:1 (20%)
    // descuentos en (10) Instant cupcake mixture => id:3 (30%)
    // cupcake id: 1, name: 'cooking oil', price: 10.5, type: 'grocery',
    //         offer: { number: 3, percent: 20 }
    /*add: propiedad: subtotalWithDiscount en cas que s'apliqui la promoció*/

    cart.forEach((product) => {
        if (product.hasOwnProperty("offer")) {

            if (product.quantity >= product.offer.number) {
                product.offer.subtotalWithDiscount = product.price - (product.price * (product.offer.percent / 100));
                product.offer.subtotalWithDiscount = Number(product.offer.subtotalWithDiscount.toFixed(2));
            } else {
                //si existe y no es aplicable la oferta => 
                if (product.offer.subtotalWithDiscount != undefined) {
                    delete product.offer.subtotalWithDiscount;
                }
            }

        }
    });
}

// Exercise 5
function printCart() {

    // Fill the shopping cart modal manipulating the shopping cart dom
    //llamamos a calcular total
    calculateTotal();
    let tbody= document.getElementById("cart_list");
    let ttotal = document.getElementById("total_price");
    let acumulaTr="";
    
    for (let i =0; i< cart.length; i++){
            //comprobamos si tiene descuento y ponemos el precio que toque
        let calcPrice = 0;
        if (cart[i].hasOwnProperty("offer") && cart[i].offer.subtotalWithDiscount != undefined) {
            calcPrice = cart[i].offer.subtotalWithDiscount;
        } else {
            calcPrice = cart[i].price;
        }

            let tr= `<tr> 
                        <th scope="row">${cart[i].name}</th>
                        <td>${calcPrice}</td>
                        <td>
                        <button onClick="unoMenos(${cart[i].id})" class="quantityButton">-</button>
                        ${cart[i].quantity}
                        <button onClick="unoMas(${cart[i].id})" class="quantityButton" >+</button>
                        </td> 
                        <td>${(cart[i].quantity * calcPrice).toFixed(2)}</td>
                    </tr>`;           
            acumulaTr+= tr;
        }
        //metemos las tr en la tabla y el total en el span
        tbody.innerHTML= acumulaTr;
        ttotal.innerText = total;
}
  

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

}
function unoMenos(id){
    let producto = cart.find(element => element.id === id);
    if (producto.quantity > 1) {
        producto.quantity = --producto.quantity;
    } else {
        let productToDelete = cart.findIndex(obj => obj.id === id);
        cart.splice(productToDelete, 1);
    }
    calculateTotal();
    printCart();
}
function unoMas(id){
    let producto = cart.find(element => element.id === id);
    producto.quantity++;
    
    calculateTotal();
    printCart();
}

function open_modal() {
    calculateTotal();
    printCart();
}
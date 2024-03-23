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
    // console.log("carito en buy", cart);
}

// Exercise 2
function cleanCart() {
 console.log("borramos carrito");
    cart = [];
    printCart();
}

// Exercise 3
//llama a los descuentos applyPromotionsCart();
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    console.log("total------------------------------------");  
   
    applyPromotionsCart();
    console.log("carrito en total", cart);     
   
    cart.forEach ( value => { 

        let calculo=0;
            //comprobamos si hay preciodescuento
            if(value.offer.subtotalWithDiscount!= undefined ){ 
                calculo = value.quantity * value.offer.subtotalWithDiscount;            
                total+= Number(calculo.toFixed(2));
                console.log("calculo", calculo);
            }else{
                calculo = value.quantity * value.price;            
                console.log("calculo", calculo);
                total+= Number(calculo.toFixed(2));
            }
            console.log("value",value);
        }
        )
        console.log("total",total);
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    // descuentos en (3) cooking oil => id:1 (20%)
    // descuentos en (10) Instant cupcake mixture => id:3 (30%)
    // cupcake id: 1, name: 'cooking oil', price: 10.5, type: 'grocery',
    //         offer: { number: 3, percent: 20 }
    /*add: propiedad: subtotalWithDiscount en cas que s'apliqui la promoció*/
    console.log("cart en dtos", cart);

    cart.forEach((product)=>{ 
        console.log(product);
        if(product.hasOwnProperty("offer") ){ 
            console.log("entro en ofertas", product);

            if(product.quantity >= product.offer.number){
                product.offer.subtotalWithDiscount =product.price-(product.price*(product.offer.percent/100));
                product.offer.subtotalWithDiscount = Number( product.offer.subtotalWithDiscount.toFixed(2)); 
            }
            console.log("original",products[product.id-1] );
            console.log("product", product);
        }
    })
    console.log("cart", cart);
}

// Exercise 5
function printCart() {

    // Fill the shopping cart modal manipulating the shopping cart dom
    //llamamos a calcular total
    calculateTotal();
    console.log("cart", cart);
    let tbody= document.getElementById("cart_list");
    let ttotal = document.getElementById("total_price");
    let acumulaTr="";
    
    for (let i =0; i< cart.length; i++){
            //comprobamos si tiene descuento y ponemos el precio que toque
            let calcPrice =(!cart[i].hasOwnProperty("offer")) ? cart[i].price : cart[i].offer.subtotalWithDiscount;
            console.log("price", calcPrice);
            console.log("tipe proce", typeof(calcPrice));
            let tr= `<tr> 
                        <th scope="row">${cart[i].name}</th>
                        <td>${calcPrice}</td>
                        <td>${cart[i].quantity}</td> 
                        <td>${cart[i].quantity * calcPrice}</td>
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


function open_modal() {
    calculateTotal();
    printCart();
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:3000/").then((result) => {
        console.log(result);
        getCartItems()
        displayMusicProducts(result)
    }).catch((err) => {
        console.log(err);
    });
})


//show products

function displayMusicProducts(products){
let musicContent= document.getElementById("music-content")
products.forEach(element => {
    console.log(element);
    let mainDiv =document.createElement('div');
    mainDiv.id=element.id;
mainDiv.className="product";

//heading
let heading= document.createElement('h2');
heading.className="prod-heading";
heading.innerHTML=element.title;
mainDiv.appendChild(heading);

//image div
let imgDiiv = document.createElement('div');
imgDiiv.className="image-container";

//image
let img = document.createElement("img")
img.src=element.imageUrl;
img.className="prod-img"
imgDiiv.appendChild(img);
mainDiv.appendChild(imgDiiv);

//item details div
let detailDiv= document.createElement('div');
detailDiv.className="item-details";
let dollar= document.createElement('span');
dollar.innerHTML="$"
detailDiv.appendChild(dollar);
prodprice= document.createElement('span')
prodprice.appendChild(document.createTextNode(element.price))
detailDiv.appendChild(prodprice)
mainDiv.appendChild(detailDiv)

//add to cart biutton
let btn = document.createElement('button');
btn.className="add-button";
btn.innerHTML="add to cart"
detailDiv.appendChild(btn)

musicContent.appendChild(mainDiv)
});
}



let seecartbtn= document.getElementById('go-to-cart');
seecartbtn.addEventListener('click',opencart);
function opencart(){
    document.getElementById('cart').style="display:block;"
    
}
let closeCart=document.getElementById('closeCart')
closeCart.addEventListener('click',hideCart)
function hideCart(){
    document.getElementById('cart').style="display:none;"
}
let id =0

function addtocart(e){
if(e.target.className==='add-button');
console.log(e.target.parentNode.parentNode.id);
let key=e.target.parentNode.parentNode.id
axios.post("http://localhost:3000/cart/"+key).then(result=>{
    console.log(result);
    getCartItems()
})




}


//id title price
function getCartItems(){
axios.get("http://localhost:3000/cart").then(products=>{products.forEach(product=>{
console.log(":first cart product:");
console.log(product);
//Object { id: 3, quantity: 1, productId: 2 }
let maindiv= document.createElement('div');
maindiv.className="cart-items"
maindiv.id=product.id;

//image spamn
let imgspan= document.createElement('span');
let img = document.createElement('img')
img.className="cart-item-image"
img.src=product.imageUrl
imgspan.appendChild(img)
maindiv.appendChild(imgspan)


//input for  cartitem id
let cartidintput= document.createElement('input');
cartidintput.value=product.cartItem.id;
cartidintput.type="hidden"
maindiv.appendChild(cartidintput)

//
let namespan= document.createElement('span');
namespan.className="cart-item-name";
namespan.innerHTML=product.title;
maindiv.appendChild(namespan)

let pricespan = document.createElement('span');
pricespan.className="cart-item-price"
pricespan.innerHTML=product.price;
maindiv.appendChild(pricespan)

let qtyspan= document.createElement('span');
qtyspan.className="cart-item-qty"
qtyspan.innerHTML=product.cartItem.quantity;
maindiv.appendChild(qtyspan);

//remove button 
let btn= document.createElement('button');
btn.className="cart-remove-btn"
btn.innerText="REMOVE"
maindiv.appendChild(btn)

document.getElementById('cart-list').appendChild(maindiv)
})}).then(()=>{console.log("cart items loaded");}).catch(err=>{console.log(err);})

}





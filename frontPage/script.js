let cartlogo= document.getElementById('cartlogo')
let currentnumber= cartlogo.innerText-0;

window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:3000/?page=1").then((result) => {
        console.log(result);
        console.log(result.totalProducts);
        getCartItems()
        displayMusicProducts(result.totalProducts)
    }).catch((err) => {
        console.log(err);
    });
})


//show products

function displayMusicProducts(products){
let musicContent= document.getElementById("music-content")
console.log(products);
while(musicContent.firstChild){musicContent.removeChild(musicContent.lastChild)}

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
})}).then(()=>{ currentnumber=document.getElementById('cart-list').childNodes.length ;cartlogo.innerText=currentnumber; console.log("cart items loaded");}).catch(err=>{console.log(err);})

}

function pagination(e){
    if(e.target.parentNode.id=='pagination'){
        console.log("pagination");
        let page=e.target.innerText;
        page=page-0

let paginationsection = document.getElementById('pagination');
while(paginationsection.firstChild){
    paginationsection.removeChild(paginationsection.lastChild)
}
//currentPage: 1, prePage: 0, nextPage: 2 Count: 7
        axios.get(`http://localhost:3000/?page=${page}`).then((result) => {
            console.log(result);
if(result.prePage >=0){
let pre= document.createElement('button')
pre.innerText=result.prePage;
paginationsection.appendChild(pre)
}

let curr= document.createElement('button')
curr.innerText=result.currentPage;
paginationsection.appendChild(curr)


if(result.Count>result.currentPage*result.lim){
let after= document.createElement('button')
after.innerText=result.nextPage
paginationsection.appendChild(after)
}

        displayMusicProducts(result.totalProducts)
    }).catch((err) => {
        console.log(err);
    });
    }
}



// pagination allows us to distribute data into multiple pages
// we use it so that we have to interact with tons of data
// skip- it allows us to skip a certain amount of data values, providing an offset to the data we are fetching
// limit- it allows us to provide a limit on the data we want to fetch, instead of fetching all the data which is a cumbersome process
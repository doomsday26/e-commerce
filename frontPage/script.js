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

// console.log(e.target.parentNode.parentNode.id);
// console.log("object clivked");

if(e.target.className==='add-button'){
//cart logo update
let count= document.getElementById('cartitems').innerHTML -0;
count=count+1;
console.log(count);
document.getElementById('cartitems').innerHTML=count;

let element= e.target.parentNode.parentNode;
console.log(element);
console.log(element.childNodes);

let cartList = document.getElementById('cart-list')

let item = document.createElement('div');
item.className="cart-items"
//idspan
let idspan= document.createElement('span');
idspan.style.display='none'
idspan.innerText=id++;
item.appendChild(idspan)
//image span
let img= element.childNodes[3].childNodes[1].cloneNode(true);
img.classList.remove('prod-img')
 img.classList.add('cart-item-image')
let imgSpan= document.createElement('span')
imgSpan.appendChild(img);
item.appendChild(imgSpan)
console.log(id);

// name span
let nameSpan= document.createElement('span');
nameSpan.className='cart-item-name'
nameSpan.innerHTML=element.childNodes[1].innerHTML
item.appendChild(nameSpan)

//price span
let priceSpan = document.createElement('span');
priceSpan.className="cart-item-price";
let text=element.childNodes[5].childNodes[2].innerText
priceSpan.appendChild(document.createTextNode(text))
item.appendChild(priceSpan)


//qty
let qtyspan= document.createElement('span');
qtyspan.className='cart-item-qty';
qtyspan.appendChild(document.createTextNode('1'));
item.appendChild(qtyspan);

//remove btn
let btn=document.createElement('button');
btn.className='cart-remove-btn';
btn.innerText='REMOVE'
item.appendChild(btn)
cartList.appendChild(item)

}

//



//update in cart
// let cartList = document.getElementById('cart-list')
// let li= document.createElement('li')
// li.innerHTML=items
// cartList.appendChild(li)


}
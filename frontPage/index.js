window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/orders').then(orders=>{
orders.forEach(element => {
    console.log(element);
let main= document.getElementById('orders');
    let orderdiv= document.createElement('div')
    orderdiv.className="order";
    let header=document.createElement('header')
let orderNamespan= document.createElement('span');
orderNamespan.className="orderName"
orderNamespan.innerHTML=element.id
header.appendChild(orderNamespan);
    orderdiv.appendChild(header)
    
    let ul= document.createElement('ul')
    ul.className="order-Items"
element.products.forEach(product=>{
let li=document.createElement('li');
li.className="orderItem"
//image
let imgspan= document.createElement('img')
imgspan.src=product.imageUrl
li.appendChild(imgspan)
//name
let namespan=document.createElement('span')
namespan.className="itemName"
namespan.innerText=product.title
li.appendChild(namespan)
//quantity
let qtyspan = document.createElement('span')
qtyspan.innerText="QTY : "
li.appendChild(qtyspan)
// quantity
let Quantity= document.createElement('span')
Quantity.innerHTML= product.orderItem.quantity
Quantity.className="itemQty"
li.appendChild(Quantity)

//pric
let pricespan = document.createElement('span')
pricespan.innerText="PRICE :"
li.appendChild(pricespan)

//item price
let itmprice= document.createElement('span')
itmprice.innerText=product.price
li.appendChild(itmprice)
ul.appendChild(li)
})

    orderdiv.appendChild(ul)
    
main.appendChild(orderdiv)    
});
}
    ).catch(err=>{console.log(err);})
})
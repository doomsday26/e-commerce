const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>{console.log(err);})
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  console.log(req.query.page);
  let page= req.query.page
  let itemLimit=4
  let offsetprod= (page-1)*itemLimit
  let count;
 //Product.findAll({offset:offsetprod,limit:itemLimit})
// Product.findAll({offset:0,limit:itemLimit})
 Product.count().then(number=>
{count=number;
return Product.findAll({offset:offsetprod,limit:itemLimit})
})
.then(products=>{
    // res.render('shop/index', {
    //   prods: products,
    //   pageTitle: 'Shop',
    //   path: '/'
    // });
  res.json({totalProducts: products,Count:count,currentPage:page-0,prePage:page-1,nextPage:page-0+1,lim:itemLimit})
  })
  .catch(err=>{console.log(err);})
};

exports.getCart = (req, res, next) => {
req.user.getCart()
.then(cart=>{
return cart.getProducts()
.then(products=>{
  // res.render('shop/cart', {
  //   path: '/cart',
  //   pageTitle: 'Your Cart',
  //   products: products
  // });
 res.json(products)
})
.catch(err=>{console.log(err);})
})
.catch(err=>{console.log(err);})
};




exports.postCart = (req, res, next) => {
  //const prodId = req.body.productId;
  const prodId = req.params.productId
  let fetchedCart;
  let newQuantity=1
 req.user.getCart()
 .then(cart=>{
  fetchedCart=cart
  return cart.getProducts({where:{id:prodId}})
 })
 .then(products=>{
  let product;
  if(products.length>0){
    product=products[0]
  }

if(product){
const oldQuantity=product.cartItem.quantity;
console.log(oldQuantity);
newQuantity=oldQuantity+1;
return product;
}
return Product.findByPk(prodId)
 })
.then(product=>{
  return fetchedCart.addProduct(product,
    {through:{quantity:newQuantity}})

 }).then((result)=>{
  console.log(result);
  console.log("added to cart");

  res.json({data:"added cart successful"})
 })
 .catch(err=>{console.log(err);})
};


//return fetchedCart.addProduct(product,{through:{quantity:newquantity}})

exports.postCartDeleteProduct = (req, res, next) => {
  //const prodId = req.body.productId;
  const prodId = req.query.delId;
  console.log("product to be reomved has id of", prodId);
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:prodId}})
  }).then(products=>{
    const product=products[0]
    return product.cartItem.destroy()
  }).then(result=>{
    res.json({Result:result,info:"product deleted"});
  })
  .catch(err=>{console.log(err);})
  
};

exports.getOrders = (req, res, next) => {

req.user.getOrders({include:['products']}).then(orders=>{
  res.json(orders)
})
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.createOrder=(req,res,next)=>{

req.user.getCart().then(cart=> {return cart.getProducts() } )
.then(products=>{return req.user.createOrder()
  .then(order=>{ return order.addProducts(
products.map(product=>{
product.orderItem= {quantity:product.cartItem.quantity}
  return product
})


  ) }).then(result=>{res.json({
    Result:result
  })})
  .catch(err=>{console.log(err);})})

.catch(err=>{console.log(err);})
}
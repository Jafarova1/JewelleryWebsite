// // open cart modal
// const cart = document.querySelector('#cart');
// const cartModalOverlay = document.querySelector('.cart-modal-overlay');

// cart.addEventListener('click', () => {
//   if (cartModalOverlay.style.transform === 'translateX(-200%)'){
//     cartModalOverlay.style.transform = 'translateX(0)';
//   } else {
//     cartModalOverlay.style.transform = 'translateX(-200%)';
//   }
// })
// // end of open cart modal

// // close cart modal
// const closeBtn = document.querySelector ('#close-btn');

// closeBtn.addEventListener('click', () => {
//   cartModalOverlay.style.transform = 'translateX(-200%)';
// });

// cartModalOverlay.addEventListener('click', (e) => {
//   if (e.target.classList.contains('cart-modal-overlay')){
//     cartModalOverlay.style.transform = 'translateX(-200%)'
//   }
// })
// // end of close cart modal

// // add products to cart
// const addToCart = document.getElementsByClassName('add-to-cart');
// const productRow = document.getElementsByClassName('product-row');

// for (var i = 0; i < addToCart.length; i++) {
//   button = addToCart[i];
//   button.addEventListener('click', addToCartClicked)
// }

// function addToCartClicked (event) {
//   button = event.target;
//   var cartItem = button.parentElement;
//   var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  
//   var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
//   addItemToCart (price, imageSrc);
//   updateCartPrice()
// }

// function addItemToCart (price, imageSrc) {
//   var productRow = document.createElement('div');
//   productRow.classList.add('product-row');
//   var productRows = document.getElementsByClassName('product-rows')[0];
//   var cartImage = document.getElementsByClassName('cart-image');
  
//   for (var i = 0; i < cartImage.length; i++){
//     if (cartImage[i].src == imageSrc){
//       alert ('This item has already been added to the cart')
//       return;
//     }
//   }
  
//   var cartRowItems = `
//   <div class="product-row">
//         <img class="cart-image" src="${imageSrc}" alt="">
//         <span class ="cart-price">${price}</span>
//         <input class="product-quantity" type="number" value="1">
//         <button class="remove-btn">Remove</button>
//         </div>
        
//       `
//   productRow.innerHTML = cartRowItems;
//   productRows.append(productRow);
//   productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
//   productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
//   updateCartPrice()
// }
// // end of add products to cart

// // Remove products from cart
// const removeBtn = document.getElementsByClassName('remove-btn');
// for (var i = 0; i < removeBtn.length; i++) {
//   button = removeBtn[i]
//   button.addEventListener('click', removeItem)
// }

// function removeItem (event) {
//   btnClicked = event.target
//   btnClicked.parentElement.parentElement.remove()
//   updateCartPrice()
// }

// // update quantity input
// var quantityInput = document.getElementsByClassName('product-quantity')[0];

// for (var i = 0; i < quantityInput; i++){
//   input = quantityInput[i]
//   input.addEventListener('change', changeQuantity)
// }

// function changeQuantity(event) {
//   var input = event.target
//   if (isNaN(input.value) || input.value <= 0){
//     input.value = 1
//   }
//   updateCartPrice()
// }
// // end of update quantity input

// // update total price
// function updateCartPrice() {
//   var total = 0
//   for (var i = 0; i < productRow.length; i += 2) {
//     cartRow = productRow[i]
//   var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//   var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
//   var price = parseFloat(priceElement.innerText.replace('$', ''))
//   var quantity = quantityElement.value
//   total = total + (price * quantity )
    
//   }
//   document.getElementsByClassName('total-price')[0].innerText =  '$' + total

// document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
// }
// // end of update total price

// // purchase items
// const purchaseBtn = document.querySelector('.purchase-btn');

// const closeCartModal = document.querySelector('.cart-modal');

// purchaseBtn.addEventListener('click', purchaseBtnClicked)

// function purchaseBtnClicked () {
//   alert ('Thank you for your purchase');
//   cartModalOverlay.style.transform= 'translateX(-100%)'
//  var cartItems = document.getElementsByClassName('product-rows')[0]
//  while (cartItems.hasChildNodes()) {
//    cartItems.removeChild(cartItems.firstChild)
   
//  }
//   updateCartPrice()
// }
// // end of purchase items

// //alert user if cart is empty


let tableBody = document.querySelector("tbody");
let productAlert = document.querySelector(".alert-primary");
let total = document.querySelector(".total-price");
let products = JSON.parse(localStorage.getItem("basket"));


if(total.innerText==""){
    total.innerText="0 $"
}

total.innerText=`${price(products)} $`



if (products != null) {
    products.forEach(product => {
        tableBody.innerHTML += `<tr>
        <td><img src="${product.image}" alt=""></td>
        <td>${product.name}</td>
        <td class="price">${parseInt(product.price.replace("$",""))*product.count} $</td>
        <td class="product-count" data-id = ${product.id}>
        <span class="minus" data-id="${product.id}">-</span>
        <span class="count" data-id=${product.id}>${product.count}</span>
        <span class="plus" data-id="${product.id}">+</span>
        </td>
        <td><i data-id="${product.id}" class="remove fa-solid fa-trash-can"></i></td> 
        </tr>`
    });

}
else {
    tableBody.parentNode.classList.add("d-none");
    productAlert.classList.remove("d-none");
}


if (products != null) {
    getBasketCount(products);
}


let deleteButtons = document.querySelectorAll(".fa-trash-can");
for (const btn of deleteButtons) {
    btn.addEventListener("click", function () {
        this.parentNode.parentNode.remove()

        let deleteProduct = products.find(m => m.id == btn.getAttribute("data-id"))

        let deleteIndex = products.indexOf(deleteProduct)

        if (deleteIndex > -1) {
            products.splice(deleteIndex, 1)
        }

        localStorage.setItem("basket", JSON.stringify(products))

        

        
    })
}


let decreaseButtons = document.querySelectorAll(".minus")
let increaseButtons = document.querySelectorAll(".plus")
let count = document.querySelectorAll(".count");



decreaseButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        let product = products.find(m => m.id == btn.getAttribute("data-id"))
        if (product.count > 1) {
            product.count--;
            localStorage.setItem("basket", JSON.stringify(products))

            for (const count of countProduct) {
                if (count.getAttribute("data-id") == btn.getAttribute("data-id")) {
                    count.innerText = count.innerText - 1
                }
            }           
        }        

        count.innerText = getBasketCount(JSON.parse(localStorage.getItem("basket")))
    })
});


increaseButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        let product = products.find(m => m.id == btn.getAttribute("data-id"))
        product.count++;
        localStorage.setItem("basket", JSON.stringify(products))

        for (const count of countProduct) {
            if (count.getAttribute("data-id") == btn.getAttribute("data-id")) {
                count.innerText = parseInt(count.innerText) + 1
            }
        }      
      
        count.innerText = getBasketCount(JSON.parse(localStorage.getItem("basket")))
    })
});


function price(products) {
    let sum = 0;
    for (const product of products) {
        sum += parseInt(product.price.replace("$",""))*product.count;
    }
    return sum;
}


function getBasketCount(arr) {
    let count = 0;
    for (const item of arr) {
        count += item.count
    }

    document.querySelector("sup").innerText = count;
}

count.innerText=getBasketCount(JSON.parse(localStorage.getItem("basket")))



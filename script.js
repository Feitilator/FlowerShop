const cartBtn = document.getElementById('cart-btn')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close_cart')
const cartList = document.getElementById('cart')
const productList = document.getElementById('product-list')
const buyProductBtn = document.querySelector('.modal__button__buy')

const productInfo = {}

cartBtn.addEventListener('click',() => {
    modal.classList.add("open")
    
})

closeBtn.addEventListener('click', () =>{
    modal.classList.remove("open")
})

calculateTotalCartValue()

productList.addEventListener('click',(event) => {
    if(event.target.classList.contains('card__btn')){
        const product = event.target.closest('.card')

        const imageCard = product.querySelector('img')
        const titleCard = product.querySelector('.card__title')
        const priceCard = product.querySelector('.card__caprice')
        const idCard = product.querySelector('.card__title')

        productInfo.model = titleCard.textContent
        productInfo.price = priceCard.textContent
        productInfo.photo = imageCard.src
        productInfo.id = idCard.getAttribute('id');

        const productInCart = cartList.querySelector(`#${productInfo.id}`)

        if(productInCart){
            const currentItemsProduct = productInCart.querySelector('.modal__item-value')
            const minusBtn = productInCart.querySelector('.modal__button-minus')
            const priceProduct = productInCart.querySelector('.modal__item-price')
            currentItemsProduct.textContent = Number(currentItemsProduct.textContent) + 1
            minusBtn.disabled = false
            let totalPrice = Number(currentItemsProduct.textContent) * Number(priceProduct.dataset.price.slice(0,-1))
            priceProduct.textContent = `${totalPrice} ₸`
            calculateTotalCartValue()
        }else{
            renderProductInCart()
        }      
    }
})


function renderProductInCart(){
    const li = document.createElement('li')
    li.classList.add('modal__list-item')
    li.id = productInfo.id

    li.innerHTML=`
    <img src="${productInfo.photo}" class="modal__item-image">
        <div>
            <p class="modal__item-name">${productInfo.model}</p>
            <div class="modal__value">
                <button class="modal__button-minus" disabled>-</button>
                <p class="modal__item-value">1</p>
                <button class="modal__button-plus">+</button>  
            </div>
            <p class="modal__item-price" data-price="${productInfo.price}">${productInfo.price}</p>
        </div>
        <button class="modal__item-button">X</button> 
    `

    cartList.append(li)
    calculateTotalCartValue()
}

cartList.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal__item-button')){
        const cartItem = event.target.closest('.modal__list-item')
        cartItem.remove()
        calculateTotalCartValue()
    }
})

function calculateTotalCartValue(){
    const totalPrice = document.getElementById('total-price')
    const cartItems = document.querySelectorAll('.modal__list-item')

    let totalCartValue = 0
    cartItems.forEach((item) => {
        const itemCount = item.querySelector('.modal__item-price').textContent.slice(0,-1)
        totalCartValue += Number(itemCount) 
    })

    if (cartItems.length > 0 ){  
        totalPrice.innerHTML = `${totalCartValue} ₸`
            
    }else{
        totalPrice.innerHTML = `0 ₸`
        
    }

}


buyProductBtn.addEventListener('click', () =>{
    cartList.innerHTML = ''
    calculateTotalCartValue()
})

cartList.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal__button-plus')){
        const cartItem = event.target.closest('.modal__list-item')
        const valueProduct = cartItem.querySelector('.modal__item-value')
        const priceProduct = cartItem.querySelector('.modal__item-price')
        const minusBtn = cartItem.querySelector('.modal__button-minus')
        let value = Number(valueProduct.textContent)
        let price = Number(priceProduct.dataset.price.slice(0,-1))
        value += 1
        let totalprice = value * price
        if(value <= 1){
            minusBtn.disabled = true
        }else{
            minusBtn.disabled = false
        } 
        valueProduct.innerHTML = `${value}`
        priceProduct.innerHTML = `${totalprice} ₸`
        calculateTotalCartValue()
    }else if(event.target.classList.contains('modal__button-minus')){
        const cartItem = event.target.closest('.modal__list-item')
        const valueProduct = cartItem.querySelector('.modal__item-value')
        const priceProduct = cartItem.querySelector('.modal__item-price')
        const minusBtn = cartItem.querySelector('.modal__button-minus')
        let value = Number(valueProduct.textContent)
        let price = Number(priceProduct.dataset.price.slice(0,-1))
        value -= 1
        let totalprice = value * price
        if(value <= 1){
            minusBtn.disabled = true
        }else{
            minusBtn.disabled = false
        }
        valueProduct.innerHTML = `${value}`
        priceProduct.innerHTML = `${totalprice} ₸`
        calculateTotalCartValue()
    }
})
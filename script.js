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

        renderProductInCart()
    }
})


function renderProductInCart(){
    const li = document.createElement('li')
    li.classList.add('modal__list-item')

    li.innerHTML=`
    <img src="${productInfo.photo}" class="modal__item-image">
        <div>
            <p class="modal__item-name" id="${productInfo.id}">${productInfo.model}</p>
            <div class="modal__value">
                <button class="modal__button-minus">-</button>
                <p class="modal__item-value">0</p>
                <button class="modal__button-minus">+</button>  
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
        // cartList.innerHTML = `<h2>Корзина Пуста</h2>`
    }
}

buyProductBtn.addEventListener('click', () =>{
    cartList.innerHTML = ''
    calculateTotalCartValue()
})
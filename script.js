const cartBtn = document.getElementById('cart')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close_cart')

cartBtn.addEventListener('click',() => {
    modal.classList.add("open")
    
})

closeBtn.addEventListener('click', () =>{
    modal.classList.remove("open")
})


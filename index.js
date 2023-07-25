import { menuArray } from './data.js'

const modal = document.getElementById("modal")
const confirmationMsg = document.getElementById("confirmation-msg")
const modalForm = document.getElementById("modal-form")
const buyerName = document.getElementById("buyer-name")

let cart = []

document.addEventListener("click", function(event){
    if(event.target.dataset.item){
       handleAddToCart(event.target.dataset.item)
       togleCart()
       document.getElementById("order-details").innerHTML = getCart()
       document.getElementById("total").innerHTML = `$${getCartTotal()}`
    }
    else if (event.target.dataset.remove){
        removeItem(event.target.dataset.remove)
        document.getElementById("total").innerHTML = `$${getCartTotal()}`
    }
    else if (event.target.id == "order-btn"){
        modal.style.display = "inline-block"
    }
})

modalForm.addEventListener("submit", function(event){
    event.preventDefault()
    const consentFormData = new FormData(modalForm)
    const cardName = consentFormData.get("card-name")
    buyerName.innerHTML = cardName
    
    cart = []
    togleCart()
    modal.style.display = "none"
    confirmationMsg.style.display = "flex"
})

function getCartTotal(){
    let total = 0
    cart.forEach(function(item){
        total += item.price
    })
    return total
}

function removeItem(itemId){
    const targetIndex = cart.findIndex(function(item){
        return item.id == itemId
    })
    cart.splice(targetIndex, 1)
    togleCart()
    document.getElementById("order-details").innerHTML = getCart()
}

function togleCart(){
    let summary = document.getElementById("summary")
    if(cart.length > 0){
        summary.classList.remove("hidden")
    }else{
        summary.classList.add("hidden")
    }
}

function handleAddToCart(itemId){
    const targetObject = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    cart.push(targetObject)
    
}

function getFeed(){
    let feedHtml = ""
    menuArray.forEach(function(item){
        feedHtml += `
<div class="main">
    <p class="item-emoji">${item.emoji}</p>
    <div class="item-details">
        <h2 class="item-title">${item.name}</h2>
        <p class="extras">${item.ingredients}</p>
        <h2 class="price">$${item.price}</h2>
    </div>
    <button class="add-to-cart" data-item=${item.id}>+</button>
</div>
<div class="items-divider"></div>
        `
    })
    return feedHtml
}

function getCart(){
    let cartHtml = ""
    cart.forEach(function(item){
        cartHtml +=`
            <div class="item-list">                    
                <h2>${item.name}</h2>
                <button class="remove-btn" data-remove=${item.id}>remove</button>
                <h2 class="price price-pos">$${item.price}</h2>
            </div>
        `
})
        return cartHtml
    }

function render(){
    document.getElementById("feed").innerHTML = getFeed()
    }

render()


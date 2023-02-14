/*************************************************************/
/*************************************************************/
/***********           CART.JS                   *************/
/*************************************************************/
/*************************************************************/

// le code ci-dessous permet d'afficher le panier avec les produits sélectionnés,
// de rentrer ses informations personnelles dans le formulaire 
// et de passer sa commande

// le code est divisé en plusieurs parties :

// 1 ==> Création des éléments
// On crée l'article du produit grace à la fonction addArticle
// addArticle comprend les fonctions addImage et addContent
// addContent comprend les fonctions addDescription et addSettings
// addDescription : addName addColor addPrice
// addSettings : addQuantity addDelete 

// 2 ==> Affichage des éléments 
// On affiche tout avec la fonction addAllArticles
// on veut que les memes modeles de canapé et de différentes couleurs
// s'affichent ensemble
// la creation de l'array sortlocalkeys permet cet affichage

// 3 ==> Mettre à jour la quantité  
// on listen les changements de quantité dans l'input
// avec la fonction changeQuantity dans une loop

// 4 ==> Pouvoir supprimer un produit du panier 
// on listen le clic "supprimmer"
// avec la fonction removeInstance dans une loop

// 5 ==> Vérifier les informations rentrées dans le formulaire
// on verifie les input avec les fonctions :
// checkFirstName checkLastName checkAddress checkCity checkEmail
// execution avec la fonction checkForm

// 6 ==> Envoi des données de la commande
// l'api attend les informations personnelles dans contact :
// et l'array des id 
// on réalise l'array "ids" 
// on POST la commande avec la fonction sendForm



/*** Adding DOM elements ***/

let addArticle = (instance, id) => {

    let article = document.createElement("article")
    cart__items.appendChild(article)
    article.classList.add("cart__item")
    article.dataset.id = id
    article.dataset.color = instance.color
    addImage(article, instance)
    addContent(article, instance, id)
}

let addImage = (article, instance) => {

    let cart__item__img = document.createElement("div")
    article.appendChild(cart__item__img)
    cart__item__img.classList.add("cart__item__img")
    let image = document.createElement("img")
    cart__item__img.appendChild(image)
    image.src = instance.imageUrl
    image.alt = instance.altTxt
}

let addContent = (article, instance, id) => {
    let cart__item__content = document.createElement("div")
    article.appendChild(cart__item__content)
    cart__item__content.classList.add("cart__item__content")
    addDescription(cart__item__content, instance, id)
    addSettings(cart__item__content, instance)
}

let addDescription = (cart__item__content, instance, id) => {

    let cart__item__content__description = document.createElement("div")
    cart__item__content.appendChild(cart__item__content__description)
    cart__item__content__description.classList.add("cart__item__content__description")
    addName(cart__item__content__description, instance)
    addColor(cart__item__content__description, instance)
    addPrice(cart__item__content__description, id, instance)

}

let addSettings = (cart__item__content, instance) => {

    let cart__item__content__settings = document.createElement("div")
    cart__item__content.appendChild(cart__item__content__settings)
    cart__item__content__settings.classList.add("cart__item__content__settings")
    addQuantity(cart__item__content__settings, instance)
    addDelete(cart__item__content__settings)
}

let addName = (cart__item__content__description, instance) => {

    let h2 = document.createElement("h2")
    cart__item__content__description.appendChild(h2)
    h2.textContent = instance.name
}

let addColor = (cart__item__content__description, instance) => {

    let p = document.createElement("p")
    cart__item__content__description.appendChild(p)
    p.textContent = instance.color
}

let addPrice = async function (cart__item__content__description, id, instance) {
    let p2 = document.createElement("p")
    cart__item__content__description.appendChild(p2)
    let quantity = instance.quantity

    let response = await fetch(`https://kanapapi-production.up.railway.app/api/products/${id} `, { method: "GET" })
    let data = await response.json()
    let price = data.price
    let price2 = price * quantity
    p2.textContent = price2 + "€"
    totalPrice += price2
    const tPrice = document.querySelector('#totalPrice')
    tPrice.textContent = totalPrice
}

let addQuantity = (cart__item__content__settings, instance) => {
    let cart__item__content__settings__quantity = document.createElement("div")
    cart__item__content__settings.appendChild(cart__item__content__settings__quantity)
    cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity")
    let pQuantity = document.createElement("p")
    cart__item__content__settings__quantity.appendChild(pQuantity)
    pQuantity.textContent = "Qté :"
    let input = document.createElement("input")
    cart__item__content__settings__quantity.appendChild(input)
    input.classList.add("itemQuantity")
    input.type = "number"
    input.name = "itemQuantity"
    input.min = 1
    input.max = 100
    input.value = instance.quantity
    totalQuantity += instance.quantity
}

let addDelete = (cart__item__content__settings) => {
    let cart__item__content__settings__delete = document.createElement("div")
    cart__item__content__settings.appendChild(cart__item__content__settings__delete)
    cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete")
    let p3 = document.createElement("p")
    cart__item__content__settings__delete.appendChild(p3)
    p3.textContent = "Supprimer"
}

/************************************************************** */
/************************************************************** */
const cart__items = document.querySelector('#cart__items')

/* display the same models together*/
let localkeys = []
for (let i = 0; i < localStorage.length; i++) {
    let ikey = localStorage.key(i)
    localkeys.push(ikey)
}

let sortlocalkeys = localkeys.sort()
console.log(sortlocalkeys)
/******************* */
let totalQuantity = 0
let totalPrice = 0

/******************************************* */
/******************************************* */

let addAllArticles = () => {

    for (let i = 0; i < localStorage.length; i++) {

        let instance = JSON.parse(localStorage.getItem(sortlocalkeys[i]))

        let id = instance.id

        addArticle(instance, id)
    }
}

addAllArticles()

/* *************                        *********************/
/* *************   update input change  *********************/

let input = document.querySelectorAll(".itemQuantity")
/**** */
for (let i = 0; i < localStorage.length; i++) {

    let changeQuantity = () => {

        for (let i = 0; i < localStorage.length; i++) {

            let instance = JSON.parse(localStorage.getItem(sortlocalkeys[i]))
            let id = instance.id
            let color = instance.color

            if ((document.querySelectorAll('.cart__item')[i].getAttribute('data-id') == id)
                && (document.querySelectorAll('.cart__item')[i].getAttribute('data-color') == color)) {

                let itemQuantity = document.querySelectorAll('.itemQuantity')[i]
                let newQuantity = itemQuantity.value

                if (newQuantity==0) {
                    instance.quantity = 1
                } else if (newQuantity>100 || newQuantity<-99) {
                    instance.quantity = 100
                } else {
                    instance.quantity = Math.abs(Number(newQuantity))
                }

                localStorage.setItem(sortlocalkeys[i], JSON.stringify(instance))
            }
        }
        location.reload()
    }
    input[i].addEventListener("change", () => changeQuantity())
}


/* *************           *********************/
/* *************   delete  *********************/

let btnDelete = document.querySelectorAll(".cart__item__content__settings__delete")

for (let i = 0; i < localStorage.length; i++) {

    let removeInstance = (i) => {
        let instance = JSON.parse(localStorage.getItem(sortlocalkeys[i]))
        let id = instance.id
        let color = instance.color
        let key = id + color
        const selectArticle =
            document.querySelector(
                `article[data-id="${instance.id}"][data-color="${instance.color}"]`)

        selectArticle.remove()
        localStorage.removeItem(key)
        location.reload()
    }
    btnDelete[i].addEventListener("click", () => removeInstance(i))
}

/*************   total quantity *********** */
const tQuantity = document.querySelector('#totalQuantity')
tQuantity.textContent = totalQuantity

/********************************************/
/**************    FORM          ************/
/********************************************/

/* check first name */
const inputFirstName = document.getElementById('firstName')

let checkFirstName = () => {
    const firstName = document.getElementById('firstName').value
    const regexName = /^[^ ][a-zA-Z\-çñàéèêëïîôüù ']+$/
    const errMsg = document.querySelector('#firstNameErrorMsg')

    if (regexName.test(firstName)) {
        errMsg.textContent = ""
        return true
    } else {
        errMsg.textContent = "Veuillez entrer un prénom valide"
        return false
    }
}

inputFirstName.addEventListener("change", () => checkFirstName())

/* check last name */
const inputLastName = document.getElementById('lastName')

let checkLastName = () => {
    const lastName = document.getElementById('lastName').value
    const regexName = /^[^ ][a-zA-Z\-çñàéèêëïîôüù ']+$/
    const errMsg = document.querySelector('#lastNameErrorMsg')
    if (regexName.test(lastName)) {
        errMsg.textContent = ""
        return true
    } else {
        errMsg.textContent = "Veuillez entrer un nom valide"
        return false
    }
}

inputLastName.addEventListener("change", () => checkLastName())

/* check address */

const inputAddress = document.getElementById('address')

let checkAddress = () => {
    const address = document.getElementById('address').value
    const regexAddress = /^[^ ][\da-zA-Z\-çñàéèêëïîôüù ,']+$/
    const errMsg = document.querySelector('#addressErrorMsg')
    if (regexAddress.test(address)) {
        errMsg.textContent = ""
        return true
    } else {
        errMsg.textContent = "Veuillez entrer une adresse valide"
        return false
    }
}

inputAddress.addEventListener("change", () => checkAddress())

/*check city */
const inputCity = document.getElementById('city')
let checkCity = () => {
    const city = document.getElementById('city').value
    const regexCity = /^[^ ][a-zA-Z\-çñàéèêëïîôüù ']+$/
    const errMsg = document.querySelector('#cityErrorMsg')
    if (regexCity.test(city)) {
        errMsg.textContent = ""
        return true
    } else {
        errMsg.textContent = "Veuillez entrer un nom de ville valide"
        return false
    }
}

inputCity.addEventListener("change", () => checkCity())

/* check email */
const inputEmail = document.getElementById('email')
let checkEmail = () => {
    const email = document.getElementById('email').value
    const regexEmail = /^[^ ][a-zA-Z0-9\._\-]+@[a-z-]+\.[a-z]{2,3}$/
    const errMsg = document.querySelector('#emailErrorMsg')
    if (regexEmail.test(email)) {
        errMsg.textContent = ""
        return true
    } else {
        errMsg.textContent = "Veuillez entrer un email valide"
        return false
    }
}

inputEmail.addEventListener("change", () => checkEmail())

/********************************/
/********************************/
let checkForm = () => {
    if ((checkFirstName() === true)
        && (checkLastName() === true)
        && (checkAddress() === true)
        && (checkCity() === true)
        && (checkEmail() === true)
    ) {
        return true
    } else {
        return false
    }
}
/**** */
let ids = []
for (let i = 0; i < localStorage.length; i++) {
    let instance = JSON.parse(localStorage.getItem(sortlocalkeys[i]))
    let id = instance.id
    ids.push(id)
}
/** */
let sendForm = () => {
    if (checkForm() === true && localStorage.length > 0) {
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        const address = document.getElementById('address').value
        const city = document.getElementById('city').value
        const email = document.getElementById('email').value
        const body = {
            contact: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email,
            },
            products: ids,
        }
        fetch("https://kanapapi-production.up.railway.app/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((res => res.json()))
            .then((data) => {
                console.log(data)
                const orderId = data.orderId
                window.location.href = "confirmation.html" + "?orderId=" + orderId
            })
            .catch((error) => console.error(error))
    } else {
        alert('invalid form')
    }
}

/* */
const orderButton = document.querySelector('#order')
/* prevent click default*/
document.querySelector("#order").addEventListener("click", function (event) {
    event.preventDefault();
})
/* send order and form */
orderButton.addEventListener('click', () => sendForm())


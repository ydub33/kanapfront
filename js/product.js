/*************************************************************/
/*************************************************************/
/***********           PRODUCT.JS                *************/
/*************************************************************/
/*************************************************************/

// le code ci-dessous permet de recuperer les donnees de l'api
// pour afficher les détails du produit sélectionné.
// Il permet au client de sélectionner une couleur et une quantité
// du canapé choisi et de le commander (envoi vers le panier)


/* on recupere l'id de l'url de la page du produit selectionné */

const params = new URLSearchParams(window.location.search)

const id = params.get("id")



fetch(`https://kanapapi-production.up.railway.app/api/products/${id} `, { method: "GET" })
    .then(res => res.json())
    .then(data => addOrder(data))
    .catch(err => console.error(err))

/** */

/* create image */
const item__img = document.querySelector('.item__img')
let image = document.createElement("img")
item__img.appendChild(image)

/* selectors */
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const description = document.querySelector('#description')
const colors = document.querySelector('#colors')
const button = document.querySelector('#addToCart')

/************************* ****/
/*     function addOrder      */
/************************* ****/
// fonction principale 
// ==> affiche les détails du produit avec la fonction addProductDetails
// ==> envoi les données du choix avec la fonction sendData
// envoi vers le panier au clic "Ajouter au panier"


let addOrder = (data) => {

    addProductDetails(data)

    let orderClick = () => {
        sendData(data)
    }
    button.addEventListener("click", orderClick)
}

/*********************************************** */

/************************* ****/
/* function addProductDetails */
/************************* ****/

let addProductDetails = (data) => {

    addData(data)
    colorOptions(data)
}

/************************* ****/
/*     function sendData      */
/************************* ****/

// Cette fonction recupere les données de l'api et du DOM(couleur et quantité)
// et ensuite traite les 3 scenarios possibles lors du choix :

// ==> le client commande un modele canape/couleur déja commandé
// On met à jour la quantité grace à la fonction updateQuantity

// ==> le client commande un modele canape/couleur non present dans le panier
// On envoie les données (variable orderData) vers le localStorage pour 
// ajouter le choix au panier

// ==> le client oublie de specifier une quantité et/ou une couleur
// un message d'alerte s'affiche

let sendData = (data) => {

    const orderImg = data.imageUrl
    const orderAlt = data.altTxt
    const orderName = data.name
    let orderColor = document.querySelector('#colors').value
    let orderQuantity = Number(document.querySelector('#quantity').value)
    let id2 = id + orderColor
    let key = id2

    if (((orderColor != "") && (orderQuantity > 0) && (orderQuantity < 101)) &&
        (localStorage.getItem(key))) {

        updateQuantity(key, orderQuantity)

    } else if ((orderColor != "") && (orderQuantity > 0) && (orderQuantity < 101)) {

        const orderData = {
            id2: id2,
            id: id,
            color: orderColor,
            quantity: orderQuantity,
            imageUrl: orderImg,
            altTxt: orderAlt,
            name: orderName
        }
        localStorage.setItem(key, JSON.stringify(orderData))
        window.location.href = 'cart.html'

    } else {
        alert('Veuillez sélectionner une couleur et une quantité valide (1-100)')
    }
}

/************************* ****/
/* function addData           */
/************************* ****/

let addData = (data) => {
    image.src = data.imageUrl
    image.alt = data.altTxt
    title.textContent = data.name
    price.textContent = data.price
    description.textContent = data.description
}
/************************* ****/
/* function colorOptions      */
/************************* ****/
let colorOptions = (data) => {
    for (let i = 0; i < data.colors.length; i++) {
        let option = document.createElement("option")
        colors.appendChild(option)
        option.value = data.colors[i]
        option.textContent = data.colors[i]
    }
}
/************************* ****/
/* function updateQuantity   */
/************************* ****/
let updateQuantity = (key, orderQuantity) => {
    let local = {}
    local = JSON.parse(localStorage.getItem(key))
    if ((local.quantity + orderQuantity)<101 ){
        local.quantity += orderQuantity
    } else local.quantity =100
    
    localStorage.setItem(key, JSON.stringify(local))
    window.location.href = 'cart.html'
}









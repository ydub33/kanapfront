/*************************************************************/
/*************************************************************/
/***********           SCRIPT.JS                 *************/
/*************************************************************/
/*************************************************************/

// le code ci-dessous permet de recuperer les donnees de l'api
// pour afficher tous nos produits (image,nom,description) sur 
// la page d'acceuil de notre site web


fetch('https://kanapapi-production.up.railway.app/api/products',{method: "GET" })
    .then(res => res.json())
    .then(data => addProductCard(data))
    .catch(err => console.error(err))


/******* */

/* pointer sur la section items avec l'id*/
const items = document.querySelector("#items")


/************************* */
/* fonction addProductCard */
/************************* */

let addProductCard = (data) => {


    for (let i = 0; i < data.length; i++) {

        /*création anchor*/
        let anchor = document.createElement("a")
        items.appendChild(anchor)
        /*création article*/
        let article = document.createElement("article")
        anchor.appendChild(article)

        /*création image*/
        let image = document.createElement("img")
        article.appendChild(image)

        /*création productName*/
        let productName = document.createElement("h3")
        article.appendChild(productName)
        productName.classList.add("productName")

        /*création productDescription*/
        let productDescription = document.createElement("p")
        article.appendChild(productDescription)
        productDescription.classList.add("productDescription")

        /* fetch data */

        anchor.href = `html/product.html?id=${data[i]._id}`

        image.src = data[i].imageUrl
        image.alt = data[i].altTxt
        productName.textContent = data[i].name
        productDescription.textContent = data[i].description

    }

}




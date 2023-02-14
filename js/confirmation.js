/*************************************************************/
/*************************************************************/
/***********           CONFIRMATION.JS           *************/
/*************************************************************/

// on recupere orderId pour l'afficher
// on clear localStorage

const query = window.location.search
const urlParams = new URLSearchParams(query)
orderId=urlParams.get("orderId")

const orderIdItem=document.getElementById("orderId")
orderIdItem.textContent=orderId

localStorage.clear()


const cartOrderProduct = []

cartRecoverItemsFromCache()
cartOrderProduct.forEach((item) => displayCartProductItem(item))
const cartButtonPlaceOrder = document.querySelector("#order")
cartButtonPlaceOrder.addEventListener("click", (e) => cartSumbitShoppingCart(e))

cartRecoverItemsFromCache = () => {
  const cartNumberProducts = localStorage.length
  for (let i = 0; i < cartNumberProducts; i++){
    const itemProduct = localStorage.getItem(localStorage.key(i))
    const cartobjectProduct = jSON.parse(itemProduct)
    cartOrderProduct.push(cartobjectProduct)
  }
}

cartSumbitShoppingCart = (okay) => {
  okay.preventDefault()
  if(cartOrderProduct.length === 0){
    alert("Vous devez sélectionner un canapé pour pouvoir acheter")
    return
  }
}

// Création des éléments

makeCartProductContenu = (itemProduct) => {
  const cartProductItem = document.createElement("div")
  cartProductItem.classList.add("cart__item__content")
  const cartDescProduct = makeCartDescription(itemProduct)
  const cartSettingsProduct = makeCartSettings(itemProduct)
  cartProductItem.appendChild(cartDescProduct)
  cartProductItem.appendChild(cartSettingsProduct)
  return cartProductItem
}

makeCartSettings = (itemSettingsProduct) => {
  const cartSettings = document.createElement("div")
  cartSettings.classList.add("cart__item__content__settings")
  
  addQuantityToSettings(cartSettings, itemSettingsProduct)
  addDeleteToSettings(cartSettings, itemSettingsProduct)
  return cartSettings
}

makeCartArticle = (cartArticle) => {
  const articleProductCart = document.createElement("article")
  articleProductCart.classList.add("card__item")
  articleProductCart.dataset.id = cartArticle.id
  articleProductCart.dataset.color = cartArticle.color
  return articleProductCart
}

cartArticleDisplay = (cartArticle) => {
  document.querySelector("#cart__items").appendChild(cartArticle)
}

makeCarteImg = (cartImg) => {
  const cartImage = document.createElement("img")
  const cartDiv = document.createElement("div")
  cartDiv.classList.add("cart__item__img")
  cartImage.src = cartImg.imageUrl
  cartImage.alt = cartImg.altTxt
  cartDiv.appendChild(cartDiv)
  return cartDiv
}

makeCartDescription = itemProduct => {
  const descProduct = document.createElement("div")
  descProduct.classList.add("cart__item__content__description")
  const cartSubtitleH2 = document.createElement("h2")
  const cartParagraph = document.createElement("p")
  const cartParagraph2 = document.createElement("p")

  cartSubtitleH2.textContent = itemProduct.name
  cartParagraph.textContent = itemProduct.color
  cartParagraph2.textContent = itemProduct.price + "€"

  descProduct.appendChild(cartSubtitleH2)
  descProduct.appendChild(cartParagraph)
  descProduct.appendChild(cartParagraph2)
  return descProduct

}

// Montrer les objets
function displayCartProductItem(cartItemProduct) {
  const article = makeArticle(cartItemProduct)
  const imageDiv = makeImageDiv(cartItemProduct)
  const cardItemContent = makeCartContent(cartItemProduct)
  
  article.appendChild(imageDiv)
  article.appendChild(cardItemContent)
  
  cartArticleDisplay(article)
  cartDisplayQuantityMaxProduct()
  cartDisplayQuantityPriceMaxProducts()
}

cartDisplayQuantityMaxProduct = () => {
  const cartTotalQuantityProducts = document.querySelector("#totalQuantity")
  const cartTotalItemProduct = 
  cart.reduce(
    (cartTotalProduct, item) => cartTotalProduct + item.quantity, 0)
  cartTotalQuantityProducts.textContent = cartTotalItemProduct
}

cartDisplayQuantityPriceMaxProducts = () => {
  const cartPriceTotal = document.querySelector("#totalPrice")
  const totalOfAllProducts = cart.reduce((totalOfItems, item) => totalOfItems + item.price * item.quantity, 0)
  cartPriceTotal.textContent = totalOfAllProducts
}



function makeRequestBody() {
  const form = document.querySelector(".cart__order__form")
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const address = form.elements.address.value
  const city = form.elements.city.value
  const email = form.elements.email.value
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdsFromCache()
  }
  return body
}

function getIdsFromCache() {
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
  }
  return ids

}
// Interactions des produits (suppression + ajout, ...)

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}
function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  )
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromPage(item)
}
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  )
  articleToDelete.remove()
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

  quantity.appendChild(input)
  settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}

function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}




  if (isFormInvalid()) return
  if (isEmailInvalid()) return

  const body = makeRequestBody()
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
    })
    .catch((err) => console.error(err))
}

function isEmailInvalid() {
  const email = document.querySelector("#email").value
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
  if (regex.test(email) === false) {
    alert("Please enter valid email")
    return true
  }
  return false
}

function isFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Please fill all the fields")
      return true
    }
    return false
  })
}
const productQuery = window.location.search
const productURLSearchParams = new URLSearchParams(productQuery)
const productID = productURLSearchParams.get("id")

if (productID != null) {
  let itemPrice = 0
  let imgUrl, altText, articleName
}

fetch(`http://localhost:3000/api/products/${productID}`)
.then((response) => response.json())
.then((res) => productDataRecovery(res))

productDataRecovery = canap => {
  const {altTxt, colors, description, imageUrl, name, price} = canap
  itemPrice = price
  imgUrl = imageUrl
  altText = altTxt
  articleName = name
  productMakeImage(imageUrl, altTxt)
  productMakeColors(colors)
  productMakeSubtitle(name)
  productMakeDescription(description)
  productMakePrice(price)  
}

//On crée les éléments qui vont être implémentés

productMakeImage = (imageUrl, altTxt) => {
  const productImage = document.createElement("img")
  const productImageImplement = document.querySelector(".item__img")
  productImage.src = imageUrl
  productImage.alt = altTxt
  if(productImageImplement != null){
    productImageImplement.appendChild(productImage)
  }
}

productMakeColors = colors => {
  const productColorsSelect = document.querySelector("#colors")
  if(productColorsSelect != null)
  {
    colors.forEach((color) => {
      const productColorsOptions = document.createElement("option")
      productColorsOptions.value = color
      productColorsOptions.textContent = color
      productColorsSelect.appendChild(productColorsOptions)
    })
  }
}

productMakeSubtitle = name => {
  const productSubtitle = document.querySelector("#title")
  if(productSubtitle != null){
    productSubtitle.textContent = name
  }
}

productMakeDescription = description => {
  const paragraph = document.querySelector("#description")
  if(paragraph != null){
    paragraph.textContent = description
  }
}

productMakePrice = price => {
  const productPriceDisplay = document.querySelector("#price")
  if(productPriceDisplay != null){
    productPriceDisplay.textContent = price
  }
}

//fonctionnalités du bouton

//Déclaration variable globale button


const productButtonValid = document.querySelector("#addToCart")
productButtonValid.addEventListener("click", productButtonClick)

function productButtonClick() {
  const colorValidation = document.querySelector("#colors").value
  const quantityValidation = document.querySelector("#quantity").value

  if (productCheckCommandInvalid(colorValidation, quantityValidation)) return
    productSaveCommand(colorValidation, quantityValidation)
    redirectToCart()
    
  
}

productSaveCommand = (commandColor, commandQuantity) => {
  const productIDRecover = `${productID}-${commandColor}`
  const productCommandData = {
    id: productID,
    color: commandColor,
    imageUrl: imgUrl,
    altTxt : altText,
    quantity: Number(commandQuantity),
    price: itemPrice,
    name: articleName
  }
  localStorage.setItem(productIDRecover, JSON.stringify(productCommandData))
}

productCheckCommandInvalid = (commandColor, commandQuantity) => {
  if(commandColor == null || commandColor === "" || commandQuantity == null || commandQuantity == 0){
    alert("veuillez sélectionner une couleur ET une quantité de canapés à commander")
    return true
  }
}
function redirectToCart() {
  window.location.href = "cart.html"
}
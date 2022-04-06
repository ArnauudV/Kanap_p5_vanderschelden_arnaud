const productQueryString = window.location.search
const productUrlParams = new URLSearchParams(productQueryString)
const productId = productUrlParams.get("id")
if (productId != null){
  let imgurl, altText, articleName
  let itemPrice = 0
}

fetch(`http://localhost:3000/api/products/${productId}`)
.then((response) => response.json())
.then((res) => productDataRestore(res))

productDataRestore = productCanaps => {
  const { altTxt, colors, description, imageUrl, name, price} = productCanaps
  makeProductImage(imageUrl, altTxt)
  makeProductSubtitle(name)
  makeProductDescription(description)
  makeProductColors(colors)
  makeProductPrice(price)
}

/* Créations des éléments de la page Product */
makeProductImage = (imageUrl, altTxt) => {
  const imageProduct = document.createElement("img")
  imageProduct.src = imageUrl
  imageProduct.alt = altTxt 
}

makeProductSubtitle = name => {
    const subtitleProduct = document.querySelector("#title")
    if(subtitleProduct != null){
      subtitleProduct.textContent = name
    }
}

makeProductDescription = description => {
  const paragraphProduct = document.querySelector("#description")
  if(paragraphProduct != null){
    paragraphProduct.textContent = description
  }
}

makeProductColors = colors => {
  const colorsProduct = document.querySelector("#colors")
  if(colorsProduct != null){
    colors.forEach((colorsOptions) => {
      const optionColorsProduct = document.createElement("option")
      optionColorsProduct.value = colorsOptions
      optionColorsProduct.textContent = colorsOptions
      colorsProduct.appendChild(optionColorsProduct)
    })
  }
}

makeProductPrice = price => {
  const priceProduct = document.querySelector("#price")
  if(priceProduct != null){
    priceProduct.textContent = price
  }
}

/* Création fonction pour sauvegarder le panier */
const buttonProductToCart = document.querySelector("addToCart")
buttonProductToCart.addEventListener("click", linkProductToCart)

saveProductForOrder = (color, quantity) => {
  const productkey = `${id}-${color}`
  const productData = {
    id: id,
    imageUrl: ImgUrl,
    altTxt: altText,
    color: color,
    quantity: Number(quantity),
    price:ItemPrice,
    name: articleName
  }
  localStorage.setItem(productkey, JSON.stringify(productData))
}
//  Création du bouton de click et check la validité
productOrderInvalidForClick = (colorProduct, quantityProduct) => {
  if(colorProduct == null || colorProduct === "" || quantityProduct == 0){
    alert("attention, veuillez sélectionner une couleur et le nombre de canapés à acheter")
    return true 
  }
}

linkProductToCart = () => {
  const colorProduct = document.querySelector("#colors").value
  const quantityProduct = document.querySelector("#quantity").value
  if(productOrderInvalidForClick(colorProduct, quantityProduct)){
    saveProductForOrder(colorProduct, quantityProduct)
    window.location.href = "cart.html"
    return
  }
}
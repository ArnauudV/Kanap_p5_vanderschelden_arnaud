fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => indexDisplayProducts(data))

indexDisplayProducts = canap => {
  canap.forEach((canap) => {
    const { _id, imageUrl, altTxt, name, description} = canap
    const indexProductAnchor = makeIndexProductsAnchor(_id)
    const indexProductArticle = document.createElement("article")
    const indexProductImage = makeIndexImage(imageUrl, altTxt)
    const indexProductSubtitle = makeIndexProductSubtitle(name)
    const indexProductParagraph = makeIndexProductParagraph(description)

    indexAppendProductElements(indexProductArticle, [indexProductImage, indexProductSubtitle, indexProductParagraph])
    indexAppendArticleToAnchor(indexProductAnchor, indexProductArticle)
  })
}
/* Créations des élements à inclure dans l'article */
makeIndexProductsAnchor = id => {
  const anchorProduct = document.createElement("a")
  anchorProduct.href = "./product.html?id=" + id
  return anchorProduct
}

makeIndexImage = (imageUrl, altTxt) => {
 const imageProduct = document.createElement("img")
 imageProduct.src = imageUrl
 imageProduct.alt = altTxt
 imageProduct.removeAttribute("title")
 imageProduct.removeAttribute("style")
 return imageProduct
}

makeIndexProductSubtitle = name => {
  const subtitleProduct = document.createElement("h3")
  subtitleProduct.textContent = name
  subtitleProduct.classList.add("productName")
  return subtitleProduct
}

makeIndexProductParagraph = description => {
  const paragraphProduct = document.createElement("p")
  paragraphProduct.textContent = description
  paragraphProduct.classList.add("productDescription")
  return paragraphProduct
}


/* Créations des fonctions pour pour appendChild (donc inclure dedans) */ 

indexAppendArticleToAnchor = (anchor, article) => {
  const itemsProduct = document.querySelector("#items")
  if (itemsProduct != null){
    itemsProduct.appendChild(anchor)
    itemsProduct.appendChild(article)
  }
}

indexAppendProductElements = (article, arrayProductItems) =>{
  arrayProductItems.forEach((itemsProduct) => {
    article.appendChild(itemsProduct)
  })
}


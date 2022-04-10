fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((productsDonnees) => indexProductsDisplayAdd(productsDonnees))

indexProductsDisplayAdd = canap => {
  canap.forEach((indexCanap) => {
    const { _id, imageUrl, altTxt, name, description } = indexCanap
    
    const indexProductsArticle = document.createElement("article")
    const indexProductsAnchor = indexMakeProductAnchor(_id)
    const indexProductsImage = indexMakeImgOnDiv(imageUrl, altTxt)
    const indexProductsSubtitle = indexMakeSubtitle(name)
    const indexProductsParagraph = indexMakeParagraph(description)

    indexElementsToArticle(indexProductsArticle, [indexProductsImage, indexProductsSubtitle, indexProductsParagraph])
    indexArticleElementsToAnchor(indexProductsAnchor, indexProductsArticle)
  })
}

/* On crée les différents élements à implémenter + bas */ 
indexMakeProductAnchor = id => {
  const linka = document.createElement("a")
  linka.href = "./product.html?id=" + id
  return linka
}

indexMakeImgOnDiv = (imageUrl, altTxt) => {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  return image
}

indexMakeSubtitle = name => {
  const sub = document.createElement("h3")
  sub.textContent = name
  sub.classList.add("productName")
  return sub
}

indexMakeParagraph = description => {
  const paragraph = document.createElement("p")
  paragraph.textContent = description
  paragraph.classList.add("productDescription")
  return paragraph
}

//On implémente les différents élements dans les fonctions "mères"

indexElementsToArticle = (article, table) => {
  table.forEach((indexItemProduct) => {
    article.appendChild(indexItemProduct)
  })
}

indexArticleElementsToAnchor = (anchor, article) => {
  const indexItemProduct = document.querySelector("#items")
  if (indexItemProduct != null) {
    indexItemProduct.appendChild(anchor)
    anchor.appendChild(article)
  }
}
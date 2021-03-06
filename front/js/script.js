fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((productsDonnees) => indexProductsDisplayAdd(productsDonnees));

/* Permet l'affichage des différents éléments ET permet d'intégrer dans les éléments les différentes variables */
function indexProductsDisplayAdd(canap) {
  canap.forEach((indexCanap) => {
    const { _id, imageUrl, altTxt, name, description } = indexCanap;

    const indexProductsArticle = document.createElement("article");
    const indexProductsAnchor = indexMakeProductAnchor(_id);
    const indexProductsImage = indexMakeImgOnDiv(imageUrl, altTxt);
    const indexProductsSubtitle = indexMakeSubtitle(name);
    const indexProductsParagraph = indexMakeParagraph(description);

    indexElementsToArticle(indexProductsArticle, [
      indexProductsImage,
      indexProductsSubtitle,
      indexProductsParagraph,
    ]);
    indexArticleElementsToAnchor(indexProductsAnchor, indexProductsArticle);
  });
}

/* On crée les différents élements à implémenter + bas */
/* Produit une balise <a> qui va contenir le lien vers la page produit spécifique */
function indexMakeProductAnchor(id) {
  const linka = document.createElement("a");
  linka.href = "./product.html?id=" + id;
  return linka;
}

/* Produit une image où on injecte le src et alt des éléments dans les variables */
function indexMakeImgOnDiv(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

/* Produit une balise <h3> qui récupère le nom du produit */
function indexMakeSubtitle(name) {
  const sub = document.createElement("h3");
  sub.textContent = name;
  sub.classList.add("productName");
  return sub;
}

/* crée la description de l'article */
function indexMakeParagraph(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
}

//On implémente les différents élements dans les fonctions "mères"

function indexElementsToArticle(article, table) {
  table.forEach((indexItemProduct) => {
    article.appendChild(indexItemProduct);
  });
}

function indexArticleElementsToAnchor(anchor, article) {
  const indexItemProduct = document.querySelector("#items");
  if (indexItemProduct) {
    indexItemProduct.appendChild(anchor);
    anchor.appendChild(article);
  }
}

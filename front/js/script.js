fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((productsDonnees) => indexProductsDisplayAdd(productsDonnees));

function indexProductsDisplayAdd(canap){
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
};

/* On crée les différents élements à implémenter + bas */
function indexMakeProductAnchor(id){
  const linka = document.createElement("a");
  linka.href = "./product.html?id=" + id;
  return linka;
};

function indexMakeImgOnDiv(imageUrl, altTxt){
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
};

function indexMakeSubtitle(name){
  const sub = document.createElement("h3");
  sub.textContent = name;
  sub.classList.add("productName");
  return sub;
};

function indexMakeParagraph(description){
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
};

//On implémente les différents élements dans les fonctions "mères"

function indexElementsToArticle(article, table){
  table.forEach((indexItemProduct) => {
    article.appendChild(indexItemProduct);
  });
};

function indexArticleElementsToAnchor(anchor, article){
  const indexItemProduct = document.querySelector("#items");
  if (indexItemProduct != null) {
    indexItemProduct.appendChild(anchor);
    anchor.appendChild(article);
  }
};

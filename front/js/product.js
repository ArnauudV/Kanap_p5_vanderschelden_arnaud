const productQuery = window.location.search;
const productURLSearchParams = new URLSearchParams(productQuery);
const productID = productURLSearchParams.get("id");

fetch(`http://localhost:3000/api/products/${productID}`)
  .then((response) => response.json())
  .then((res) => productDataRecovery(res));

function productDataRecovery(canap){
  const { altTxt, colors, description, imageUrl, name, price } = canap;
  itemPrice = price;
  imgUrl = imageUrl;
  altText = altTxt;
  articleName = name;
  productMakeImage(imageUrl, altTxt);
  productMakeColors(colors);
  productMakeSubtitle(name);
  productMakeDescription(description);
  productMakePrice(price);
};

//On crée les éléments qui vont être implémentés

function productMakeImage(imageUrl, altTxt){
  const productImage = document.createElement("img");
  const productImageImplement = document.querySelector(".item__img");
  productImage.src = imageUrl;
  productImage.alt = altTxt;
  if (productImageImplement) {
    productImageImplement.appendChild(productImage);
  }
};

function productMakeColors(colors){
  const productColorsSelect = document.querySelector("#colors");
  if (productColorsSelect) {
    colors.forEach((color) => {
      const productColorsOptions = document.createElement("option");
      productColorsOptions.value = color;
      productColorsOptions.textContent = color;
      productColorsSelect.appendChild(productColorsOptions);
    });
  }
};

function productMakeSubtitle(name){
  const productSubtitle = document.querySelector("#title");
  if (productSubtitle) {
    productSubtitle.textContent = name;
  }
};

function productMakeDescription(description){
  const paragraph = document.querySelector("#description");
  if (paragraph) {
    paragraph.textContent = description;
  }
};

function productMakePrice(price){
  const productPriceDisplay = document.querySelector("#price");
  if (productPriceDisplay) {
    productPriceDisplay.textContent = price;
  }
};

//fonctionnalités du bouton

//Déclaration variable globale button

const productButtonValid = document.querySelector("#addToCart");
productButtonValid.addEventListener("click", productButtonClick);

function productButtonClick(){
  const colorValidation = document.querySelector("#colors").value;
  const quantityValidation = document.querySelector("#quantity").value;

  if (productCheckCommandInvalid(colorValidation, quantityValidation)) return;
  productSaveCommand(colorValidation, quantityValidation);
  productRedirectToCommandCart();
}

function productSaveCommand(commandColor, commandQuantity){
  const productIDRecover = `${productID}-${commandColor}`;
  const productCommandData = {
    id: productID,
    color: commandColor,
    imageUrl: imgUrl,
    altTxt: altText,
    quantity: +commandQuantity,
    price: itemPrice,
    name: articleName,
  };
  localStorage.setItem(productIDRecover, JSON.stringify(productCommandData));
};

function productCheckCommandInvalid(commandColor, commandQuantity){
  const command = +commandQuantity;
  if (!commandColor && !command) {
    alert(
      "veuillez sélectionner une couleur ET une quantité de canapés à commander"
    );
    return true;
  }
  if (!commandColor) {
    alert("CHOISISSEZ une couleur svp");
    return true;
  }
  if (!command) {
    alert("choisissez une quantité svp");
    return true;
  }
};
function productRedirectToCommandCart() {
  window.location.href = "cart.html";
}

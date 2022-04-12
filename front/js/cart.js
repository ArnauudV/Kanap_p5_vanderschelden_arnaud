const cart = [];
cartRecoverProductsInCache();
cart.forEach((item) => cartDisplayProducts(item));
const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => cartCommandValidationOrder(e));

function cartDisplayProducts(cartItemProduct) {
  const article = cartMakeProductArticle(cartItemProduct);
  const image = cartMakeProductImage(cartItemProduct);
  const cardItemContent = cartMakeCommandContent(cartItemProduct);

  article.appendChild(image);
  article.appendChild(cardItemContent);

  cartCommandShowArticle(article);
  cartCommandShowQuantity();
  cartCommandShowPrice();
}

function cartCommandShowArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}

function cartMakeProductDesc(item) {
  const description = document.createElement("div");
  const subtitle = document.createElement("h2");
  const paragraph = document.createElement("p");
  const paragraph2 = document.createElement("p");

  description.classList.add("cart__item__content__description");

  subtitle.textContent = item.name;
  paragraph.textContent = item.color;
  paragraph2.textContent = item.price + " €";

  description.appendChild(subtitle);
  description.appendChild(paragraph);
  description.appendChild(paragraph2);
  return description;
}

function cartMakeProductArticle(itemArticle) {
  const article = document.createElement("article");
  article.classList.add("card__item");
  article.dataset.id = itemArticle.id;
  article.dataset.color = itemArticle.color;
  return article;
}
function cartMakeProductImage(itemImage) {
  const div = document.createElement("div");
  const image = document.createElement("img");

  div.classList.add("cart__item__img");

  image.src = itemImage.imageUrl;
  image.alt = itemImage.altTxt;

  div.appendChild(image);
  return div;
}

function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromCache(),
  };
  return body;
}

function cartMakeCommandContent(cartItemProduct) {
  const cardItemContent = document.createElement("div");
  cardItemContent.classList.add("cart__item__content");

  const description = cartMakeProductDesc(cartItemProduct);
  const settings = cartMakeCommandSettings(cartItemProduct);

  cardItemContent.appendChild(description);
  cardItemContent.appendChild(settings);
  return cardItemContent;
}

function cartMakeCommandSettings(cartItemProduct) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  cartCommandSettingsAddQuantity(settings, cartItemProduct);
  cartCommandSettingsMakeDelete(settings, cartItemProduct);
  return settings;
}

function cartCommandSettingsMakeDelete(settings, item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => cartCommandDeleteAll(item));

  const p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}

function cartCommandSettingsAddQuantity(addSettings, addItem) {
  const quantity = document.createElement("div");
  const p = document.createElement("p");
  const input = document.createElement("input");

  quantity.classList.add("cart__item__content__settings__quantity");

  p.textContent = "Qté : ";

  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = addItem.quantity;
  input.addEventListener("input", () =>
    cartCommandUpdatePriceQuantity(addItem.id, input.value, addItem)
  );

  quantity.appendChild(p);
  quantity.appendChild(input);
  addSettings.appendChild(quantity);
}

function cartCommandShowQuantity() {
  const cartCommandTotal = document.querySelector("#totalQuantity");
  const totalOfAllProducts = cart.reduce(
    (totalOfAllProducts, item) => totalOfAllProducts + item.quantity,
    0
  );
  cartCommandTotal.textContent = totalOfAllProducts;
}

function cartCommandShowPrice() {
  const totalPrice = document.querySelector("#totalPrice");
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalPrice.textContent = total;
}

function cartCommandDeleteProducts(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

function cartCommandDeleteAll(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );
  cart.splice(itemToDelete, 1);
  cartCommandShowPrice();
  cartCommandShowQuantity();
  deleteDataFromCache(item);
  cartCommandDeleteProducts(item);
}

function cartCommandUpdatePriceQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id);

  itemToUpdate.quantity = +newValue;
  item.quantity = itemToUpdate.quantity;

  cartCommandShowQuantity();
  cartCommandShowPrice();
  saveNewDataToCache(item);
}

function cartCommandValidationOrder(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Please select items to buy");
    return;
  }

  if (cartCommandFormValidation()) return;
  if (cartCommandCheckEmailValid()) return;

  const body = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = `./confirmation.html?orderId=${orderId}`;
    })
    .catch((err) => console.error(err));
}

function cartCommandCheckEmailValid() {
  const email = document.querySelector("#email").value;
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  if (regex.test(email) === false) {
    alert("Entrez une email valide svp");
    return true;
  }
  return false;
}

function cartCommandFormValidation() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Remplissez tous les champs svp");
      return true;
    }
    return false;
  });
}

function cartRecoverProductsInCache() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}

function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item);
  const key = `${item.id}-${item.color}`;
  localStorage.setItem(key, dataToSave);
}

function getIdsFromCache() {
  const numberOfProducts = localStorage.length;
  const idOfAll = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    idOfAll.push(id);
  }
  return idOfAll;
}

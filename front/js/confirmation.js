const confirmationOrderCartId = getCartOrderProductId();
console.log(confirmationOrderCartId);
displayConfirmationOrderId(confirmationOrderCartId);
confirmationRemoveAllCache();

/* permet de récupérer l'id du produit */
function getCartOrderProductId() {
  const confirmationQueryString = window.location.search;
  const confirmationUrlSearchParams = new URLSearchParams(
    confirmationQueryString
  );
  return confirmationUrlSearchParams.get("orderId");
}

/* affiche le numéro de commande */
function displayConfirmationOrderId(confirmationOrderCartId) {
  const confirmationOrderIdProduct = document.getElementById("orderId");

  confirmationOrderIdProduct.textContent = confirmationOrderCartId;
}

/* suite à ça, remove tout le cache */
function confirmationRemoveAllCache() {
  const confirmationCache = window.localStorage;
  confirmationCache.clear();
}

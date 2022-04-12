const confirmationOrderCartId = getCartOrderProductId();
console.log(confirmationOrderCartId);
displayConfirmationOrderId(confirmationOrderCartId);
confirmationRemoveAllCache();

function getCartOrderProductId() {
  const confirmationQueryString = window.location.search;
  const confirmationUrlSearchParams = new URLSearchParams(
    confirmationQueryString
  );
  return confirmationUrlSearchParams.get("orderId");
}

function displayConfirmationOrderId(confirmationOrderCartId) {
  const confirmationOrderIdProduct = document.getElementById("orderId");

  confirmationOrderIdProduct.textContent = confirmationOrderCartId;
}

function confirmationRemoveAllCache() {
  const confirmationCache = window.localStorage;
  confirmationCache.clear();
}

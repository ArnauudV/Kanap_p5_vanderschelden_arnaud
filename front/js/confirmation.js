const confirmationOrderCartId = getCartOrderProductId()
displayConfirmationOrderId(confirmationOrderCartId)
confirmationRemoveAllCache()


getCartOrderProductId = () => {
const confirmationQueryString = window.location.search
const confirmationUrlSearchParams = new URLSearchParams(confirmationQueryString)
return confirmationUrlSearchParams.get("confirmationOrderCartId")
}

displayConfirmationOrderId = confirmationOrderCartId => {
  const confirmationOrderIdProduct = document.getElementById("confirmationOrderCartId")
  confirmationOrderIdProduct.textContent = confirmationOrderCartId
}

confirmationRemoveAllCache = () => {
  const confirmationCache = window.localStorage
  confirmationCache.clear()
}
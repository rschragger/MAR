var navDropdown = document.getElementById("nav");

var currentService = "";

navDropdown.addEventListener("click", function (event) {
  event.stopPropagation();
  var thisButton = event.target;
  currentService = thisButton.textContent;
  currentElementIndex = null;
  // window.console.log(currentService);
  localStorage.setItem("currentService", currentService);
  switch (currentService) {
    case "youtube":
      keyTry();
      break;
    default:
      getTopTenApi(currentService, "AU");
      break;
  }
});

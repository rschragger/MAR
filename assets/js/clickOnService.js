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
  $("#top-list-container").empty();
  $("#top-list-container").append(`
    <li class="top-list-item loading">
      <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </li>
  `);

  $("#headerLogo").attr("src", `./assets/images/header/${currentService}.svg`);
});

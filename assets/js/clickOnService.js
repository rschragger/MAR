var navDropdown = document.getElementById("nav");

var currentService = "";

navDropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    var thisButton = event.target;
    currentService = thisButton.textContent;

   // window.console.log(currentService);

    getTopTenApi(currentService, 'AU');

});

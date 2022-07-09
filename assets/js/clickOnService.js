var navDropdown = document.getElementById("nav");

var currentService = "";

navDropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    var thisButton = event.target;
currentService = thisButton.textContent;
console.log(currentService)

getTopTenApi(currentService,'AU')

});

// Declaring variables
var videoLinks = [];
var numberOfvideos = 0;
var items = [];
var currentElementIndex = null;

// Getting favourites from local storage and displaying into favourites section
function getFavourites() {
  var favourites = localStorage.getItem("favourites");
  if (favourites) {
    return JSON.parse(favourites) || {};
  }
  return {};
}

function onClickTopItem(index) {
  if (currentElementIndex === null || currentElementIndex !== index) {
    currentElementIndex = index;
    var currentService = localStorage.getItem("currentService");

    //need to allow for chartmetric or youtube data
    if (currentService == "youtube") {
      //youtube
      var element = items[index];
      lyricsFinder(element.snippet.title);

      $("#player").attr("src", `https://www.youtube.com/embed/${element.id}`);
    } else {
      //chartmetric services
      var element = cityStore.obj.data[index];
      lyricsFinder(element.name);

     $("#aoudio").attr("src", `https://api.chartmetric.com/api/track/${element.id}.mp3`);

      // element.itunes_track_id
      // ? element.itunes_track_id
      // : element.spotify_track_ids
      // ? element.spotify_track_ids[0]
      // : element.id
    }
  }
}

// Ability to add favourites to local storage
function onAddFacourite(index, event) {
  event.stopPropagation();
  var favourites = getFavourites();
  var currentService = localStorage.getItem("currentService");

  if (currentService === "youtube") {
    var currentList = items;
    var item = currentList[index];

    if (!favourites[String(item.id)]) {
      favourites[String(item.id)] = {
        index: index,
        id: item.id,
        name: item.snippet.title,
        serviceType: "youtube",
      };
      localStorage.setItem("favourites", JSON.stringify(favourites));
      $("#favourites").append(
        getFavouriteListElement(item.snippet.title, item.id)
      );
      $("#add-favourite-" + index).addClass("active-favourite-action");
    }
  } else {
    var currentList = cityStore.obj.data;
    var item = currentList[index];

    if (!favourites[String(item.id)]) {
      favourites[String(item.id)] = {
        index: index,
        id: item.id,
        name: item.name,
        serviceType: currentService,
      };
      localStorage.setItem("favourites", JSON.stringify(favourites));
      $("#favourites").append(getFavouriteListElement(item.name, item.id));
      $("#add-favourite-" + index).addClass("active-favourite-action");
    }
  }
}
{
  /* <li id="favourite-item-0" class="collection-item col m4 l12"><span class="title col s10">周杰倫 Jay Chou【最偉大的作品 Greatest Works of Art】Official MV</span><a href="#!" class="secondary-content col s2 remove-action" onclick="onRemoveFacourite(0)"><i class="material-icons">clear</i></a></li> */
}

function onClickFavoriteItem(id) {
  var favourites = getFavourites();
  var item = favourites[String(id)];
  var itemIndex = item.index;

  if (currentElementIndex === null || currentElementIndex !== itemIndex) {
    currentElementIndex = itemIndex;

    if (item.serviceType == "youtube") {
      //youtube
      var element = items[itemIndex];
      if (element) lyricsFinder(item.name);

      $("#player").attr("src", `https://www.youtube.com/embed/${item.id}`);
    } else {
      //chartmetric services
      var element = cityStore.obj.data[itemIndex];
      lyricsFinder(item.name);

      // $("#player").attr("src", `https://www.youtube.com/embed/${element.id}`);
    }
  }
}

// Deleting favourites from list
function onRemoveFacourite(id, event) {
  event.stopPropagation();
  var favourites = getFavourites();
  var itemIndex = favourites[String(id)].index;
  delete favourites[String(id)];

  localStorage.setItem("favourites", JSON.stringify(favourites));
  $("#favourite-item-" + id).remove();
  $("#add-favourite-" + itemIndex).removeClass("active-favourite-action");
}


$(document).ready(function () {
  var currentService = localStorage.getItem("currentService");
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
  switch (currentService) {
    case null:
      localStorage.setItem("currentService", "youtube");
      keyTry();
      $("#headerLogo").attr("src", `./assets/images/header/youtube.svg`);
      break;
    case "youtube":
      keyTry();
      $("#headerLogo").attr(
        "src",
        `./assets/images/header/${currentService}.svg`
      );
      break;
    default:
      getTopTenApi(currentService, "AU");
      $("#headerLogo").attr(
        "src",
        `./assets/images/header/${currentService}.svg`
      );
      break;
  }

  // Dropdown menu functionality and making lists collapsible
  $(".dropdown-trigger").dropdown();
  $(".collapsible").collapsible();

  // Modal
  $(".modal").modal();
  var instance = M.Modal.getInstance($(".modal"));
  var isFirstLoad = !(localStorage.getItem("isLoaded") || "");
  if (isFirstLoad) {
    setTimeout(function () {
      instance.open();
    }, 1600);
    localStorage.setItem("isLoaded", true);
  }

  // Displays favourites from local storage when reloading the page
  var favourites = getFavourites();
  var favouritesKeys = Object.keys(favourites);

  for (var index = 0; index < favouritesKeys.length; index++) {
    var key = favouritesKeys[index];
    $("#favourites").append(
      getFavouriteListElement(favourites[String(key)].name, key)
    );
  }
});

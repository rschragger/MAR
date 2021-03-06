
//MINA FIRST CHANGE, I added lyricsStorer as an array which stores video ids from 0 to 9 where 0 is
//the first song and 9 is the last song
//@ Reeve Lyrics storer is where we store the the promises of the youtube videos names
//then will need to put these names to get the lyricsFinder. This function should be
//linked to the onclick function to display lyrics
var lyricsStorer=[];
var apiKey = "AIzaSyDP8yc-Z0ZxV-aou3CkADOCBBlob-d79J0";


// Declaring variables
var videoLinks = [];
var numberOfvideos = 0;
var items = [];
var currentElementIndex = null;

// Getting favourites from local storage and displaying into favourites section
function getFavourites () {
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
      $("#player").attr("src", `https://www.youtube.com/embed/wp43OdtAAkM`); //${element.id}`);
     //below not ready yet
     //$("#audio").attr("src", `https://api.chartmetric.com/api/track/${cityStore.obj.data[index].id}.mp3`);

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
  /* <li id="favourite-item-0" class="collection-item col m4 l12"><span class="title col s10">????????? Jay Chou????????????????????? Greatest Works of Art???Official MV</span><a href="#!" class="secondary-content col s2 remove-action" onclick="onRemoveFacourite(0)"><i class="material-icons">clear</i></a></li> */
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



var maxResult = 10;

var url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResult}&videoCategoryId=10&key=${apiKey}`;

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var favourites = getFavourites();
    items = data.items;

    for (var index = 0; index < items.length; index++) {
      var elementData = items[index];
      //MINA THIRD CHANGE:I ADDED elementData.id that has the video id so that it can be used
      //to find song name
      var listItem = getTopListElement(elementData, index, favourites[index],elementData.id);
      $("#top-list-container").append(listItem);

    }
  });


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
/*
// staging - two comments below were used in staging
 
//      keyTry();
      break;
    case "youtube":
  //    keyTry();
 staging 
*/
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



//THIS FUNCTION GETS NAME OF SONG THROUGH DOWNLOADING THE YOUTUBE PAGE OF THE SONG THEN
//SEARCHING FOR THE MUSIC TITLE  AND GET IT.

async function songNameFinder(youtubeVideoIdNumber){
  var url = "https://www.youtube.com/watch?v="+ youtubeVideoIdNumber;
  const response = await fetch(url);
  const html= await response.text();
  var titleIndex = html.search('"defaultMetadata":{"simpleText":"') +'"defaultMetadata":{"simpleText":"'.length
  var bigString = html.slice(titleIndex);
  const myArray = bigString.split("\"")[0];
  return myArray;
}





// Declaring variables
var videoLinks = [];
var numberOfvideos = 0;
var apiKey = "AIzaSyDP8yc-Z0ZxV-aou3CkADOCBBlob-d79J0";


var items;

// Getting favourites from local storage and displaying into favourites section
function getFavourites () {
  var favourites = localStorage.getItem("favourites");
  if (favourites) {
    return JSON.parse(favourites) || {};
  }
  return {};
}

// Functions creating list elements start
function getFavouriteListElement(title, index) {
  return (
    "<li id='" +
    "favourite-item-" +
    index +
    "' class='collection-item col m4 l12'>" +
    "<span class='title col s10'>" +
    title +
    "</span>" +
    "<a  href='#!' class='secondary-content col s2 remove-action'" +
    "onclick='" +
    "onRemoveFacourite(" +
    index +
    ")'>" +
    "<i class='material-icons'>clear</i>" +
    "</a>" +
    "</li>"
  );
}

function getTopListElement(elementData, index, isActive) {
  var activeClass = "";
  if (isActive) activeClass = " active-favourite-action";
  return (
    "<li class='top-list-item' onclick='" +
    "onClickTopItem(" +
    index +
    ")'>" +
    "<div class='collapsible-header top-list-item-header waves-effect waves-teal'>" +
    "<div>" +
    "<span class='top-number'>" +
    (index + 1) +
    "</span>" +
    "<img src='" +
    elementData.snippet.thumbnails.default.url +
    "' alt='' width='40' height='40' class='circle'/>" +
    "<div class='top-list-item-title-box'>" +
    "<span class='title'>" +
    elementData.snippet.title +
    "</span>" +
    "<p>" +
    elementData.snippet.channelTitle +
    "</p>" +
    "</div>" +
    "<a href='#!' id='" +
    "add-favourite-" +
    index +
    "' class='secondary-content add-favourite-action" +
    activeClass +
    "'" +
    "onclick='" +
    "onAddFacourite(" +
    index +
    ")'>" +
    "<i class='material-icons'>favorite</i>" +
    "</a>" +
    "</div>" +
    "</div>" +
    "<pre class='collapsible-body white-text description'>" +
    elementData.snippet.description +
    "</pre>" +
    "</li>"
  );
}

// Functions creating list elements end


// Function to find the lyrics and display in the description if available

function lyricsFinder(songName, youtubeDescription) {
  var trackId = 'http://api.musixmatch.com/ws/1.1/track.search?q_track=' + songName + '&s_track_rating=desc&f_lyrics_language=en&apikey=976be22c1d2c0d79345b9f3c25a4da66';
  var idNumber;
  
  fetch(trackId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      idNumber = data.message.body.track_list[0].track.track_id;
      var myLink = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + idNumber + '&apikey=976be22c1d2c0d79345b9f3c25a4da66';
      fetch(myLink)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.message.body.lyrics.lyrics_body);
          $("#description").text(data.message.body.lyrics.lyrics_body);

          
        }).catch(function() {
          $("#description").text(youtubeDescription);
        })

    }).catch(function() {
      $("#description").text(youtubeDescription);
    })
    

}
// Function to display youtube window

var currentElementIndex = null;
function onClickTopItem(index) {
  if (currentElementIndex === null || currentElementIndex !== index) {
    currentElementIndex = index;
    var element = items[index];
    lyricsFinder(element.snippet.title, element.snippet.description)
    
    $("#player").attr("src", `https://www.youtube.com/embed/${element.id}`);
  }
}

// Ability to add favourites to local storage
function onAddFacourite(index) {
  var favourites = getFavourites();
  var item = items[index];

  if (!favourites[index]) {
    favourites[index] = items[index];
    localStorage.setItem("favourites", JSON.stringify(favourites));

    $("#favourites").append(getFavouriteListElement(item.snippet.title, index));
    $("#add-favourite-" + index).addClass("active-favourite-action");
  }
}
{/* <li id="favourite-item-0" class="collection-item col m4 l12"><span class="title col s10">周杰倫 Jay Chou【最偉大的作品 Greatest Works of Art】Official MV</span><a href="#!" class="secondary-content col s2 remove-action" onclick="onRemoveFacourite(0)"><i class="material-icons">clear</i></a></li> */}

// Deleting favourites from list
function onRemoveFacourite(index) {
  var favourites = getFavourites();
  delete favourites[index];

  localStorage.setItem("favourites", JSON.stringify(favourites));

  $("#favourite-item-" + index).remove();
  $("#add-favourite-" + index).removeClass("active-favourite-action");
}

// Making a fetch request to display top 10 videos
var maxResult = 10;
var url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResult}&regionCode=AU&videoCategoryId=10&key=${apiKey}`;
console.log(url);
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var favourites = getFavourites();
    items = data.items;

    for (var index = 0; index < items.length; index++) {
      var elementData = items[index];
      var listItem = getTopListElement(elementData, index, favourites[index]);
      $("#top-list-container").append(listItem);

    }
  });

$(document).ready(function () {
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
  var favouritesValues = Object.values(favourites);

  for (var index = 0; index < favouritesValues.length; index++) {
    var item = favouritesValues[index];
    $("#favourites").append(getFavouriteListElement(item.snippet.title, index));
  }
});


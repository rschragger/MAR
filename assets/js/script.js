// Declaring variables
var videoLinks = [];
var numberOfvideos = 0;
var items;
var currentElementIndex = null;

// Getting favourites from local storage and displaying into favourites section
function getFavourites() {
  var favourites = localStorage.getItem("favourites");
  if (favourites) {
    return JSON.parse(favourites) || {};
  }
  return {};
}

// Functions creating list elements start
function getFavouriteListElement(title, id) {
  return `
    <li id='favourite-item-${id}' class='collection-item col m4 l12 favourite-item' onclick='onClickFavoriteItem(${id})'>
      <span class='title col s10'>
        ${title}
      </span>
      <a  href='#!' class='secondary-content col s2 remove-action' onclick='onRemoveFacourite(${id})'>
        <i class='material-icons'>clear</i>
      </a>
    </li>
    `;
}

function getTopListElement(elementData, index, isActive) {
  var activeClass = "";
  if (isActive) activeClass = " active-favourite-action";
  return `
    <li class='top-list-item' onclick='onClickTopItem(${index})'>
      <div class='collapsible-header top-list-item-header waves-effect waves-teal'>
        <div>
          <span class='top-number'>
            ${index + 1}
          </span>
          <img src='${
            elementData.snippet.thumbnails.default.url
          }' alt='' width='40' height='40' class='circle'/>
          <div class='top-list-item-title-box'>
            <span class='title'>
              ${elementData.snippet.title}
            </span>
            <p>
              ${elementData.snippet.channelTitle}
            </p>
          </div>
          <a 
            href='#!' 
            id='add-favourite-${index}' 
            class='secondary-content add-favourite-action${activeClass}'
            onclick='onAddFacourite(${index})'>
            <i class='material-icons'>favorite</i>
          </a>
        </div>
      </div>
      <pre class='collapsible-body white-text description'>
        ${elementData.snippet.description}
      </pre>
    </li>
    `;
}

// Functions creating list elements end

// Function to find the lyrics and display in the description if available

function lyricsFinder(songName, youtubeDescription) {

  $("#description").text("");
  var trackId =
    "http://api.musixmatch.com/ws/1.1/track.search?q_track=" +
    songName +
    "&s_track_rating=desc&f_lyrics_language=en&apikey=976be22c1d2c0d79345b9f3c25a4da66";

  var idNumber;

  fetch(trackId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      idNumber = data.message.body.track_list[0].track.track_id;

      var myLink =
        "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" +
        idNumber +
        "&apikey=976be22c1d2c0d79345b9f3c25a4da66";

      fetch(myLink)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.message.body.lyrics.lyrics_body);
          $("#description").text(data.message.body.lyrics.lyrics_body);

        })
        .catch(function () {
          $("#description").text(youtubeDescription);
        });

    })
    .catch(function () {
      $("#description").text(youtubeDescription);
    });
}
// Function to display youtube window

function onClickTopItem(index) {
  if (currentElementIndex === null || currentElementIndex !== index) {
    currentElementIndex = index;
    //need to allow for chartmetric or youtube data

    if (currentService == "youtube" || currentService == "") {
      //youtube
      var element = items[index];
      lyricsFinder(element.snippet.title, element.snippet.description);

      $("#player").attr("src", `https://www.youtube.com/embed/${element.id}`);
    } else {
      //chartmetric services
      var element = cityStore.obj.data[index];
      lyricsFinder(
        element.name,
        "Sorry, we don't seem to have lyrics yet for " +
          element.name +
          " by " +
          element.artist_names[0]
      );

      // $("#player").attr("src", `https://www.youtube.com/embed/${element.id}`);

    }
  }
}

// Ability to add favourites to local storage
function onAddFacourite(index) {
  var favourites = getFavourites();
  var currentService = localStorage.getItem("currentService");

  if (currentService === "youtube") {
    var currentList = items;
    var item = currentList[index];

    if (!favourites[item.id]) {
      favourites[item.id] = {
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

    if (!favourites[item.id]) {
      favourites[item.id] = {
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
  var item = favourites[id];
  var itemIndex = item;

  if (currentElementIndex === null || currentElementIndex !== index) {
    currentElementIndex = itemIndex;

    if (item.serviceType == "youtube") {
      //youtube
      var element = items[itemIndex];
      lyricsFinder(item.name, element.snippet.description);

      $("#player").attr("src", `https://www.youtube.com/embed/${item.id}`);
    } else {
      //chartmetric services
      var element = cityStore.obj.data[itemIndex];
      lyricsFinder(
        item.name,
        "Sorry, we don't seem to have lyrics yet for " +
          item.name +
          " by " +
          element.artist_names[0]
      );

      // $("#player").attr("src", `https://www.youtube.com/embed/${element.id}`);
    }
  }
}


// Deleting favourites from list
function onRemoveFacourite(id) {
  var favourites = getFavourites();
  var itemIndex = favourites[id].index;
  delete favourites[id];

  localStorage.setItem("favourites", JSON.stringify(favourites));

  $("#favourite-item-" + id).remove();
  $("#add-favourite-" + itemIndex).removeClass("active-favourite-action");
}

// Making a fetch request to display top 10 videos

$(document).ready(function () {
  var currentService = localStorage.getItem("currentService");

  switch (currentService) {
    case null:
      localStorage.setItem("currentService", "youtube");
      keyTry();
      break;
    case "youtube":
      keyTry();
      break;
    default:
      getTopTenApi(currentService, "AU");
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
    $("#favourites").append(getFavouriteListElement(favourites[key].name, key));
  }
});

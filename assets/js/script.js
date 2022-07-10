//MINA FIRST CHANGE, I added lyricsStorer as an array which stores lyrics from 0 to 9 where 0 is
//the first song and 9 is the last song
var lyricsStorer=[];
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
    "' class='collection-item row'>" +
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

 //MINA SECOND CHANGE:I added video id to the function so that it can take the video id of each video
 //and uses it to find the song name
 //NB youtube does not return the song name, so I made a specific function for that called
 //songNameFinder, it can be found below.

 //HERE IS THE PROBLEM:-
 //THAT songNameFinder FUNCTION SOMETIMES, IT IS NOT EXECUTED EVERYTIME 
 //WITH THE NEW VIDEO ID, SOMETIMES IT GETS EXECUTED TWICE WITH THE SAME ID
 //THATS WHY ALTHOUGH   console.log(videoId) GETS ALL IDS,   console.log(songName) DOES NOT GET
 //ALL THE SONGS. PLEASE TRY TO FIX THIS

function getTopListElement(elementData, index, isActive,videoId) {
  console.log(videoId);
  var songName = songNameFinder(videoId);
  console.log(songName);
  lyricsStorer[videoId]= "";
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

// var url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResult}&regionCode=au&videoCategoryId=10&key=${apiKey}`;
var url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResult}&videoCategoryId=10&key=${apiKey}`;

console.log("this is the url "+url);
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

//THIS FUNCTION GETS NAME OF SONG THROUGH DOWNLOADING THE YOUTUBE PAGE OF THE SONG THEN 
//SEARCHING FOR THE MUSIC TITLE  AND GET IT.

function songNameFinder(youtubeVideoIdNumber){
  var musicTitle ="";
  var titleIndex = 0;
  var length = 33;
  var indexWoutLength = 0;
var url = "https://www.youtube.com/watch?v="+ youtubeVideoIdNumber;
fetch(url).then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
  indexWoutLength = html.search('"defaultMetadata":{"simpleText":"');
  
}).then(function(){
  titleIndex =   indexWoutLength + length;
  console.log("title index "+titleIndex+"length "+ length);
  var bigString = html.slice(titleIndex);
  musicTitle = bigString.split("\"")[0];
  
    console.log(musicTitle);

  }
)



}

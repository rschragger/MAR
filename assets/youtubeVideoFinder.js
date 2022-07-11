//this function will get the youtube video links matching the search tag and the user can limit the
//number of search results he wants to get. It only gets video links that are embeddable and then
//store in the videolinks array.
//NB: api key has to be provided.
var apiKey = "AIzaSyDP8yc-Z0ZxV-aou3CkADOCBBlob-d79J0";
var maxResult = 10;
var url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResult}&regionCode=AU&videoCategoryId=10&key=${apiKey}`;

function keyTry(myApiKey, searchTag, searchLimit) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var favourites = getFavourites();
      items = data.items;
      $("#top-list-container").empty(); //reset old list to nothing
console.log(data);
      for (var index = 0; index < items.length; index++) {
        var elementData = items[index];
        var listItem = getTopListElement({
          id: elementData.id,
          imgUrl: elementData.snippet.thumbnails.default.url,
          title: elementData.snippet.title,
          channelTitle: elementData.snippet.channelTitle,
          description: elementData.snippet.description,
        }, index, favourites[String(elementData.id)]);
        $("#top-list-container").append(listItem);
      }
    });

  // var videoLinks = [];
  // var numberOfvideos = 0;
  // var embeddableVideo = "";
  // var url =
  //   "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" +
  //   searchLimit +
  //   "&q=surfing&key=" +
  //   myApiKey +
  //   "&order=viewCount&type=video&videoEmbeddable=true&part=snippet&videoSyndicated=true&q=" +
  //   searchTag;

  // fetch(url)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     //gets the number of videos returned
  //     numberOfvideos = data["items"].length;

  //     //gets the id of the videos then concatinate them with the youtube prefix https://www.youtube.com/watch?v=
  //     //to get a full link then insert the full link into videoLinks array.
  //     for (var index = 0; index < numberOfvideos; index++) {
  //       videoLinks[index] =
  //         "https://www.youtube.com/watch?v=" +
  //         data["items"][index]["id"]["videoId"];
  //       var idNumber = data["items"][index]["id"]["videoId"];
  //       embeddableVideo = "https://www.youtube.com/embed/" + idNumber;
  //     }
  //     console.log(embeddableVideo);
  //     document.querySelector("#player").src = embeddableVideo;
  //   });

  // return videoLinks;
}

// keyTry('AIzaSyCrkH7QvGEJRmflgGC8L4kSuQx0bEOMPVA',"bon appetit",1);

//key AIzaSyCBymAbMHWPWS-_srOFFs7exEMSYX_hiIg
// console.log(keyTry('AIzaSyDDOD_xBCrxHtMiXoukG8h94OUdehe97N0',"higher love",1));

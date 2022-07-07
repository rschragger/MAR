var videoLinks = [];
var numberOfvideos = 0;

//this function will get the youtube video links matching the search tag and the user can limit the 
//number of search results he wants to get. It only gets video links that are embeddable and then
//store in the videolinks array.
//NB: api key has to be provided.
function keyTry(myApiKey,searchTag,searchLimit){
  
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='+searchLimit+'&q=surfing&key='+myApiKey +'&type=video&videoEmbeddable=true&part=snippet&q='+searchTag
//   console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //gets the number of videos returned
      numberOfvideos = data["items"].length;  

      //gets the id of the videos then concatinate them with the youtube prefix https://www.youtube.com/watch?v= 
      //to get a full link then insert the full link into videoLinks array. 
      for (var index = 0; index < numberOfvideos; index++) {
        videoLinks[index]= "https://www.youtube.com/watch?v="+data["items"][index]["id"]["videoId"];
      }
    })
    console.log(videoLinks);
    // return videoLinks;
  }
//key AIzaSyCBymAbMHWPWS-_srOFFs7exEMSYX_hiIg
// console.log(keyTry('AIzaSyDDOD_xBCrxHtMiXoukG8h94OUdehe97N0',"higher love",1));
keyTry('AIzaSyDDOD_xBCrxHtMiXoukG8h94OUdehe97N0',"higher love",1);
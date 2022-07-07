
var videoLinks = [];
var numberOfvideos = 0;
function keyTry(myApiKey,searchTag,searchLimit){
  
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='+searchLimit+'&q=surfing&key=AIzaSyCBymAbMHWPWS-_srOFFs7exEMSYX_hiIg&type=video&part=snippet&q='+searchTag
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      numberOfvideos = data["items"].length;  //gets the number of videos returned
        //gets the number of videos returned

      //gets the id of the videos then concatinate them with the youtube prefix https://www.youtube.com/watch?v= 
      //to get a full link then insert the full link into videoLinks array.
      for (var index = 0; index < numberOfvideos; index++) {
        videoLinks[index]= "https://www.youtube.com/watch?v="+data["items"][index]["id"]["videoId"];
      }
      
      
    })
  }
    ;

  keyTry('yourAPIKey',"ladygaga",20);
  
console.log(videoLinks);


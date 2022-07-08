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
  





function lyricsFinder(trackId)
{
  var myLink = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='+trackId+'&apikey=976be22c1d2c0d79345b9f3c25a4da66';
  fetch(myLink)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.message.body.lyrics.lyrics_body);
      return data.message.body.lyrics.lyrics_body;
}
)}

function trackId(songName){
var trackId ='http://api.musixmatch.com/ws/1.1/track.search?q_track='+songName+'&s_track_rating=desc&f_lyrics_language=en&apikey=976be22c1d2c0d79345b9f3c25a4da66';
var idNumber;
fetch(trackId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      idNumber = data.message.body.track_list[0].track.track_id;
      console.log(idNumber);
      lyricsFinder(idNumber);
}
)
}

trackId("bad romance");


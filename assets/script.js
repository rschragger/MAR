function keyTry(myApiKey){
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=surfing&key='+myApiKey;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  }
    ;
  
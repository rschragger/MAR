function keyTry(myApiKey,searchTag,searchLimit){
  
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='+searchLimit+'&q=surfing&key=AIzaSyCBymAbMHWPWS-_srOFFs7exEMSYX_hiIg&type=video&part=snippet&q='+searchTag
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  }
    ;

  keyTry('',"ladygaga",20);
    //  
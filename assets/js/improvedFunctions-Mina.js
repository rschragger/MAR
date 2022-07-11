// Mina start
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
  
  
  
  
  
   function getTopListElement(elementData, index, isActive,videoId) {
     lyricsStorer[index] = songNameFinder(videoId);
   
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
  
  /*  staging
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
      */
  // Mina
  
  
    async function lyricsFinder(songName,youtubeDescription) {
  
    await songName;
   
    var myLyrics = "";
    var trackId = 'http://api.musixmatch.com/ws/1.1/track.search?q_track=' + songName + '&s_track_rating=desc&f_lyrics_language=en&apikey=976be22c1d2c0d79345b9f3c25a4da66';
    var idNumber;
    const response1 = await fetch(trackId);
    const data1 = await response1.json();
   
  try{  idNumber = await data1.message.body.track_list[0].track.track_id;}
  catch{
    myLyrics = "Lyrics not found";
    return myLyrics ;
  }
    var myLink = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + idNumber + '&apikey=976be22c1d2c0d79345b9f3c25a4da66';
    const response2 = await fetch(myLink);
    const data2 = await response2.json();
     myLyrics = data2.message.body.lyrics.lyrics_body;
    return myLyrics;
  // end mina-new
  
   
  
  
  }
  // Function to display youtube window
  
  //  staging
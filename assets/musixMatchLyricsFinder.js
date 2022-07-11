//this function has 2 api calls to musixmatch website to be able to get lyrics.
//first fetch call gets the song id from musixmatch through sorting search by the most popular song
//and filtering songs to get english.
//second fetch call gets the lyrics as per the id
// Function to find the lyrics and display in the description if available
function lyricsFinder(songName) {
  var description = $("#description");
  description.empty();

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
          description.text(data.message.body.lyrics.lyrics_body);
        })
        .catch(function () {
          description.append(`
          <div class='try-it'>
            <div>
              Sorry, we don't seem to have lyrics yet for ${songName}.
            </div>
            <div>
              Try it yourself
            </div>
            <div>
              <div class="input-field col s6 searchBox">
                <input id="searchLyrics" type="text" class="validate">
                <label for="searchLyrics">Search Lyrics</label>
              </div>
              <a class="waves-effect waves-light btn" onclick="searchLyrics()">Search</a>
            </div>
          </div>
        `);
        });
    })
    .catch(function () {
      description.append(`
      <div class='try-it'>
      <div>
        Sorry, we don't seem to have lyrics yet for ${songName}.
      </div>
      <div>
        Try it yourself
      </div>
      <div>
        <div class="input-field col s6 searchBox">
          <input id="searchLyrics" type="text" class="validate">
          <label for="searchLyrics">Search Lyrics</label>
        </div>
        <a class="waves-effect waves-light btn" onclick="searchLyrics()">Search</a>
      </div>
    </div>
      `);
    });
}

function searchLyrics() {
  if ($("#searchLyrics").length) lyricsFinder($("#searchLyrics").val());
}
// lyricsFinder("Higher Love");

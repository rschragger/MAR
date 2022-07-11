var finalCheck = [1];
var momFormat1 = "do MMMM YYYY";
var topTenDiv = $("#top-list-container");
function makeTopTenListCentre() {
  //clear out old
  topTenDiv.empty();
  var topTenData = cityStore.obj.data;

  for (var tT = 0; tT < 10; tT++) {
    //we only want 10 songs

    var songData = topTenData[tT];
    var trackName = songData.name; //✅
    var artistName = songData.artist_names.join(" + "); //✅
    var imageUrl = songData.image_url;

    //other interesting data
    // var releaseDate = songData.release_dates[0]; //on 2 shazam and spotify
    var albumLabel = "";
    if (currentService != "soundcloud") {
      albumLabel = songData.album_label[0];
    } //on 2 shazam and spotify
    var albumName = songData.album_names[0]; //✅
    var addedAt = moment(songData.added_at).format(momFormat1); //✅
    var artistImageUrl = "";
    if (currentService != "soundcloud") {
      artistImageUrl =
        `<a href="` +
        songData.artist_images.join(`">photo </a><a href="`) +
        `">photo </a>`;
    } //on 2 shazam and spotify
    // var peakRank = songData.peakRank; //on 2 shazam and spotify
    var previousRank = songData.pre_rank; //✅
    var currentRank = songData.rank; //✅

    // make the desciption divs
    var descriptionArray = [
      { name: "album", data: albumName },
      { name: "label", data: albumLabel },
      { name: "date", data: addedAt },
      { name: "rank", data: currentRank },
      { name: "last rank", data: previousRank },
      { name: "artist image links", data: artistImageUrl },
    ];
    var descriptionList = "";
    for (var des = 0; des < descriptionArray.length; des++) {
      if (descriptionArray[des].data) {
        descriptionList += `<div class="desc-item">${descriptionArray[des].name}: ${descriptionArray[des].data}</div>`;
      }
    }
    var favourites = getFavourites();

    //----- make the main div list item-----
    topTenDiv.append(
      getTopListElement(
        {
          id: songData.id,
          imgUrl: imageUrl,
          title: trackName,
          channelTitle: artistName,
          description: descriptionList,
        },
        tT,
        favourites[String(songData.id)]
      )
    );
  } // End of function makeTopTenListCentre

  // window.console.log(trackName + " - " + artistName + " - " + imageUrl + " - " + addedAt);
}

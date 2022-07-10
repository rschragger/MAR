var finalCheck = [1];
function makeTopTenListCentre() {
    var topTenData = cityStore.obj.data;
    var thisList = {};
    for (var i = 0; i < 10; i++) { //we only want 10 songs
        var songData = topTenData[i];
        var trackName = songData.name; //✅
        var artistName = songData.artist_names.join(' + ');//✅
        var imageUrl = songData.image_url;

        //other interesting data
       // var releaseDate = songData.release_dates[0]; //on 2 shazam and spotify
       // var albumLabel = songData.album_label[0]; //on 2 shazam and spotify
        var albumName = songData.album_names[0];//✅
        var addedAt = songData.added_at;//✅
      //  var artistImageUrl = songData.artist_images.join(' or '); //on 2 shazam and spotify
       // var peakRank = songData.peakRank; //on 2 shazam and spotify
        var previousRank = songData.pre_rank;//✅
        var currentRank = songData.rank;//✅

    };

   window.finalCheck = [trackName, artistName, imageUrl, addedAt, releaseDate, albumName, albumLabel, albumName, artistImageUrl, peakRank, previousRank, currentRank];

}


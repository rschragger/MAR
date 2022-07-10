var finalCheck = [1];
var momFormat1 = "do MMMM YYYY";
var topTenDiv = document.getElementById('top-list-container');
function makeTopTenListCentre() {
    //clear out old
    topTenDiv.textContent = '';
    var topTenData = cityStore.obj.data;

    for (var tT = 0; tT < 10; tT++) { //we only want 10 songs

        var songData = topTenData[tT];
        var trackName = songData.name; //✅
        var artistName = songData.artist_names.join(' + ');//✅
        var imageUrl = songData.image_url;

        //other interesting data
        // var releaseDate = songData.release_dates[0]; //on 2 shazam and spotify
        var albumLabel = '';
        if (currentService != 'soundcloud') {
            albumLabel = songData.album_label[0]
        } //on 2 shazam and spotify
        var albumName = songData.album_names[0];//✅
        var addedAt = moment(songData.added_at).format(momFormat1);//✅
        var artistImageUrl = '';
        if (currentService != 'soundcloud') {
            artistImageUrl = `<a href="` + songData.artist_images.join(`">photo </a><a href="`) + `">photo </a>`;
        } //on 2 shazam and spotify
        // var peakRank = songData.peakRank; //on 2 shazam and spotify
        var previousRank = songData.pre_rank;//✅
        var currentRank = songData.rank;//✅


        // make the desciption divs 
        var descriptionArray = [{ name: "album", data: albumName }, { name: "label", data: albumLabel }, { name: "date", data: addedAt }, { name: "rank", data: currentRank }, { name: "last rank", data: previousRank }, { name: 'artist image links', data: artistImageUrl }];
        var descriptionList = '';
        for (var des = 0; des < descriptionArray.length; des++) {
            if (descriptionArray[des].data) {
                descriptionList += `<div class="desc-item">${descriptionArray[des].name}: ${descriptionArray[des].data}</div>`
            }

        }

        //----- make the main div list item-----
        topTenDiv.innerHTML += `<li class="top-list-item" onclick="onClickTopItem(${tT})">
<div class="collapsible-header top-list-item-header waves-effect waves-black">
    <div><span class="top-number">${currentRank}</span><img src="${imageUrl}" alt=""
            width="40" height="40" class="circle">
        <div class="top-list-item-title-box"><span class="title">${trackName}</span>
            <div class="artist">${artistName}</div>
        </div><a href="#!" id="add-favourite-${tT}" class="secondary-content add-favourite-action"
            onclick="onAddFacourite(${tT})"><i class="material-icons">favorite</i></a>
    </div>
</div>
<pre class="collapsible-body white-text black description" style="display: none;">
    <div class="desc-grid">
        ${descriptionList}
    </div>
</pre>
</li>`


    };// End of function makeTopTenListCentre

    // window.console.log(trackName + " - " + artistName + " - " + imageUrl + " - " + addedAt);



}


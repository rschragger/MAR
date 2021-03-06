/*INFO***********
use function
getTopTenApi(service, countryCode)

returns: cityStore (an object)
e.g. cityStore.obj.data[i].name

************/
//<!-- moment JS  -->
//<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>

var cityStore = {};
var genToken = '';

// var newText = '';
// var testDiv = document.getElementById('testHere');



function getTopTenApi(service, countryCode) {

    //  ---- This section is the refresh token bit. Use curl supplied and get
    //curl -d "{\"refreshtoken\":\"REFRESH_TOKEN\"}" -H "Content-Type: application/json" -X POST https://api.chartmetric.com/api/token
//console.log("getTopTenApi(" +service +"," + countryCode+")")

    var refreshCmUrl = 'https://api.chartmetric.com/api/token';
    function refreshCmApiToken() {
        var refCmToken = "Xa6rIFLGUa4cy5RA7LJ1rqHmqFYzFRKDqA1GQkYYEeOSeRFoiLahY1kHyX2cI113"; //When we get this working, possibly hide  refresh token key 
        

        fetch(refreshCmUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                refreshtoken: refCmToken, //'uC6sog7Tyf4sakW06bwLoWQmQTwugmzgINywzA0WD0MQQvfRZsK5ZhPssGsBBdoS'// refCmToken ,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            //console.log(data)
             genToken = "Bearer " + data.token;
                //getTopTenApi(service, countryCode ); //'7060','shazam'
                getApiWithToken();

        }).catch(function (error) {
           // console.log(error);
        });
    }
    // ----- End of refresh token ----- */

    // ----- Start of calling API -----
    function getApiWithToken() {
        // Shazam // https://api.chartmetric.com/api/charts/shazam?date=2020-09-01&country_code=AU&city=Melbourne
        // Spotify // https://api.chartmetric.com/api/charts/spotify?date=2018-11-01&country_code=US&interval=daily&type=regional
        //sound cloud //https://api.chartmetric.com/api/charts/soundcloud?date=2019-02-01&country_code=AU&genre=all-music&kind=trending
        // ****Youtube *** not working// https://api.chartmetric.com/api/charts/youtube/tracks?date=2020-02-06&country_code=us&offset=0

        var topTenUrl = '';
        var baseUrl = 'https://api.chartmetric.com/api/charts/';
        var useDate = moment().subtract(8, 'days').format('YYYY-MM-DD'); //All services can have a lag of up to a week before publishing data
        countryCode = 'AU'; //comment this out if searchable
        // var city - not necessary
        var interval = 'daily'; //spotify setting - can improve later
        var typeArea = 'regional'; //spotify setting - can improve later

        if (service == 'shazam') {
            topTenUrl = baseUrl + service + '?date=' + useDate + '&country_code='
                + countryCode
        } else if (service == 'soundcloud') {
            topTenUrl = baseUrl + service + '?date=' + useDate + '&country_code='
                + countryCode + '&genre=all-music&kind=trending'
        } else if (service == 'spotify') {
            topTenUrl = baseUrl + service + '?date=' + useDate + '&country_code='
                + countryCode + '&interval=' + interval + '&type=' + typeArea
        }
        /*//youtube service not working for newer dates *********
        else if (service == 'youtube') {
            topTenUrl = baseUrl + service + '/tracks?date=' + useDate + '&country_code='
                + countryCode
        }*/

        fetch(topTenUrl, {
           // method: 'POST',
            headers: {
                'Authorization': genToken,
                'content-type': 'application/json',
            },
        }).then(function (response) {
            if (response.ok) {
             //   console.log(service + ' test response OK:');
             //   console.log(response);
                return response.json();
            }
            //console.log('test response !OK:');
           // console.log(response);
            throw response;
        }).then(function (data) {
          //  console.log(data);
            cityStore = data;
            makeTopTenListCentre();

        }).catch(function (error) {
            //console.warn(error);
        })
    }; //end getApiWithToken ------------------------

    refreshCmApiToken()
}

//Example for output


    //             "<img src=" + cityStore.obj.data[i].image_url + " >"
    //             +
    //             '<b>' + cityStore.obj.data[i].name + ",</b> " + cityStore.obj.data[i].artist_names



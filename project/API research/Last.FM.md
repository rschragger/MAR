# Last.FM
[Webpage](https://www.last.fm/api)

## Issues
There is a signup but no fees
Need to organise API credentials

## API keys etc
https://www.last.fm/api/authentication

### Token refresh - not sure how this works in app
curl -d "{\"refreshtoken\":\"REFRESH_TOKEN\"}" -H "Content-Type: application/json" -X POST https://api.chartmetric.com/api/token

## Likely APIs 

## Get top tracks
https://www.last.fm/api/show/chart.getTopTracks
### API
JSON: /2.0/?method=chart.gettoptracks&api_key=YOUR_API_KEY&format=json

Params
- page (Optional) : The page number to fetch. Defaults to first page.
- limit (Optional) : The number of results to fetch per page. Defaults to 50.
- api_key (Required) : A Last.fm API key.


## Get top artists
https://www.last.fm/api/show/chart.getTopArtists


### API
JSON: /2.0/?method=chart.gettopartists&api_key=YOUR_API_KEY&format=json

Params
- page (Optional) : The page number to fetch. Defaults to first page.
- limit (Optional) : The number of results to fetch per page. Defaults to 50.
- api_key (Required) : A Last.fm API key.


## Get top tracks with GEO
https://www.last.fm/api/show/geo.getTopTracks

### API
JSON: /2.0/?method=geo.gettoptracks&country=spain&api_key=YOUR_API_KEY&format=json

Params
- country (Required) : A country name, as defined by the ISO 3166-1 country names standard
- location (Optional) : A metro name, to fetch the charts for (must be within the country specified)
- limit (Optional) : The number of results to fetch per page. Defaults to 50.
page (Optional) : The page number to fetch. Defaults to first page.
- api_key (Required) : A Last.fm API key.




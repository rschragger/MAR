# Last.FM
[Webpage](https://www.last.fm/api)

## Issues
No signup 

### Token refresh - not sure how this works in app
curl -d "{\"refreshtoken\":\"REFRESH_TOKEN\"}" -H "Content-Type: application/json" -X POST https://api.chartmetric.com/api/token

## Web presence of likely API - get top tracks
https://www.last.fm/api/show/chart.getTopTracks
### API
JSON: /2.0/?method=chart.gettoptracks&api_key=YOUR_API_KEY&format=json

### API keys etc
https://www.last.fm/api/authentication



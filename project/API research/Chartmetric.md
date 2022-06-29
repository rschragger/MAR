# Chartmetric
[Webpage](https://chartmetric.com/)
## Issues
Requires signup and I'm not sure what the free version allows. There's a 7 day trial

### Token refresh - not sure how this works in app
curl -d "{\"refreshtoken\":\"REFRESH_TOKEN\"}" -H "Content-Type: application/json" -X POST https://api.chartmetric.com/api/token

## Web presence of likely API - Top 100 by city
https://api.chartmetric.com/apidoc/#api-City-GetTopTracks
### API
https://api.chartmetric.com/api/city/:id/:source/top-tracks
curl -H 'Authorization: Bearer ACCESS_KEY' https://api.chartmetric.com/api/city/7060/shazam/top-tracks



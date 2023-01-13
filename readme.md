# LastFM Project

To run the project, follow these steps:
Create a `.env` file with the following values:

```
PORT= 3000
API_KEY = LASTFM_API_KEY
```
Replace `LASTFM_API_KEY` with your API Key. 

Then run: 
- `npm install`
- `node index.js`

# Usage
- To search for an artist:
`GET http://localhost:3000/artists?name=che`

- To Specify the response format:
`GET http://localhost:3000/artists?name=che&format=csv`

This will return `csv` formatted file. Other formats will return `json`
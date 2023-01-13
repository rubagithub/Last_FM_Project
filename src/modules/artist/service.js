const { Parser } = require('json2csv');
const axios = require('axios');
const dictionary = require('./dictionary.json');

const artistSearch=`https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=${process.env.API_KEY}&format=json`;

/*
function generateRandomCharacter() {
    const result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    result += characters.charAt(Math.floor(Math.random() * charactersLength));  
    return result;
}
*/

function convertJsonToCsv(jsonData) {
        const results = [];

        jsonData.forEach(element => {
            const row = {};
            row['name'] = element['name']
            row['mbid'] = element['mbid']
            row['url'] = element['url']
            row['image_small'] = element['image'][0]['#text']
            row['image'] = element['image'][2]['#text']

            results.push(row);
        })

        const parserObj=new Parser();
        const csv = parserObj.parse(results);

        return csv;
}

async function searchArtists (name, format) {
    if (!name) {
        throw new Error('query parameter name is required')
    }

    const newArtistSearch = artistSearch + `&artist=${name}`;

    const lastfmResponse = await axios.get(newArtistSearch);
    let results = lastfmResponse.data.results.artistmatches.artist;

    if (results.length === 0) {
        const randomArtist = dictionary[Math.floor(Math.random() * dictionary.length)]

        /*
        const randomCharacter = generateRandomCharacter();
        const randomRequestLink = artistSearch + randomCharacter + "&limit=3";
        */

        const randomRequestLink = artistSearch + `&artist=${randomArtist}` + "&limit=3";
        const randomResponse = await axios.get(randomRequestLink);
        const randomResults = randomResponse.data.results.artistmatches.artist;

        results = randomResults
    }

    if (format === 'csv') {
        const csv = convertJsonToCsv(results)
        return csv
    } else {
        return results
    }
}

module.exports = {
    searchArtists
}
const { searchArtists } = require("./service");

async function artistsController(req, res) {
    const name = req.query.name;
    const format = req.query.format;

    try {
        const results = await searchArtists(name, format);
        if (format === 'csv') {
            res.set('Content-Type', 'application/octet-stream');
            res.send(results).end()
        } else {
            res.json(results)
        }
    } catch(error){
        res.status(400).end(error.message);
    }
}

module.exports = {
    artistsController
}
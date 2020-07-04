import express from 'express';
import fs from 'fs';
import https from 'https';
const app = express();
const port = 5600;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('NIMDEV');
});
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app);
app.listen(port, () => { console.log('Example app listening on port 3000!'); });
opn(`https://localhost:${5600}`, { app: 'google chrome' });

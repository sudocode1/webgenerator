const express = require('express');
const fs = require('fs');
const { join } = require('path');

const app = express();

app
    .get('/', (_, res) => res.sendFile(join(process.cwd(), 'apple/index.html')))
    .get('/kanye.js', (_, res) => res.sendFile(join(process.cwd(), 'apple/kanye.js')))
    .post('/file/:data', (req, res) => {
        let {i, done, temporaryString, temporaryBase64, array, ok} = {ok: false, done: false, temporaryString: "", temporaryBase64: "", array: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]};
        while (done==false) {
            temporaryString="";
            for(let a=0;a<25;a++){temporaryString+=array[Math.floor(Math.random()*array.length)]};
            temporaryBase64 = Buffer.from(temporaryString).toString(`base64`);
            try{ fs.readFileSync(`juice/public/${temporaryBase64}`); ok = false }
            catch (e) { ok = true }
            finally { done = ok }
        }

        fs.writeFileSync('juice/public/' + temporaryBase64, Buffer.from(req.params.data, 'base64'));
        return res.send(temporaryBase64);
    })
    .get('/:file', (req, res) => {
        try {
            res.send(fs.readFileSync('juice/public/' + req.params.file, 'utf8'));
        } catch {
            res.redirect('/');
        }
    });

app.listen(2000, () => console.log('Listening!'));
const express = require("express")
const cors = require("cors")
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/video/:id', (req, res) => {
    console.log("hi")
    const id = req.params.id
    console.log('sending video in chunks')
    console.log(id)

    const range = req.headers.range
    const videoPath = `C://Users//piyus//Desktop//project copy//flix2//backend//Videos//${id}`;
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})

app.listen(9002, () => {
    console.log("BE started at port 9002")
})

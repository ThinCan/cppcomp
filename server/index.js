const express = require("express")
const { spawn } = require("child_process")
const fs = require("fs")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/../public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/../public/index.html")
})
app.post("/code", async (req, res) => {
    const code = req.body.data
    if (!code) return

    const fileName = Date.now() + ".cpp"

    fs.writeFileSync("server/" + fileName, code)
    const comp = spawn("g++", ["server/" + fileName, "-oserver/" + fileName.slice(0, -4)])
    let err = false;
    let errmsg;
    comp.stderr.on("data", data => {
        err = true;
        errmsg = data.toString()
    })
    comp.on("close", () => {
        if (err) {
            fs.unlinkSync(`./server/${fileName}`)
            res.json({ data: errmsg })
            return;
        }
        const run = spawn(`./server/${fileName.slice(0, -4)}.exe`)
        run.stderr.on("data", data => res.json({ data: data.toString() }));
        run.stdout.on("data", data => res.json({ data: data.toString() }));
        run.on("close", () => {
            try {
                fs.unlinkSync(`./server/${fileName}`)
                fs.unlinkSync(`./server/${fileName.slice(0, -4)}.exe`)
            } catch (error) {
                console.log(error)
            }
        })
    })
})

app.listen(3000)
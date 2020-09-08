import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"

import * as Axios from "axios"
import { Button, Toolbar, AppBar, Typography, Switch, FormControlLabel } from "@material-ui/core"

let editor;

const STYLES = {
    LIGHT: {
        backgroundColor: "white",
        color: "black",
        editorTheme: "chrome"
    },
    DARK: {
        backgroundColor: "#272822",
        color: "white",
        editorTheme: "monokai"
    }
}

const App = () => {
    const output = useRef()
    const [theme, setTheme] = useState(STYLES.LIGHT)

    useEffect(() => {
        editor = ace.edit("editor",)
        editor.setTheme("ace/theme/chrome")
        editor.session.setMode("ace/mode/c_cpp")
    }, [])
    useEffect(() => {
        editor.setTheme("ace/theme/" + theme.editorTheme)
        document.getElementsByTagName("body")[0].style.backgroundColor = theme.backgroundColor
    }, [theme])

    function sendCode() {
        output.current.value = ""
        const text = editor.getValue()

        Axios.default.post("/code", { data: text || "" })
            .then(({ data: { data } }) => {
                setDrs(true)
                output.current.value = data || ""
            })
    }
    const [drs, setDrs] = useState(false)

    return (
        <div className="app-container">
            <AppBar >
                <Toolbar>
                    <Typography variant="h6">Kompilator C++</Typography>
                    <Typography variant="h6" style={{ marginLeft: "auto" }}>Karol Kubicki, 4D</Typography>
                </Toolbar>
            </AppBar>
            <main style={{ marginTop: "70px" }}>
                <div className="editor-controls" style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <FormControlLabel control={
                        <Switch color="secondary" onChange={() => setTheme(theme.color === "black" ? STYLES.DARK : STYLES.LIGHT)} />
                    } label="Ciemny tryb" style={theme} />
                </div>

                <div className="editor-container" style={{ width: "100%", height: "80vh" }}>
                    <div id="editor" className="editor"></div>
                    <textarea className="editor" ref={output} disabled style={theme}></textarea>
                </div>
                <Button variant="contained" color="primary" style={{ width: "100%", marginTop: "25px" }} onClick={sendCode}>Kompiluj</Button>
            </main>

        </div >
    )
}


ReactDOM.render(<App />, document.getElementById("app"))
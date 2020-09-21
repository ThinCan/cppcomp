import React, { useEffect, useRef, useState } from "react"
import Axios from "axios"
import { Button, Snackbar } from "@material-ui/core"
import styled from "styled-components";

let editor;

const StyledEditor = styled.div`
flex-grow: 1;
`
const StyledEditorContainer = styled.div`
display: flex;
height: 75vh;
@media (max-width: 1000px) {
    flex-direction: column;
}
`


const App = ({ theme }) => {
    const output = useRef()
    const [isLogged, setisLogged] = useState(false);
    const [snackbar, setSnackbar] = useState(false)

    useEffect(() => {
        editor = ace.edit("editor")
        editor.setTheme("ace/theme/chrome")
        editor.session.setMode("ace/mode/c_cpp")

        Axios.post("/islogged.php").then((data) => {
            setisLogged(typeof data.data === "number")
        })
    }, [])
    useEffect(() => {
        editor.setTheme("ace/theme/" + theme)
    }, [theme])


    function sendCode() {
        output.current.value = ""
        const text = editor.getValue()
        Axios.default.post("http://localhost:3000/code", { data: text || "" })
            .then(({ data }) => {
                output.current.value = data.data || "";
            })
    }
    function saveCode() {
        const text = editor.getValue();
        if (text.length < 1) return;
        const data = new FormData()
        data.append("code", text)
        Axios.post("/sendcode.php", data)
        setSnackbar(true)
    }

    return (
        <div className="app-container">
            <main style={{ marginTop: "70px" }}>
                <StyledEditorContainer >
                    <StyledEditor id="editor"></StyledEditor>
                    <textarea ref={output} style={{ flex: "1", resize: "none" }} disabled ></textarea>
                </StyledEditorContainer>
                <Button variant="contained" color="primary" onClick={sendCode} >Kompiluj</Button>
                {
                    isLogged && <Button onClick={saveCode} variant="contained" color="primary" style={{ marginLeft: "1em" }}>Zapisz</Button>
                }
            </main>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={snackbar}
                autoHideDuration={1000}
                onClose={() => setSnackbar(false)}
                message={"Zapisano kod do bazy!"}
            />
        </div >
    )
}

export default App;
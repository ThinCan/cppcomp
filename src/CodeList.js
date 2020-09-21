import Axios from "axios"
import React, { useEffect, useState } from "react"
import { ThemeConsumer } from "styled-components"
import Snackbar from "@material-ui/core/Snackbar"

const CodeList = () => {
    const [codes, setCodes] = useState([])
    const [snackbar, setSnackbar] = useState({ open: false, message: "" })

    useEffect(() => {
        Axios.post("/getcodes.php").then(({ data }) => {
            setCodes(data || [])
        })
    }, [])
    function sendCodeDelete(id) {
        const fd = new FormData()
        fd.append("id", id)
        Axios.post("/delete_code.php", fd).then(({ data }) => {
            if (data && data.success) {
                setCodes(codes.filter(t => t[0] !== id))
                setSnackbar({ open: true, message: "Usunięto kod z bazy!" })
            }
        })
    }
    function sendCodeByEmail(code) {
        const fd = new FormData()
        fd.append("code", code)
        Axios.post("sendmail.php", fd)
        setSnackbar({ open: true, message: "Wysłano kod na twój email!" })
    }

    return (
        <ThemeConsumer>
            {theme => (
                <>
                    <ul style={{ listStyle: "none", ...theme }}>
                        {
                            codes.map((e, id) => (
                                <li key={id} style={{ whiteSpace: "break-spaces", marginTop: "1em", ...theme, borderBottom: "1px solid", borderColor: theme.color }}>
                                    <p>{e[1]}</p>
                                    <button onClick={() => sendCodeByEmail(e[1])}>Wyślij na email</button>
                                    <button onClick={() => sendCodeDelete(e[0])}>Usuń</button>
                                </li>
                            ))
                        }
                    </ul>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={snackbar.open}
                        autoHideDuration={3000}
                        onClose={() => setSnackbar({ open: false, message: "" })}
                        message={snackbar.message}
                    />
                </>
            )}
        </ThemeConsumer>
    )
}

export default CodeList;
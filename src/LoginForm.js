import React, { useEffect, useState } from "react"
import { Button, Link } from "@material-ui/core"
import styled, { } from "styled-components"
import { useHistory } from "react-router-dom"
import Axios from "axios"

const StyledForm = styled.form`
display: flex;
flex-direction: column;
width: 25%;
margin: 0 auto;
`
const SubmitContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
margin-top: 40px;
`

const LoginForm = () => {
    const history = useHistory()

    const [error, setError] = useState("")
    useEffect(() => {
        Axios.post("/login_error.php").then(({ data: { error } }) => {
            setError(error)
        })
    }, [])

    return (
        <StyledForm action="login.php" method="POST">
            {
                error && <span style={{ color: "red" }}>{error}</span>
            }
            <label>Email:</label><input type="text" name="email" />
            <label>Hasło</label><input type="password" name="pass" />
            <SubmitContainer>
                <Button type="submit" variant="contained" color="primary" >Zaloguj</Button>
                <Link href="#" onClick={(e) => { e.preventDefault(); history.push("/register") }}>Nie masz konta? Zarajestruj</Link>
            </SubmitContainer>
        </StyledForm >
    )
}

export default LoginForm;
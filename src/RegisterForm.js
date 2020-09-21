import React, { useEffect, useState } from "react"
import { Button } from "@material-ui/core"
import styled from "styled-components"
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

const RegisterForm = () => {
    const [error, setError] = useState("")
    useEffect(() => {
        Axios.post("/register_error.php").then(({ data: { error } }) => {
            setError(error)
        })
    }, [])

    return (
        <StyledForm action="register.php" method="POST">
            {
                error && <span style={{ color: "red" }}>{error}</span>
            }
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="pass" placeholder="hasło" />
            <SubmitContainer>
                <Button type="submit" variant="contained" color="primary" >Załóż konto</Button>
            </SubmitContainer>
        </StyledForm>
    )
}

export default RegisterForm;
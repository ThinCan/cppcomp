import React, { useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { FormControlLabel, Switch, Menu, MenuItem, Button } from "@material-ui/core"
import styled from "styled-components"
import Axios from "axios"

const StyledHeader = styled.header`
display: flex;
justify-content: space-between;
background-color: #0f3460;
margin-bottom: 10px;
box-shadow: 0px -60px 50px 50px black;
&, & *{color: white;}
& h4 {margin-left: 10px;}
`

const Navigation = ({ toggleTheme }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [islogged, setIsLogged] = useState(false)

    const menuAnchorBtn = useRef()
    const history = useHistory()

    const navigate = (location) => {
        history.push(location)
    }
    useEffect(() => {
        Axios.post("/islogged.php").then(({ data }) => {
            setIsLogged(typeof data === "number")
        })
    }, [])


    return (
        <StyledHeader>
            <h4>Kompilator C++, Karol Kubicki 4D</h4>
            <FormControlLabel control={
                <Switch color="secondary" onChange={() => toggleTheme()} checked={localStorage.getItem("theme") == "dark"} />
            } label="Ciemny tryb" />
            <Button onClick={() => setMenuOpen(true)} ref={menuAnchorBtn}>Konto</Button>
            <Menu open={isMenuOpen} onClose={() => setMenuOpen(false)} anchorEl={menuAnchorBtn.current}>
                <MenuItem onClick={() => navigate("/")}>Kompilator</MenuItem>
                {
                    islogged ?
                        ([
                            <MenuItem onClick={() => window.location.replace("/logoff.php")}>Wyloguj</MenuItem>,
                            <MenuItem onClick={() => navigate("/codelist")}>Zapisane kody</MenuItem>
                        ]) :
                        ([
                            <MenuItem onClick={() => navigate("/login")}>Zaloguj</MenuItem>,
                            <MenuItem onClick={() => navigate("/register")}>Zarejestruj</MenuItem>
                        ])
                }
            </Menu>
        </StyledHeader>
    )
}
export default Navigation;
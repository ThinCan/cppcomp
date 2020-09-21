import React, { useState } from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import Navigation from "./Navigation"
import LoginForm from "./LoginForm"
import Compiler from "./Compiler"
import RegisterForm from "./RegisterForm"
import CodeList from "./CodeList"

import Styles, { GlobalStyles } from "./styles"


const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const toggleTheme = () => {
        const _theme = theme === "light" ? "dark" : "light"
        setTheme(_theme);
        localStorage.setItem("theme", _theme)
    }


    return (
        <ThemeProvider theme={theme === "light" ? Styles.LIGHT : Styles.DARK}>
            <GlobalStyles />
            <Router>
                <Navigation toggleTheme={toggleTheme} />
                <Switch>
                    <Route exact path="/"  ><Compiler theme={(theme === "light" ? Styles.LIGHT : Styles.DARK).editorTheme} /></Route>
                    <Route path="/codelist" component={CodeList} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                </Switch>
            </Router>
        </ThemeProvider>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))
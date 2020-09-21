import { createGlobalStyle } from "styled-components"

const LIGHT = {
    backgroundColor: "white",
    color: "black",
    editorTheme: "chrome"
}
const DARK = {
    backgroundColor: "#272822",
    color: "white",
    editorTheme: "monokai"
}
const Styles = { LIGHT, DARK }


export const GlobalStyles = createGlobalStyle`
body {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    transition: 100ms all linear;
}
`


export default Styles;
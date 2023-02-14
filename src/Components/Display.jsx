import React from "react"

function Display(props) {
    const { currentInput, fullInput } = props

    return (
        <div id="display">
            <span id="currentInput">{currentInput}</span>
            <span id="fullInput">{fullInput}</span>
        </div>
        )
}

export default Display
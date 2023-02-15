import React from "react"

function Display(props) {
    const { currentInput, fullInput } = props

    return (
        <div id="display--main">
            <span id="display--full">{fullInput}</span>
            <span id="display">{currentInput}</span>
        </div>
        )
}

export default Display


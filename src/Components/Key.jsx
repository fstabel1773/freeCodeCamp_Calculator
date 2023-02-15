import React from "react"

function Key(props) {
    const {id, value, styleClassNames} = props.keyData

    return (
        <button id={id} className={styleClassNames} onClick={() => props.handleInput(value)}>{value}</button>
    )
}

export default Key
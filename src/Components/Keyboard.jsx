import React from "react"
import Key from "./Key.jsx"
import { keyData } from "../assets/data"

function Keyboard() {
    const keys = keyData.map(key => (
        <Key key={key.id} keyData={key} />
    ))

    return (
        <div className="keyboard--container" >
            {keys}
        </div>
    )

}

export default Keyboard
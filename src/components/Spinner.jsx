import React from 'react'
import spinner from "../assets/spinner.gif"

const Spinner = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh"
        }}>
        
        
        <img src={spinner}/>
        
        </div>
    )
}

export default Spinner
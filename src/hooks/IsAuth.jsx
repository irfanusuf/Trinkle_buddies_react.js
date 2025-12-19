import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Store'
import { useNavigate } from 'react-router-dom'

const IsAuth = ({children}) => {


    const { verifyUserApi } = useContext(Context)
    const navigate = useNavigate()

    const verifyuser = async () => {
        const apiresult = await verifyUserApi()
        if (!apiresult) {
            navigate("/login")
        }
    }

    useEffect(() => {
        verifyuser()
    }, [])


    return (
      children
    )
}

export default IsAuth
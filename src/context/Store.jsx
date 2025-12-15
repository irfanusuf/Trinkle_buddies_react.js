import { createContext, useCallback, useState } from 'react'
import App from '../App'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosinstance'




export const Context = createContext()

const Store = () => {

    const [store, setStore] = useState({

        user: {},
        userPosts: [],
        explorePosts: [],
        loading: false,
        commentsOnPostId: [],
        refresh: null
    })


    const navigate = useNavigate()



    async function fetchUserApi() {

        try {
            setStore(prev => ({ ...prev, loading: true }))


            const token = localStorage.getItem("token")

            if (token !== null) {
                const response = await axiosInstance.get(`/user/verify?token=${token}`)   // API CALL
                if (response.status === 200) {


                    setStore(prev => ({ ...prev, user: response.data.payload, loading: false }))
                }

            } else {
                navigate("/login")
            }

        } catch (error) {
            console.log(error)
        }
    }


   const fetchPostsAPi =  useCallback(async() => {
        try {
            setStore(prev => ({ ...prev, loading: true }))
            const token = localStorage.getItem("token")
            const res = await axiosInstance.get(`/fetch/posts?token=${token}`)
            if (res.data.success) {
                setStore(prev => ({ ...prev, userPosts: res.data.payload, loading: false }))
            }
        } catch (error) {
            console.log(error)
        }
    }, [])


    async function likeApi(postId) {
        try {
            console.log("heart button clicked", postId)
            const token = localStorage.getItem("token")
            const res = await axiosInstance.post(`/post/like/${postId}?token=${token}`)
            if (res.data.success) {
                setStore(prev => ({ ...prev, refresh: (refresh) => refresh + 1 }))
            }
        } catch (error) {
            console.log(error)
        }
    }


    async function commentApi(params) {

    }

    async function shareApi(params) {

    }





    return (

        <Context.Provider
            value={{
                ...store,
                fetchUserApi,
                fetchPostsAPi,
                likeApi,
                commentApi,
                shareApi

            }}>
            <App />
        </Context.Provider>

    )
}

export default Store
import { createContext, useCallback, useState } from 'react'
import App from '../App'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosinstance'
import { toast } from 'react-toastify'




export const Context = createContext()

const Store = () => {

    const [store, setStore] = useState({
        user: {},
        userPosts: [],
        explorePosts: [],
        loading: false,
        userRefresh: null,
        postsRefresh: null
    })


    const navigate = useNavigate()


    const verifyUserApi = useCallback(
        async () => {
            try {

                const response = await axiosInstance.get(`/user/verifyUser`)   // API CALL
                if (response.status === 200) {

                    return true
                }
                return false

            } catch (error) {
                console.log(error)
                return false
            }
        }, [])


    const fetchUserDetails = useCallback(
        async () => {
            try {
                setStore(prev => ({ ...prev, loading: true }))

                const response = await axiosInstance.get(`/user/userdetails`)   // API CALL
                if (response.status === 200) {
                    setStore(prev => ({ ...prev, user: response.data.payload, loading: false }))

                }

            } catch (error) {
                console.log(error)
            }
        }, [store.userRefresh, navigate])



    const fetchUserPosts = useCallback(async () => {
        try {
            setStore(prev => ({ ...prev, loading: true }))

            const res = await axiosInstance.get(`/posts/userPosts`)
            if (res.data.success) {
                setStore(prev => ({ ...prev, userPosts: res.data.payload, loading: false }))
            }
        } catch (error) {
            console.log(error)
        }
    }, [store.postsRefresh, navigate])


    const fetchExplorePosts = useCallback(async () => {
        try {
            setStore(prev => ({ ...prev, loading: true }))

            const res = await axiosInstance.get(`/posts/explorePosts`)
            if (res.data.success) {
                setStore(prev => ({ ...prev, explorePosts: res.data.payload, loading: false }))
            }
        } catch (error) {
            console.log(error)
        }
    }, [store.postsRefresh, navigate])






    async function uploadPostAPI(formData) {

        try {
            setStore(prev => ({ ...prev, loading: true }))
            const res = await axiosInstance.post(`/post/create`, formData)
            if (res.data.success) {
                toast.success("Post uploaded Succesfully!")
                setStore(prev => ({ ...prev, userRefresh: (refresh) => refresh + 1, postsRefresh: (refresh) => refresh + 1, loading: false }))
                return true
            }
            return false
        } catch (error) {

            if (error.response) {
                const codesARR = [400, 401, 403, 404, 500]

                if (codesARR.includes(error.status)) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Something Went Wrong !")
                }
            } else {
                toast.error("Connection Refused !")
            }
            return false
        }
    }

    async function likeApi(postId) {
        try {


            const res = await axiosInstance.post(`/post/like/${postId}`)
            if (res.data.success) {
                setStore(prev => ({ ...prev, postsRefresh: (refresh) => refresh + 1 }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function commentApi(text, postId) {
        if (!text.trim()) return
        try {

            const res = await axiosInstance.post(`/post/comment/${postId}`, { text })

            if (res.data.success) {
                setStore(prev => ({ ...prev, postsRefresh: (refresh) => refresh + 1 }))
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }


    async function replyApi(replyText, postId, commentId) {
        if (!replyText.trim()) return
        try {

            const res = await axiosInstance.post(`/post/comment/${postId}/reply/${commentId}`, {
                text: replyText
            })

            if (res.data.success) {
                return true

            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function shareApi() {
    }

    async function reportComment(commentId) {
        try {

            const res = await axiosInstance.post(`/post/comment/${commentId}/report`)

            if (res.data.success) {

            }
        } catch (error) {
            console.log(error)
        }
    }

    async function editComment(editText, commentId) {
        if (!editText.trim()) return
        try {

            const res = await axiosInstance.put(`/post/comment/${commentId}`, {
                text: editText
            })

            if (res.data.success) {
                // setRefresh(refresh => refresh + 1)
                // setEditingCommentId(null)
                // setEditText("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteComment(commentId) {
        if (!window.confirm("Are you sure you want to delete this comment?")) return
        try {

            const res = await axiosInstance.delete(`/post/comment/${commentId}`)

            if (res.data.success) {
                // setRefresh(refresh => refresh + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }





    return (

        <Context.Provider
            value={{
                ...store,
                verifyUserApi,
                fetchUserPosts,
                fetchExplorePosts,
                fetchUserDetails,
                uploadPostAPI,
                likeApi,
                commentApi,
                replyApi,
                shareApi,
                reportComment,
                editComment,
                deleteComment

            }}>
            <App />
        </Context.Provider>

    )
}

export default Store

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosinstance'
import CreatePost from './CreatePost'

const UserProfile = () => {


    const [username, setUsername] = useState("")
    const [posts, setPosts] = useState([])


    const [renderCreatePost , setRenderCreatePost] = useState(false)

    const navigate = useNavigate()


    async function fetchUserApi() {

        try {
            const token = localStorage.getItem("token")
            if (token !== null) {
                const response = await axiosInstance.get(`/user/verify/${token}`)   // API CALL
                if (response.status === 200) {
                    setUsername(response.data.payload.username)
                }

            } else {
                navigate("/login")
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function fetchPostsApi() {
        try {
            const res = await axiosInstance.get("/get/posts")
            if (res.status === 200) {
                setPosts(res.data.payload)
            }

        } catch (error) {
            console.log(error)
        }
    }





    useEffect(() => {
        fetchUserApi()
        fetchPostsApi()
    }, [])




    return (
        <div>
            <h1> Welcome  {username} </h1>
            <h3> This is secure user dashboard   , this should open only after succesfull login  </h3>


            <button onClick={()=>{setRenderCreatePost(!renderCreatePost)}} > create Post </button>

            {renderCreatePost ? <CreatePost/> : ""}     


        </div>
    )
}

export default UserProfile
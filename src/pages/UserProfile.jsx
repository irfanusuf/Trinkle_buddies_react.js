
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosinstance'
import CreatePost from '../components/CreatePost'
import RenderPosts from '../components/RenderPosts'
import Spinner from '../components/Spinner'

const UserProfile = () => {


    const [username, setUsername] = useState("")
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const [renderCreatePost, setRenderCreatePost] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()


    async function fetchUserApi() {

        try {
            const token = localStorage.getItem("token")
            if (token !== null) {
                const response = await axiosInstance.get(`/user/verify?token=${token}`)   // API CALL
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


    async function fetchPostsAPi() {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const res = await axiosInstance.get(`/fetch/posts?token=${token}`)
            if (res.data.success) {
                setPosts(res.data.payload)

                setTimeout(() => {
                      setLoading(false)
                }, 4000);
 
            }
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        fetchUserApi()      // whenveer userprofile renders
    }, [])


    useEffect(() => {
        fetchPostsAPi()    // whenever the userprofile  renders  ,,, when value of refresh changes 
    }, [refresh])



    return (
        <div className='user_profile'>
            <h1> Welcome  {username} </h1>
            <h3> This is secure user dashboard   , this should open only after succesfull login  </h3>

            <button onClick={() => { setRenderCreatePost(!renderCreatePost) }} > create Post </button>

            {renderCreatePost ?

                <CreatePost
                    setRenderCreatePost={setRenderCreatePost}
                    setRefresh={setRefresh}
                /> : ""}

            {/*component*/}

                {loading ?  <Spinner/>    :  <RenderPosts posts={posts} username = {username} />}
        </div>
    )
}

export default UserProfile
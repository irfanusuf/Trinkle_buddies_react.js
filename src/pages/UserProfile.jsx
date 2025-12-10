
import { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosinstance'
import CreatePost from '../components/CreatePost'
import RenderPosts from '../components/RenderPosts'
import Spinner from '../components/Spinner'

const UserProfile = (props) => {


    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [renderCreatePost, setRenderCreatePost] = useState(false)
    const [refresh, setRefresh] = useState(false)


    async function fetchPostsAPi() {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")
            const res = await axiosInstance.get(`/fetch/posts?token=${token}`)
            if (res.data.success) {
                setPosts(res.data.payload)
                setLoading(false)
        
 
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchPostsAPi()    // whenever the userprofile  renders  ,,, when value of refresh changes 
    }, [refresh])



    return (
        <div className='user_profile'>
            <h1> Welcome  {props.username} </h1>
            <h3> This is secure user dashboard   , this should open only after succesfull login  </h3>

            <button onClick={() => { setRenderCreatePost(!renderCreatePost) }} > create Post </button>

            {renderCreatePost ?

                <CreatePost
                    setRenderCreatePost={setRenderCreatePost}
                    setRefresh={setRefresh}
                /> : ""}

            {/*component*/}

                {loading ?  <Spinner/>    :  <RenderPosts 
                posts={posts} 
                username = {props.username} 
                setRefresh={setRefresh} />}
        </div>
    )
}

export default UserProfile
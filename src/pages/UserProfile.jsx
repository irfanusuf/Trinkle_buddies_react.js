
import { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosinstance'
import CreatePost from '../components/CreatePost'
import RenderPosts from '../components/RenderPosts'
import Spinner from '../components/Spinner'
import "./userProfile.css"


const UserProfile = ({ user }) => {

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


        <>

            <div className='user_profile'>

                <div className='user_profile_header'>
                    <div>
                        <h3>   {user.username} </h3>
                        <img src={""} width={100} alt={user.username} />
                    </div>

                
                <div>
                    <h3> Posts     {user && user.posts.length}  </h3>
                    <h3> Following {user && user.following.length} </h3>
                    <h3> Followers {user && user.followers.length} </h3>
                </div> 

                </div>

                <button onClick={() => { setRenderCreatePost(!renderCreatePost) }} > create Post </button>

            </div>



            

                {renderCreatePost ?

                    <CreatePost
                        setRenderCreatePost={setRenderCreatePost}
                        setRefresh={setRefresh}
                    /> : ""}

                {/*component*/}

                {loading ? <Spinner /> : <RenderPosts
                    posts={posts}
                    username={user.username}
                    setRefresh={setRefresh} />}

    


        </>

    )
}

export default UserProfile
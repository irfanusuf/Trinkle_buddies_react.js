
import { useContext,  useEffect,  useState } from 'react'
import CreatePost from '../components/CreatePost'
import RenderPosts from '../components/RenderPosts'
import "../styles/userProfile.css"
import { Context } from '../context/Store'
import Spinner from '../components/Spinner'


const UserProfile = () => {

    const [renderCreatePost, setRenderCreatePost] = useState(false)
  
   const {loading , user  , fetchUserPosts , fetchUserDetails ,  userPosts} = useContext(Context)

   useEffect(()=>{
    fetchUserDetails()
    fetchUserPosts()
   }, [  fetchUserPosts])



    return (
        <>
          {loading ? <Spinner/>  : 
          <div className='user_profile'>
            
                <div className='user_profile_header'>
                    <div>
                        <h3>   {user.username} </h3>
                        <img src={""} width={100} alt={user.username} />
                    </div>

                
                <div>
                    <h3> Posts     {user.posts  &&  user.posts.length   }  </h3>
                    <h3> Following {user.following && user.following.length } </h3>
                    <h3> Followers {user.followers &&  user.followers.length} </h3>
                </div> 

                </div>

                <button onClick={() => { setRenderCreatePost(!renderCreatePost) }} > create Post </button>

        </div>}



            {renderCreatePost &&  <CreatePost setRenderCreatePost={setRenderCreatePost}/> }

             <RenderPosts posts={userPosts} />
        </>

    )
}

export default UserProfile
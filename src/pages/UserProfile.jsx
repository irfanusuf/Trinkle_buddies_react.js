
import { useContext,  useState } from 'react'
import CreatePost from '../components/CreatePost'
import RenderPosts from '../components/RenderPosts'
import "../styles/userProfile.css"
import { Context } from '../context/Store'


const UserProfile = () => {

    const [renderCreatePost, setRenderCreatePost] = useState(false)
  
   const {user} = useContext(Context)

    return (
        <>
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

            </div>

            {renderCreatePost &&  <CreatePost setRenderCreatePost={setRenderCreatePost}/> }


             <RenderPosts />
        </>

    )
}

export default UserProfile
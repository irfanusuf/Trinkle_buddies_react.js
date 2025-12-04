import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosinstance'
import "./renderPost.css"
import { FaHeart, FaRegComment, FaShareSquare } from "react-icons/fa";

const RenderPosts = () => {


    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)


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
        fetchPostsAPi()
    }, [])




    return (
        <div className='render_posts'>

            <h2> Recent Posts</h2>
            <div className='posts' style={{ display: "flex", flexWrap: "wrap" }}>

                {posts.map((post) => (
                    <div className="post">
             
                        <div className="header">
                            <div className="avatar">{post.username?.slice(0, 2).toUpperCase()}</div>
                            <div className="header-info">
                                <h4>{post.userId}</h4>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>


                        
                        {post.postPicUrl ? (
                            <img className="image" src={post.postPicUrl} alt="post" />
                        ) : (
                            <div className="no-image">{post.postCaption}</div>
                        )}


           
                        <div className="actions">
                            <button className="action-btn"><FaHeart /></button>
                            <button className="action-btn"><FaRegComment /></button>
                            <button className="action-btn"><FaShareSquare /></button>
                        </div>


                
                        <div className="likes-count">{post.likes.length} likes</div>


                   
                        {post.postCaption && (
                            <div className="caption">
                                <span className="username">{post.userId} </span>
                                {post.postCaption}
                            </div>
                        )}


                        
                        <div className="comments-summary">
                            View all {post.comments.length} comments
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default RenderPosts

import "../styles/renderPost.css"
import Spinner from "../components/Spinner" 
import { FaHeart, FaRegComment, FaShareSquare } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import CommentCard from "../molecules/CommentCard";
import { Context } from "../context/Store";

const RenderPosts = () => {



    const [showComments, setShowComments] = useState(false)
    const [postId, setPostId] = useState(null)
    const [comments, setComments] = useState([])


    const handleCommentCard = (postId, postCommentsARR) => {
        //  console.log("postid" , postId)
        //  console.log("commentARR" , postCommentsARR)
        setShowComments(true)
        setComments(postCommentsARR)
        setPostId(postId)
    }


    const { loading, refresh, userPosts, likeApi, shareApi, fetchPostsAPi } = useContext(Context)


    useEffect(() => {
        fetchPostsAPi()
    }, [refresh])


    return (
        <>
            {loading ? <Spinner /> :
                <div className='render_posts'>

                    <h2> Recent Posts</h2>


                    <div className='posts' >

                        {userPosts && userPosts.map((post) => (
                            <div className="post">

                                {/* <div className="header">
                            <div className="avatar">{props.username.slice(0, 2).toUpperCase()}</div>
                            <div className="header-info">
                                <h4>{props.username.toUpperCase()}</h4>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div> */}



                                {post.postPicUrl ? (
                                    <img className="image" src={post.postPicUrl} alt="post" />
                                ) : (
                                    <div className="no-image">{post.postCaption}</div>
                                )}



                                <div className="actions">

                                    <button onClick={() => { likeApi(post._id) }} className="action-btn">

                                        <FaHeart

                                            style={post.likes.findIndex(l => l.userId === post.userId) > -1 ?
                                                { color: "red" } : { color: "green" }}

                                        />

                                    </button>



                                    <button onClick={() => { handleCommentCard(post._id, post.comments) }} className="action-btn"><FaRegComment /></button>


                                    <button onClick={shareApi} className="action-btn"><FaShareSquare /></button>

                                </div>



                                <div className="likes-count">{post.likes && post.likes.length} likes</div>



                                {post.postCaption && (
                                    <div className="caption">
                                        <span className="username">{post.userId.username} </span>
                                        {post.postCaption}
                                    </div>
                                )}



                                <div className="comments-summary">
                                    View all {post.comments && post.comments.length} comments
                                </div>



                            </div>
                        ))}

                    </div>



                    {showComments &&

                        <CommentCard
                            comments={comments}
                            postId={postId}
                            setShowComments={setShowComments} />

                    }



                </div>}

        </>

    )
}

export default RenderPosts
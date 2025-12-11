
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosinstance";
import "../styles/renderPost.css"
import { FaHeart, FaRegComment, FaShareSquare } from "react-icons/fa";
import { useState } from "react";
import CommentCard from "../molecules/CommentCard";

const RenderPosts = (props) => {



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



    async function likeApi(postId) {
        try {

            console.log("heart button clicked", postId)
            const token = localStorage.getItem("token")

            const res = await axiosInstance.post(`/post/like/${postId}?token=${token}`)
            if (res.data.success) {
                toast.success("liked succesfully")
                props.setRefresh(true)
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
        <div className='render_posts'>

            <h2> Recent Posts</h2>


            <div className='posts' >

                {props.posts.map((post) => (
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
                                <span className="username">{props.username} </span>
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
                <div className="comments">
                    <CommentCard comments={comments} postId={postId} setRefresh={props.setRefresh} />
                </div>
            }



        </div>
    )
}

export default RenderPosts
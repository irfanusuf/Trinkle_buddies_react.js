
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosinstance";
import "./renderPost.css"
import { FaHeart, FaRegComment, FaShareSquare } from "react-icons/fa";

const RenderPosts = (props) => {


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
            <div className='posts' style={{ display: "flex", flexWrap: "wrap" }}>

                {props.posts.map((post) => (
                    <div className="post">

                        <div className="header">
                            <div className="avatar">{props.username.slice(0, 2).toUpperCase()}</div>
                            <div className="header-info">
                                <h4>{props.username.toUpperCase()}</h4>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>



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



                            <button onClick={commentApi} className="action-btn"><FaRegComment /></button>
                            <button onClick={shareApi} className="action-btn"><FaShareSquare /></button>
                        </div>



                        <div className="likes-count">{post.likes.length} likes</div>



                        {post.postCaption && (
                            <div className="caption">
                                <span className="username">{props.username} </span>
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
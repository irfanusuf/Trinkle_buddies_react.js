
import "./renderPost.css"
import { FaHeart, FaRegComment, FaShareSquare } from "react-icons/fa";

const RenderPosts = (props) => {


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
                            <button className="action-btn"><FaHeart /></button>
                            <button className="action-btn"><FaRegComment /></button>
                            <button className="action-btn"><FaShareSquare /></button>
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
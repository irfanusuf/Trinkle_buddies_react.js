
import "../styles/renderPost.css"
import Spinner from "../components/Spinner"
import { FaHeart, FaRegComment, FaShareSquare } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import CommentCard from "../molecules/CommentCard";
import { Context } from "../context/Store";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from 'react-icons/io'

const RenderPosts = ({ posts }) => {



    const [showComments, setShowComments] = useState(false)
    const [postId, setPostId] = useState(null)
    const [comments, setComments] = useState([])


    const [showSettings, setShowSettings] = useState(false)
    const [settingPostId, setSettingPostId] = useState(null)


    const handleCommentCard = (postId, postCommentsARR) => {

        setShowComments(true)
        setComments(postCommentsARR)
        setPostId(postId)
    }

    const { loading, likeApi, shareApi, user  ,updatepost , deletePost , reportPost} = useContext(Context)


    function handleCopyLink (){


    }


    return (
        <>
            {loading ? <Spinner /> :
                <div className='render_posts'>


                    <div className='posts' >

                        {posts && posts.map((post) => (
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
                                        <FaHeart style={post.likes.findIndex(l => l.userId === post.userId) > -1 ?
                                            { color: "red" } : { color: "green" }} />
                                    </button>

                                    <button onClick={() => { handleCommentCard(post._id, post.comments) }} className="action-btn"><FaRegComment /></button>
                                    <button onClick={shareApi} className="action-btn"><FaShareSquare /></button>


                                    <BsThreeDots onClick={() => {

                                        setShowSettings(true)    // visibiltyu on 
                                        setSettingPostId(post._id)     // 


                                    }} />

                                    {showSettings && post._id === settingPostId &&

                                        <div className="setting_dropDown">

                                            <IoMdClose onClick={()=>{
                                                setShowSettings(false)
                                            }}/>

                                            <ul>
                                                {post.userId !== user.userId && <li onClick={updatepost}> Update</li>}
                                                {post.userId !== user.userId && <li onClick={deletePost}> Delete </li>}
                                                <li onClick={handleCopyLink}> Copy Link</li>
                                                {post.userId === user.userId && <li onClick={reportPost} > Report</li>}

                                            </ul>

                                        </div>


                                    }


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


                </div>}


            {showComments &&

                <CommentCard
                    comments={comments}
                    postId={postId}
                    setShowComments={setShowComments} />
            }

        </>

    )
}

export default RenderPosts
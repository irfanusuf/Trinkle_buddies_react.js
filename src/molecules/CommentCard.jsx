import { useContext, useState } from 'react'
import { FaUser, FaReply, FaFlag, FaEdit, FaTrash, FaClosedCaptioning } from 'react-icons/fa'
import '../styles/CommentCard.css'
import { IoMdClose } from 'react-icons/io'
import ReplyComment from '../atoms/ReplyComment'
import { Context } from '../context/Store'

const CommentCard = ({comments,  postId, setShowComments }) => {
    const [text, setCommentText] = useState("")
    const [showReplyForm, setShowReplyForm] = useState(false)



    
    const [activeReplyId, setActiveReplyId] = useState(null)
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editText, setEditText] = useState("")
    const [replies, setReplies] = useState({}) // Store replies for each comment
    const {editComment , commentApi} = useContext(Context)


    const {loading } = useContext(Context)

    

    function formatDate(dateString) {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.abs(now - date) / 36e5

        if (diffInHours < 1) {
            return `${Math.floor(diffInHours * 60)}m ago`
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`
        } else {
            return date.toLocaleDateString()
        }
    }

    return (
        <div className='comments_main'>
            <h3>
                Comments <span>{comments && comments.length}</span>    <IoMdClose onClick={() => { setShowComments(false) }} />
            </h3>

            <div className="comments_list">

                {!loading && comments && comments.map((comment) => (
                    <div key={comment._id} className="comment_item">
                        <div className="comment_header">
                            <div className="avatar">
                                {comment.userId.profilePic
                                    ? <img src={comment.userId.profilePic} alt={comment.userId.username} />
                                    : <FaUser fontSize={24} color='grey' />
                                }
                            </div>


                            <div className="user_info">
                                <p className="username">
                                    {comment.userId.username}
                                    {comment.isEdited && <span className="edited_badge">Edited</span>}
                                </p>
                                <span className="comment_time">
                                    {formatDate(comment.createdAt || comment.createdDate)}
                                </span>
                            </div>


                        </div>

                        <div className="comment_content">
                            {editingCommentId === comment._id ? (
                                <div className="edit_form">
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="reply_input"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => editComment(comment._id)}
                                        className="reply_btn_small"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingCommentId(null)}
                                        className="action_btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                comment.text
                            )}
                        </div>


                        <div>
                            <FaReply onClick={() => { setShowReplyForm(true) }} />

                            {showReplyForm &&
                                <ReplyComment
                                    comment={comment}
                                    setShowReplyForm={setShowReplyForm}
                                    postId={postId}
                                />}
                        </div>








                        {/* <div className="comment_actions">
                            <button 
                                className="action_btn reply_btn"
                                onClick={() => setActiveReplyId(
                                    activeReplyId === comment._id ? null : comment._id
                                )}
                            >
                                <FaReply /> Reply
                            </button>
                            
                            <button 
                                className="action_btn"
                                onClick={() => {
                                    setEditingCommentId(comment._id)
                                    setEditText(comment.text)
                                }}
                            >
                                <FaEdit /> Edit
                            </button>
                            
                            <button 
                                className="action_btn report_btn"
                                onClick={() => reportComment(comment._id)}
                            >
                                <FaFlag /> Report
                            </button>
                            
                            <button 
                                className="action_btn"
                                onClick={() => deleteComment(comment._id)}
                                style={{ color: '#e74c3c' }}
                            >
                                <FaTrash /> Delete
                            </button>
                        </div> */}

                        {/* {activeReplyId === comment._id && (
                            <div className="reply_section">
                                <div className="reply_form">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a reply..."
                                        className="reply_input"
                                        autoFocus
                                    />
                                    <button 
                                        onClick={() => replyApi(comment._id)}
                                        className="reply_btn_small"
                                    >
                                        Reply
                                    </button>
                                    <button 
                                        onClick={() => setActiveReplyId(null)}
                                        className="action_btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )} */}

                        {/* Replies Display */}
                        {/* {(replies[comment._id] || []).length > 0 && (
                            <div className="replies_list">
                                <h4 style={{ fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '10px' }}>
                                    Replies ({replies[comment._id].length})
                                </h4>
                                {replies[comment._id].map((reply, index) => (
                                    <div key={index} className="reply_item">
                                        <div className="reply_header">
                                            <div className="reply_avatar">
                                                {reply.userId.profilePic 
                                                    ? <img src={reply.userId.profilePic} alt={reply.userId.username} />
                                                    : <FaUser fontSize={16} color='grey' />
                                                }
                                            </div>
                                            <span className="reply_username">{reply.userId.username}</span>
                                            <span className="comment_time" style={{ fontSize: '0.75rem' }}>
                                                {formatDate(reply.createdAt)}
                                            </span>
                                        </div>
                                        <div className="reply_content">{reply.text}</div>
                                    </div>
                                ))}
                            </div>
                        )} */}
                    </div>
                ))}
            </div>

            <form className="main_form" onSubmit={(e) => e.preventDefault()}>
                <div className="form_group">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="main_input"
                    />
                    <button
                        type="button"
                        onClick={async()=>{
                          const apiResult = await  commentApi(text , postId)
                          if(apiResult){
                            // form santization     
                            setCommentText("")
                          }
                        
                        }}
                        className="main_btn"
                        disabled={!text.trim()}
                    >
                        Comment
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentCard
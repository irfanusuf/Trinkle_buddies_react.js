import React, { useState } from 'react'
import { axiosInstance } from '../utils/axiosinstance'
import { toast } from 'react-toastify'

const CommentCard = ({ comments, postId, setRefresh }) => {


    const [text, setCommentText] = useState("")

    const formData = { text }


    async function commentApi(params) {
        try {
            const token = localStorage.getItem("token")
            const res = await axiosInstance.post(`/post/comment/${postId}?token=${token}`, formData)

            if (res.data.success) {
                setRefresh(true)
            }

        } catch (error) {
            console.log(error)
        }
    }






    return (
        <div className='comments_main'>
            <h3> Comments   {comments && comments.length} </h3>
            <ul>
                {comments && comments.map((comment) => (<li> {comment.text} </li>))}
            </ul>

            <form>
                <input placeholder='your thoughts' value={text} onChange={(e) => { setCommentText(e.target.value) }} />


                <button type='button' onClick={commentApi}  > Comment </button>

            </form>


        </div>
    )
}

export default CommentCard
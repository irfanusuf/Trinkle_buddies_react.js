import React, { useState } from 'react'
import { axiosInstance } from '../utils/axiosinstance'
import { IoMdClose } from 'react-icons/io'

const ReplyComment = ({comment , setShowReplyForm , postId , setRefresh}) => {


  const [replyText, setReplyText] = useState("")

   async function replyApi(commentId) {
        if (!replyText.trim()) return
        try {
            const token = localStorage.getItem("token")
            const res = await axiosInstance.post(`/post/comment/${postId}/reply/${commentId}?token=${token}`, {
                text: replyText
            })

            if (res.data.success) {
                // Add reply to state
             
                setReplyText("")
                setRefresh(refresh => refresh + 1)
                // setActiveReplyId(null)
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            <form>
                <input
                    placeholder="reply to {@mehran}"
                    value={replyText}
                    onChange={(e) => { setReplyText(e.target.value) }} />
                <button type='button' onClick={() => { replyApi(comment._id) }}> Reply </button>
            </form>

            <IoMdClose onClick={() => { setShowReplyForm(false) }} />
        </div>
    )
}

export default ReplyComment
import  { useContext, useState } from 'react'

import { IoMdClose } from 'react-icons/io'
import { Context } from '../context/Store'

const ReplyComment = ({ comment, setShowReplyForm, postId }) => {


    const [replyText, setReplyText] = useState("")


    const { replyApi } = useContext(Context)



    return (
        <div> 
            <form>
                <input
                    placeholder="reply to {@mehran}"
                    value={replyText}
                    onChange={(e) => { setReplyText(e.target.value) }} />
                <button type='button' onClick={async () => {

                    const apiResult = await replyApi(replyText , postId ,  comment._id)
                    if (apiResult) {
                        setReplyText("")
                    }

                }}> Reply </button>
            </form>

            <IoMdClose onClick={() => { setShowReplyForm(false) }} />
        </div>
    )
}

export default ReplyComment
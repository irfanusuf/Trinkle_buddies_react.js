import React, { useState } from 'react'
import { axiosInstance } from '../utils/axiosinstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import "./createPost.css"

const CreatePost = () => {

    const [imageFile, setImageFile] = useState(null)

    const [postCaption, setPostCaption] = useState("")
    
    const [previewImage, setPreviewImage] = useState(null);


    const formData = { postCaption }

    const navigate = useNavigate()

    const handleImage = () => {

    }

    async function uploadPostAPI() {

        try {
            const token = localStorage.getItem("token")

            const res = await axiosInstance.post(`/post/create?token=${token}`, formData)

            if (res.status === 201) {
                toast.success(res.data.message)

                setTimeout(() => {
                    navigate("/user/profile")
                }, 3000);
            }
        } catch (error) {

            if (error.response) {
                const codesARR = [400, 401, 403, 404, 500]

                if (codesARR.includes(error.status)) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Something Went Wrong !")
                }
            } else {
                toast.error("Connection Refused !")
            }
        }
    }






    // send image 
    // send caption
    return (
        <div className="create-post">
            <h2>Create Post</h2>
            <form>
                <div className="input-group">
                    <label>Post Caption</label>
                    <input
                        value={postCaption}
                        onChange={(e) => setPostCaption(e.target.value)}
                    />
                </div>


                <div className="image-upload-section">
                    <label
                        className="image-picker"
                        onClick={() => document.getElementById('hiddenImageInput').click()}
                    >
                        {!previewImage && <span>Select Image</span>}
                        {previewImage && (
                            <img src={previewImage} alt="preview" className="preview" />
                        )}
                    </label>


                    <input
                        id="hiddenImageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImage}
                    />
                </div>


                <button className='upload_post_button' type="button" onClick={uploadPostAPI}>
                    Upload Your Post
                </button>
            </form>
        </div>
    )
}

export default CreatePost
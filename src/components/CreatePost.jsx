import React, { useState } from 'react'
import { axiosInstance } from '../utils/axiosinstance'
import { toast } from 'react-toastify'
import "./createPost.css"

const CreatePost = (props) => {


    const [postCaption, setPostCaption] = useState("")
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file === null) {
            return
        }
        const reader = new FileReader()   // instance create 
        reader.readAsDataURL(file) // file reading start 
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreviewImage(reader.result)
                setImageFile(reader.result)
            }
        }
    }


    //const formData = { postCaption, imageFile } // form data when exceeded  100kb json parsing fails with 413 media too large  // cors error 


    const formData = new FormData()
    formData.append("postCaption", postCaption)
    formData.append("imageFile", imageFile)



    async function uploadPostAPI() {

        try {

            setLoading(true)

            const token = localStorage.getItem("token")

            const res = await axiosInstance.post(`/post/create?token=${token}`, formData)

            if (res.data.success) {
                toast.success("Post uploaded Succesfully!")
                setLoading(false)
                // form sanitization 
                setImageFile(null)
                setPreviewImage(null)
                setPostCaption("")

                props.setRenderCreatePost(false)
                props.setRefresh(true)

            }
        } catch (error) {

            setLoading(false)
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
                        type='text'
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
                        onChange={(e) => {
                            handleImage(e)
                        }}
                    />

                </div>

                <button className='upload_post_button' type="button" onClick={uploadPostAPI} disabled={loading}>
                    {loading ? "Uploading....." : "Upload Your Post"}
                </button>

            </form>
        </div>
    )
}

export default CreatePost
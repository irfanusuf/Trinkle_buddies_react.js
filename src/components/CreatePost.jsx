import { useContext, useState } from 'react'
import "../styles/createPost.css"
import { Context } from '../context/Store'

const CreatePost = (props) => {


    const [postCaption, setPostCaption] = useState("")
    const [imageFile, setImageFile] = useState(null)



    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file === null) {
            return
        }
        const reader = new FileReader()   // instance create 
        reader.readAsDataURL(file) // file reading start 
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageFile(reader.result)
            }
        }
    }
    //const formData = { postCaption, imageFile } // form data when exceeded  100kb json parsing fails with 413 media too large  // cors error 

    const formData = new FormData()
    formData.append("postCaption", postCaption)
    formData.append("imageFile", imageFile)

    const { loading, uploadPostAPI } = useContext(Context)



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
                        {!imageFile && <span>Select Image</span>}
                        {imageFile && (
                            <img src={imageFile} alt="preview" className="preview" />
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

                <button className='upload_post_button' type="button"
                    onClick={async () => {
                        const apiResult = await uploadPostAPI(formData)
                        // form sanitization 

                        if (apiResult) {
                            setImageFile(null)
                            setPostCaption("")
                            props.setRenderCreatePost(false)
                        }
                    }}

                    
                    disabled={loading}>
                    {loading ? "Uploading....." : "Upload Your Post"}
                </button>

            </form>
        </div>
    )
}

export default CreatePost
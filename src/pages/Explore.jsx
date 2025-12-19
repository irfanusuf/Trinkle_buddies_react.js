import React, { useContext, useEffect } from 'react'
import RenderPosts from '../components/RenderPosts'
import { Context } from '../context/Store'

const Explore = () => {



  const { fetchExplorePosts , explorePosts} = useContext(Context)


  useEffect(() => {

    fetchExplorePosts()


  }, [fetchExplorePosts])


  return (
    <div>


      <RenderPosts posts = {explorePosts} />




    </div>
  )
}

export default Explore

import axios from 'axios';
import { useState, useEffect } from 'react';

import Global from '../Global';

// react icons https://react-icons.github.io/react-icons/
import { VscEmptyWindow } from "react-icons/vsc";

import { PostCard } from './PostCard';


// Attention we pass here the post object to the PostCard component
// in the map function we call the PostCard component and pass the posts object to the  PostCard



function PostList() {

  // urlBackend: 'http://localhost:3000/api/',
  // here we get the URL http://localhost:3000/api/posts/ to get all posts

  var urlGetAllData = Global.urlBackend + 'posts';

  const [posts, setPosts] = useState([]);


  function getAllPosts() {

    (async () => {
      try {
        const res = await axios.get(urlGetAllData);
        // console.log(res.data.posts);
        //console.log('In Get all Posts', res.data);
        setPosts(res.data);
      }
      catch (error) {
        console.error(error);
      }
    })();  // function autoinvocation
  }



  useEffect(() => {

    getAllPosts();
  }, []);


  /* we can make here if queries with his own return e.g. */
  /* 
          if (  posts.length === null)
          return (
              <div>
                  No articles!
              </div>
          ) */


  // in the map function we call the PostCard component and pass the posts object to the  PostCard

  return (

    <div>
      <div className='text-2xl mt-4 mb-4 bg-green-500  rounded-sm shadow-md shadow-black '>
        List Posts
      </div>


      <div className="grid grid-cols-3 gap-3">
        {
          /* if posts found ! */
          posts.length >= 1 && (

            // show the posts in cards in a JS map function  

            posts.map(post => (

              /*         return (
                          <div className='bg-orange-300' key={post._id}>
      {post.title} <hr />
      {post.description}
      <hr />
    </div>
  ); * /

    /*  className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 */
              // here we show the cards with grids 

              < PostCard post={post} key={post._id} />

            ))

          )
        }
      </div >

      {

        posts.length === 0 && (
          <div >
            < VscEmptyWindow className='w-36 h-36' />
            {/*  {console.log('postslength = 0 no posts')} */}
            <p className='text-2xl'> No Posts!</p>
          </div>
        )
      }
    </div >
  );
}

export default PostList;
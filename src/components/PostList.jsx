
import axios from 'axios';
import { useState, useEffect } from 'react';

// to use the specifics urls
import Global from '../Global';

import { VscEmptyWindow } from "react-icons/vsc";

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
                //console.log(res.data);
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


    return (

        <div>
            <div className='text-2xl py-3'>
                List Posts
            </div>

            {
                /* if posts found ! */
                posts.length >= 1 && (

                    // show ther posts in a JS map function 
                    posts.map(post => {
                        return (
                            <div className='bg-orange-300' key={post._id}>
                                {post.title} <hr />
                                {post.description}
                                <hr />
                            </div>
                        );
                    })

                )

            }


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
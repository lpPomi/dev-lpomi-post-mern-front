
import axios from 'axios';
import Global from '../Global';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState, useEffect, Children } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import noImage from '../assets/images/icons8-no-image-96.png';


//import { Link } from "react-router-dom";



function PostDetails() {


  // here get the parameter id 
  const { id } = useParams();

  /* useState for one post object.. init value is empty */
  const [post, setPost] = useState([]);

  // urlBackend: 'http://localhost:3000/api/',
  // here we get the URL http://localhost:3000/api/posts/:id to get one post by id
  var urlGetPost = Global.urlBackend + 'posts/';


  const navigate = useNavigate();


  // the boolean variable cancleAction = true means that the action was canceled
  const [cancleAction, setCancleAction] = useState(false);


  const [postDeleted, setPostDeleted] = useState(false);

  var urlDeletePost = Global.urlBackend + 'posts/';

  var urlImg = Global.urlBackend + 'get-image/';







  // here with try catch async await and axios with promise
  useEffect(() => {

    /* here we get the article id from the URL 
    to get all other object data we must get the object article by id
    with the function getArticlesBySearch(id)
    */
    /*  {
         console.log('+++++++++++++++++++++++++++++++++++++');
         console.log('In useEffect show the pass parameters');
         console.log('id = ', id);
         console.log('+++++++++++++++++++++++++++++++++++++');
     } */

    id !== null && (
      getPostBySearch(id)
    );

  }, []);



  function getPostBySearch(id) {

    (async () => {
      try {
        const res = await axios.get(urlGetPost + id);
        //console.log('Get one Post by id in PostDetails', res.data);
        //console.log('Image ', res.data.image);
        setPost(res.data);
      }
      catch (error) {
        //console.log('In Error ++++++++');
        console.error(error.message);
        setPost([]);
      }
    })();  // function autoinvocation
  }


  /* 
   we need to use this url urlGetData with the DELETE verb
   http://localhost:3000/api/posts/:id 
   urlBackend: 'http://localhost:3000/api/' */

  const deletePost = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        (async () => {
          try {
            // console.log('Post id : ', id);
            const res = await axios.delete(urlDeletePost + id);
            //console.log('Deleted ##### ', res);
            setPostDeleted(true);

          }
          catch (error) {
            console.error(error.message);
          }
        })();  // function autoinvocation

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );


        navigate('/home');

      }
    });

  };



  return (

    <div>

      {
        cancleAction && (
          <div>
            {/*  {console.log('redirect to  blog....')} */}
            <Navigate to='/home' />
          </div>
        )
      }

      {
        post.length !== 0 && (

          <div>

            {/* <div className=" bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 ">


              <div className="text-2xl ml-2 mt-4">
                Title: <hr />
                {post.title}
              </div>

              <div className="text-1xl ml-2 mt-5">
                Description: <hr />
                {post.description}
              </div>

              <div className='mt-3'>
              
                <button className="bg-red-500 text-sm px-2 py-1 rounded-sm mr-3" onClick={() => { deletePost(post._id); }}>
                  Delete
                </button>

                <button className="bg-green-500 text-sm px-2 py-1 rounded-sm" onClick={() => {
                  setCancleAction(true);
                }}>
                  Back
                </button>



              </div>

            </div> */}

            {/*   define here the card 
            className="flex justify-center items-center py-4 text-white"
            */}
            <div className=" flex justify-center items-center py-4">

              <div className=" max-w-md rounded overflow-hidden shadow-lg ">
                {/*   <img className="w-full" src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Mountain" /> */}


                <div >
                  {/* <img src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Paisaje" /> */}


                  {post.image !== undefined ?
                    (
                      <div>
                        < img className="w-full" src={urlImg + post._id} alt={post.image} />
                      </div>
                    ) :
                    (
                      <div>
                        <img className="w-full" src={noImage} alt='no image' />

                      </div>
                    )
                  }
                </div>


                <div className="px-6 py-4 bg  bg-gray-300" >
                  <div className="font-bold text-xl mb-2">Title</div>
                  <p className="text-gray-700 text-base">
                    {post.title}
                  </p>
                </div>


                <div className="px-6 py-4 bg-gray-300" >
                  <div className="font-bold text-xl mb-2">Description</div>
                  <p className="text-gray-700 text-base">
                    {post.description}
                  </p>
                </div>


                <div className="grid grid-cols-3 px-6 pt-4 pb-2 gap-3 bg-gray-300">

                  <button className="inline-block  bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 shadow-md shadow-black hover:bg-red-700" onClick={() => { deletePost(post._id); }}>
                    Delete
                  </button>

                  <button className="inline-block  bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 shadow-md shadow-black hover:bg-green-700" onClick={() => navigate(`/update/${post._id}`)}>
                    Update
                    {/*     <nav>
                      <Link to={'/update/' + post._id}>Update</Link>
                    </nav> */}

                  </button>


                  <button className="inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 shadow-md shadow-black hover:bg-green-700" onClick={() => {
                    setCancleAction(true);
                  }}>
                    Back
                  </button>


                </div>
              </div>
            </div>
          </div>

        )

      }



      {/*  {
        // if post object is empty
        post.length === 0 && (
          <div >
            <h2 className="subheader">Post  not found !</h2>
          </div>

        )
      } */}

    </div >
  );


}

export default PostDetails;
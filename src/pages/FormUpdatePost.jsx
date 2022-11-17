
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// to use shema validation from yup. Use { .. } because is an export
import { postSchema } from '../validations/PostValidation';


import axios from 'axios';
import Global from '../Global';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function FormUpdatePost() {


  //here we get the post id from the URL 
  //const params = useParams();
  //console.log(params);
  //console.log(params.id)
  // here only the parameter id from the params object
  const { id } = useParams();
  //console.log(id);


  /* useState for one post object.. init value is empty */
  const [post, setPost] = useState([]);

  // urlBackend: 'http://localhost:3000/api/',
  // here we get the URL http://localhost:3000/api/posts/:id to get one post by id
  var urlGetPost = Global.urlBackend + 'posts/';


  const [cancleAction, setCancleAction] = useState(false);

  // for react-hook-form
  // include the shema with the resolve function in the form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema),
  });

  //const navigate = useNavigate();


  /*  useState for the title .. init value is empty */
  const [title, setTitle] = useState('');

  /*  useState for the description .. init value is empty */
  const [description, setDescription] = useState('');


  //  urlBackend: 'http://localhost:3000/api/'
  var urlUpdatePost = Global.urlBackend + 'posts/';
  //console.log(urlSavePost);

  //const [postCopy, setPostCopy] = useState([]);


  const [postSaved, setPostSaved] = useState(false);

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

  }, [id]); // if you get a parameter like id is better to put it here



  function getPostBySearch(id) {

    (async () => {
      try {
        const res = await axios.get(urlGetPost + id);
        // console.log('Get one Post by id ', res.data);
        setPost(res.data);


        // dont needed because we get the original id from the params.....!
        // make a copy ftom the original post object to get the original _id
        // this original id is required for the PUT operation
        //setPostCopy(res.data);
      }
      catch (error) {
        //console.log('In Error ++++++++');
        console.error(error.message);
        setPost([]);
      }
    })();  // function autoinvocation
  }




  // save all inputs from the form in the data object
  const onSubmit = (postObj) => {


    // aquivalent to function createPost(postObj) {
    setPost({
      title: postObj.title,
      description: postObj.description,
    });
    //setPostIsSet(true);
    //console.log(postObj);

    // call the fucntion savepost(post) {
    updatePost(id, postObj);

  };



  /*
    *****************************************
    use here the update url and the verb PUT ! 
    *****************************************
  */

  function updatePost(id, post) {

    /* 
       **************************************************************************
       here we will update the object post and the image into the mongo db server 
       create a PUT verb to store the post object in mongodb 
       urlBackend: 'http://localhost:3000/api/posts/:id'
       **************************************************************************
    */

    //  console.log('In function updatePost  posts: ', posts);
    //setPostIsSet(false);
    //console.log('In function updatePost postIsSet ', postIsSet);

    // save the post in the backend url:     
    /*  Attention: we need to call an autoinvocation function to store the post in mongodb */
    (async () => {
      try {

        // setPostSaved(false);
        //console.log('show id', id);
        // the id comes from the params.id

        const res = await axios.put(urlUpdatePost + id, post);

        //const res = await axios.put(urlUpdatePost + postCopy._id, post);

        //console.log(res);

        // const res = await axios.post(urlUpdatePost, post);

        // console.log('urlSavePost: ', urlSavePost + 'posts');
        //console.log(res.data);

        // search for post id in mongodb for the post just saved
        // console.log('post id: ', res.data.post._id);

        //console.log('In savepost  file0 ', file0);

        // upload the image file if it exists see: https://surajsharma.net/blog/react-upload-file-using-axios


        /*    if (file0 !== null) {
   
               const formData = new FormData();
               formData.append("file0", file0);
               var postId = res.data.post._id;
               //console.log('post Id in file0: ', postId);
   
               try {
                   const response = await axios({
                       method: "post",
                       url: urlPostpostImage + postId,
                       data: formData,
                       headers: { "content-Type": "multipart/form-data" },
                   });
                   //  console.log('urlUploadImage: ', urlPostpostImage + postId);
                   console.log(response.data);
   
                   setImageSaved(true);
               } catch (error) {
                   console.log(error);
               }
           } */

        //setPostSaved(true);
        /* clear the fields nombre, apellidos, description */
        // setTitle('');
        // setDescription('');

        /*    navigate('/home'); */

        /* sweetalert  */
        Swal.fire(
          'Article updated!',
          'success',
          'success'
        );

        setPostSaved(true);

        setTitle('');
        setDescription('');

      }
      catch (error) {
        console.error(error);
      }
    })();  // function autoinvocation 
  };



  return (

    <div>



      {/*        if only article was saved sussessful then redirect to blog */}
      {
        postSaved && (
          <div>
            {/*  {console.log('redirect to  blog....')} */}
            <Navigate to='/home' />
          </div>
        )
      }

      {/* query if cancel was set .. then redirect to home */}
      {
        cancleAction && (
          <div>
            <Navigate to='/home' />
          </div>
        )
      }



      <div className='text-2xl flex justify-center '>Update post</div>

      <div className="flex justify-center items-center py-4 text-white">
        {/*  <section> */}


        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='mb-4'>
            <label htmlFor="title">Title</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the title" {...register("title")} defaultValue={post.title} />
            <p className="text-sm text-red-500">{errors.title?.message}</p>
          </div>


          <div className='mb-4' >
            <label htmlFor="description">Description</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the description" {...register("description")} defaultValue={post.description} />
            <p className="text-sm text-red-500">{errors.description?.message}</p>
          </div>

          {/* get an image from the local pc. Input type file*/}
          {/*  <div className="form-group">
                  <label htmlFor='file0'>Image</label>
          <input onChange={getImage} type="file" id='file0' />
  </div> */}

          {/* submit field */}
          <input className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" type="submit" value="Save"></input>

          {/* <input className="flex justify-start w-20 bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" type="submit" />
*/}

          <button className="bg-indigo-600 hover:bg-indigo-500 mx-2 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" onClick={() => {
            setCancleAction(true);
          }}>
            Cancel
          </button>

        </form>

        {/*  or output in another component */}
        {/*   <postList post={posts} /> */}
        {/*  </section > */}
        {/*     <Sidebar /> */}
      </div >
    </div>

  );
}

export default FormUpdatePost;
import { useState, useEffect } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// to use shema validation from yup. Use { .. } because is an export
import { postSchema } from '../validations/PostValidation';


import Swal from 'sweetalert2';

function FormCreatePost() {

  /*  useState for the title .. init value is empty */
  const [title, setTitle] = useState('');

  /*  useState for the description .. init value is empty */
  const [description, setDescription] = useState('');

  /* useState for the post object .. init value is empty */
  const [post, setPost] = useState([]);

  /*  useState for the image .. init value is empty */
  //const [file0, setFile0] = useState(null);

  const [postIsSet, setPostIsSet] = useState(false);

  const [postSaved, setPostSaved] = useState(false);

  //const [imageSaved, setImageSaved] = useState(false);

  //const [cancleAction, setCancleAction] = useState(false);

  var urlSavePost = Global.urlBackend + 'posts';
  //console.log(urlSavePost);

  // console.log(Global.urlBackend);
  //var urlBackend = Global.urlBackend;
  /* urlBackend: 'http://localhost:3000/api/' */

  //var urlPostImage = Global.urlUploadImage;
  /* urlUploadImage: 'http://localhost:3000/api/upload-image/' */



  /* create the function handleSubmit */
  const handleSubmit = (event) => {
    /* prevent to refresh the website */
    event.preventDefault();

    /* This work only if we use useState from react
       create a new json object post only with title and description fields from the form
       the image will be store in a separated object formData
       so we can later save the image with another url      
    */

    /*    here the call from the createpost function with the object parameters */
    createPost({
      title,
      description,
    });

    /* clear the fields nombre, apellidos, description */
    setTitle('');
    setDescription('');

    /*   console.log('In handleSubmit', post );
      console.log(file0); */
  };





  /*  this function received the object parameter from the hanfleSubmit function 
      and save the description in the object post
  */
  function createPost(postObj) {
    // console.log(postObj);
    setPost({
      title: postObj.title,
      description: postObj.description,
    });

    setPostIsSet(true);

  }
  // goood !
  //console.log('Show post array ', post);
  // console.log('Show post array ', { post});  --> not so here you pass the whole object



  useEffect(() => {

    postIsSet && (
      savepost(post)
    );
  }
  ), [];


  function savepost(post) {
    /* 
       **************************************************************************
       here we will save the object post and the image into the mongo db server 
       create a POST verb to store the post object in mongodb 
       urlBackend: 'http://localhost:3000/api/'
       **************************************************************************
    */

    //  console.log('In function savepost  posts: ', posts);
    setPostIsSet(false);
    //console.log('In function savepost postIsSet ', postIsSet);

    // save the post in the backend url:     
    /*  Attention: we need to call an autoinvocation function to store the post in mongodb */
    (async () => {
      try {
        // validate the input fields with yup
        const isValid = await postSchema.isValid(post);
        //console.log('Are all fields valid ? ', isValid);

        await postSchema
          .validate(post)
          // .then(function (value) {
          //     console.log(value);
          //  })
          .catch(function (err) {
            var errorValidation = err.message;
            // console.log(err);
            Swal.fire(errorValidation);
          });

        if (isValid) {

          const res = await axios.post(urlSavePost, post);

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

          setPostSaved(true);

          /* sweetalert  */
          /*  Swal.fire(
               'post created!',
               'success',
               'success'
           ); */


        } /* else {
                    console.error('validation failed!');
                    // A basic message
                    //  Swal.fire({ errorValidation });

                } */
      }
      catch (error) {
        console.error(error);
      }
    })();  // function autoinvocation 

  };

  /* Attention: changes in useState please show ist outside the function where the change has take place !! */
  //console.log('Outside function savepost postIsSet ', postIsSet);

  // to save the title into the title variable using setTitle
  const getTitle = (e) => {
    setTitle(e.target.value);
    //console.log(e.target.value);
  };


  // to save the description into the description variable using setdescription
  const getDescription = (e) => {
    setDescription(e.target.value);
    //console.log(e.target.value);;
  };


  // to save the image into the image variable using setImage
  const getImage = (e) => {
    setFile0(e.target.files[0]);
    // console.log(e.target.files[0].name);
  };




  return (

    <div>

      {/*        if only post was saved sussessful then redirect to home */}
      {
        postSaved && (
          <div>
            {/*  {console.log('redirect to  home....')} */}
            <Navigate to='/home' />
          </div>
        )
      }


      {/*        if the post & the image was saved sussessful then redirect to blog */}
      {/* {
                postSaved && imageSaved && (
                    <div>
                        <Navigate to='/home' />
                    </div>
                )
            } */}

      {/* query if cancel was set .. then redirect to home */}
      {/* {
                cancleAction && (
                    <div>
                        <Navigate to='/home' />
                    </div>
                )
            } */}

      {/*       <Slider
                title='Create post'
                sizeTitle='slider-small'
            /> */}

      <div className='text-2xl flex justify-center '>Create post</div>


      <div className="flex justify-center items-center py-4 text-white">
        {/*  <section> */}


        <form onSubmit={handleSubmit}>

          <div className='mb-4'>
            <label htmlFor="title">Title</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" onChange={getTitle} type="text" value={title} placeholder="set the title" />
          </div>

          <div className='mb-4' >
            <label htmlFor="description">Description</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" onChange={getDescription} type="text" value={description} placeholder="set the description" />
          </div>

          {/* get an image from the local pc. Input type file*/}
          {/*  <div className="form-group">
                            <label htmlFor='file0'>Image</label>
                    <input onChange={getImage} type="file" id='file0' />
            </div> */}

          <input className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" type="submit" value="Save"></input>

          {/*  <button className="btn btn-success" onClick={() => {
                            setCancleAction(true);
                        }}>
                            Cancel
                        </button> */}

        </form>

        {/*  or output in another component */}
        {/*   <postList post={posts} /> */}
        {/*  </section > */}
        {/*     <Sidebar /> */}
      </div >

    </div >

  );

}

export default FormCreatePost;
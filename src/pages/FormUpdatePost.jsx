
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// to use shema validation from yup. Use { .. } because is an export
import { postSchema } from '../validations/PostValidation';

import { Link } from "react-router-dom";
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

  //  urlBackend: 'http://localhost:3000/api/'
  var urlUpdatePost = Global.urlBackend + 'posts/';
  var urlDeletePost = Global.urlDelImage;
  var urlUploadOnlyImage = Global.urlUploadImage;


  // this is the object from the image to be uploaded to mongodb
  const [imageFile, setImageFile] = useState([]);

  const [cancleAction, setCancleAction] = useState(false);

  // for react-hook-form
  // include the shema with the resolve function in the form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema),
  });

  const navigate = useNavigate();

  /*  useState for the title .. init value is empty */
  const [title, setTitle] = useState('');

  /*  useState for the description .. init value is empty */
  const [description, setDescription] = useState('');


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
        console.error(error.message);
        setPost([]);
      }
    })();  // function autoinvocation
  }


  // to save the image into the image variable using setImage
  const getImage = (e) => {
    setImageFile(e.target.files[0]);
    //register("image");
    //console.log('IMAGE ', e.target.files[0]);
  };


  // save all inputs from the form in the data object
  const onSubmit = (postObj) => {

    // aquivalent to function createPost(postObj) {
    setPost({
      title: postObj.title,
      description: postObj.description,
      // i get here only the FileList and not the File Object
      // image: postObj.image[0]
    });
    // setPostIsSet(true);
    //console.log(postObj);


    /* 
    we can use 2 methods
    *** first
    updatePost(id, postObj); 
    
    here we update the post object and save the image extra
    
    *** second
    we update the post object with image if exists wit an pput command 
    and if no image was sekected update only Title & Description 
     */

    // you can choose this method
    //updatePost(id, postObj);

    // you can choose also this method
    updateFullPost(id, postObj);


  };



  /*
    ***********************************************
    use here the update function and the verb PUT ! 
    ***********************************************
  */
  function updatePost(id, post) {

    /* 
       **************************************************************************
       here we will update the object post and the image into the mongo db server 
       create a PUT verb to store the post object in mongodb 
       urlBackend: 'http://localhost:3000/api/posts/:id'
       **************************************************************************
    */

    (async () => {

      try {
        //console.log('i do not have an image');
        // console.log('id', id);
        console.log('Post object', post);
        // save only title & description


        // get the image post.image from mongo#

        /* 
                  const form = new FormData();
        
                  // read title & description
                  for (let key in post) {
                    form.append(key, post[key]);
                    //console.log('show the content of keys ', key, post[key]);
                  }
                  // read the image object
                  form.append('image', imageFile);
        
        
                  for (var key of form.entries()) {
                    console.log('Entries ', key[0] + " --> " + key[1]);
                  } */

        console.log('Before put axios urlUpdatePost ', urlUpdatePost + id);
        console.log('ID=', id);
        //const res = await axios.put(urlPutArticle + 'article/' + articleCopy._id, article);

        const res = await axios.put(urlUpdatePost + id, post);
        console.log('Post Title , Description Saved ', res);

        // here you have select an Imagefile  
        //if (post.image.length > 0) {

        console.log('imageFile  exist ?', imageFile);

        console.log('Stringifi ', JSON.stringify(imageFile));

        /*  if imagefile = [ ] object is empty
            but if imagefile = { } object is not empty
        */
        if (JSON.stringify(imageFile) === '{}') {

          (async () => {
            console.log('i have additional an image to save');
            //console.log(urlSavePost);

            /*   console.log('Title', post.title);
              console.log('description', post.description);
              console.log('image', post.image.name); */

            const form = new FormData();

            // only update the image !!!!!
            /* for (let key in post) {
              form.append(key, post[key]);
              console.log('show the content of keys ', key, post[key]);
            } */

            // read the image object
            form.append('image', imageFile);

            try {

              // delete first the old image
              const resdelete = await axios.get(urlDeletePost + id);
              // const resdelete = await axios.post(urlUploadOnlyImage + id);
              console.log('Deleting the old image from backend ...', resdelete);


              /*   for (var key of form.entries()) {
                  console.log('Entries ', key[0] + " --> " + key[1]);
                } */


              /* create a new image  */
              const res = await axios.post(urlUploadOnlyImage + id, form);
              console.log('Post saved with image ', res);

              //setPostIsSet(true);
              //setPostSaved(true);
              /*  const response = await axios.post(urlSavePost, formData, {
                 headers: { "content-Type": "multipart/form-data" },
               }); */

              //setImageSaved(true);

              /*   **
                delete the old image from mongo and backend nodejs server
                ** 
              */



            } catch (error) {
              console.log(error);
            }
          })();  // function autoinvocation 

        }; // end lenght


        /* sweetalert  */
        Swal.fire(
          'Article updated!',
          'success',
          'success'
        );

        //setPostSaved(true);
        //window.location.reload();
        navigate('/home');


      } catch (error) {
        console.error(error);
      }

    })();  // function autoinvocation 

  };



  /*
     ***********************************************
     use here the update function and the verb PUT ! 
     ***********************************************
   */
  function updateFullPost(id, post) {

    /* 
       *************************************************
       here we will update the object post and the image 
       create a PUT verb to store the post object 
       urlBackend: 'http://localhost:3000/api/posts/:id'
       **************************************************
    */

    if (JSON.stringify(imageFile) === '{}') {


      (async () => {

        try {

          console.log('Post object with image', post);

          const form = new FormData();

          // update all fields
          for (let key in post) {
            form.append(key, post[key]);
            console.log('show the content of keys ', key, post[key]);
          }

          // read the image object
          form.append('image', imageFile);

          // show all fields
          for (var key of form.entries()) {
            console.log('Entries ', key[0] + " --> " + key[1]);
          }


          //  urlBackend: 'http://localhost:3000/api/'
          // urlUpdatePost = Global.urlBackend + 'posts/';

          const resFull = await axios.put(urlUpdatePost + id, form);
          console.log('Post Title , Description Saved ', resFull);


          /* sweetalert  */
          Swal.fire(
            'Article updated!',
            'success',
            'success'
          );

          //setPostSaved(true);
          //window.location.reload();
          navigate('/home');


        } catch (error) {
          console.error(error);
        }

      })();  // function autoinvocation 

    } // end if (JSON.stringify(imageFile) === '{}'

    else {
      // i have no image selected ... update only Post (title & description)


      (async () => {

        try {

          console.log('Post object without image');

          //  urlBackend: 'http://localhost:3000/api/'
          // urlUpdatePost = Global.urlBackend + 'posts/';


          const res = await axios.put(urlUpdatePost + id, post);
          console.log('Post Title , Description Saved ', res);



          /* sweetalert  */
          Swal.fire(
            'Article updated!',
            'success',
            'success'
          );

          //setPostSaved(true);
          //window.location.reload();
          navigate('/home');


        } catch (error) {
          console.error(error);
        }

      })();  // function autoinvocation 


    }

  };



  return (

    <div>
      {/* 
      {
        postSaved && (
          <div>
            <Navigate to='/home' />
          </div>
        )
      }
 */}
      {
        cancleAction && (
          <div>
            <Navigate to='/home' />
          </div>
        )
      }


      <div className='text-2xl flex justify-center '>Update post</div>

      <div className="flex justify-center items-center py-4 text-white">

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* ************** TITLE ************** */}
          <div className='mb-4'>
            <label htmlFor="title">Title</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the title" {...register("title")} defaultValue={post.title} />
            <p className="text-sm text-red-500">{errors.title?.message}</p>
          </div>

          {/* ************** DESCRIPTION ************** */}
          <div className='mb-4' >
            <label htmlFor="description">Description</label>
            <textarea className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the description" {...register("description")} defaultValue={post.description} />
            <p className="text-sm text-red-500">{errors.description?.message}</p>
          </div>

          {/* ************** IMAGE **************   defaultValue={post.image}  */}
          {/* {...register("image")} */}
          <div className='mb-4'>
            <label htmlFor='image'>Image</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="file" placeholder="image file" id='image' onChange={getImage} />
          </div>

          {/* ************** SUBMIT ************** */}
          <input className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" type="submit" value="Save" />

          {/* ************** CANCEL ************** */}
          <button className="bg-indigo-600 hover:bg-indigo-500 mx-2 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" onClick={() => {
            setCancleAction(true);
          }}>
            Cancel
          </button>

        </form>

        {/*  or output in another component */}
        {/*   <postList post={posts} /> */}

      </div >
    </div>

  );
}

export default FormUpdatePost;
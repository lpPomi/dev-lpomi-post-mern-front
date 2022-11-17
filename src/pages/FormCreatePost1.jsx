
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import { useState, useEffect } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { useNavigate } from 'react-router';

// to use shema validation from yup. Use { .. } because is an export
import { postSchema } from '../validations/PostValidation';


import Swal from 'sweetalert2';


export const FormCreatePost1 = () => {

  /*     export const ReactForms = () => { */

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

  const [cancleAction, setCancleAction] = useState(false);


  // thios is the object from the image to be uploaded to mongodb
  const [imageFile, setImageFile] = useState([]);


  /* urlBackend: 'http://localhost:3000/api/' */
  var urlSavePost = Global.urlBackend + 'posts';
  //console.log(urlSavePost);


  var num = 0;

  const navigate = useNavigate();

  // include the shema with the resolve function in the form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema),
  });



  // to save the image into the image variable using setImage
  const getImage = (e) => {

    setImageFile(e.target.files[0]);
    //console.log(e.target.files[0]);
  };


  // save all inputs from the form in the data object
  const onSubmit = postObj => {
    // aquivalent to function createPost(postObj) {

    //alert(JSON.stringify(postObj));
    setPost({
      title: postObj.title,
      description: postObj.description,
      // i get ghere only the FileList and not the File Object
      // image: postObj.image[0]
    });


    // console.log('PostObj ', postObj);
    /*  setPostIsSet(true);
     setPostSaved(false); */
    //console.log('postIsSet in Onsubmit', postIsSet);
    savePost(postObj);
    // call the fucntion savepost(post) {

  };

  /* console.log('postIsSet outside Onsubmit', postIsSet);
  console.log('postSaved outside Onsubmit', postSaved);
 */

  /* useEffect(() => {

    postIsSet && postSaved && (
      <div>
        {console.log('In useEffect')}
        {savePost(post)}
        
      </div>
    );

    postSaved && (
      counter()
    );
  }

  );
 */


  /*  const onSubmit = async (data) => {
     const formData = new FormData();
   
     formData.append("image", data.file[0]);
   
     const res = await fetch("http://localhost:5000/upload-file", {
         method: "POST",
         body: formData,
     }).then((res) => res.json());
     alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  }; */


  //console.log('Show post array ', post);
  //console.log('Show Imagefile object ', imageFile);





  function savePost(post) {


    console.log(post.image);

    // here you have select an Imagefile  
    if (post.image.length > 0) {


      (async () => {
        /*  if (post.image !== undefined || post.image !== null) { */


        //console.log('i have an image');

        //console.log(urlSavePost);

        /*   console.log('Title', post.title);
          console.log('description', post.description);
          console.log('image', post.image.name); */

        const form = new FormData();

        // read title & description
        for (let key in post) {
          form.append(key, post[key]);
          //console.log('show the content of keys ', key, post[key]);
        }

        // read the image object
        form.append('image', imageFile);

        try {


          /*  for (var key of form.entries()) {
             console.log('Entries ', key[0] + " --> " + key[1]);
           }
  */
          /*   const res = await axios.post(urlSavePost, form, {
              headers: { "content-Type": "multipart/form-data" },
            });
        */
          /* const response = await axios({
            method: "post",
            url: urlSavePost,
            data: form,
            headers: { "content-Type": "multipart/form-data" },
          }); */
          // '''''''''''''''''''''''''''''''''''''##

          const res = await axios.post(urlSavePost, form);
          //setPostIsSet(true);
          setPostSaved(true);
          /*  const response = await axios.post(urlSavePost, formData, {
             headers: { "content-Type": "multipart/form-data" },
           }); */

          console.log('Post saved with image ', res.data);

          //setImageSaved(true);
        } catch (error) {
          console.log(error);
        }
      })();  // function autoinvocation 
    }


    // here you don't have select an Imagefile  
    else {
      (async () => {

        try {
          // console.log('i do not have an image');
          // save only title & description
          const res = await axios.post(urlSavePost, post);
          console.log('Post Saved without image ', res.data);

          //setPostIsSet(true);
          setPostSaved(true);
        } catch (error) {
          console.error(error);
        }

      })();  // function autoinvocation 
    }

  } // end savePost()




  return (
    <div>

      {/*  {postIsSet && (
        <div>
          {savePost(post)}
          {setPostIsSet(false)}
          {console.log(setPostIsSet)}
        </div>
      )
      } */}


      {
        postSaved && (
          <div>
            <Navigate to='/home' />
          </div>
        )
      }


      {
        cancleAction && (
          <div>
            <Navigate to='/home' />
          </div>
        )
      }





      <div className='text-2xl flex justify-center '>Create post</div>

      <div className="flex justify-center items-center py-4 text-white">
        {/*  <section> */}


        <form onSubmit={handleSubmit(onSubmit)}>

          {/* ************** TITLE ************** */}
          <div className='mb-4'>
            <label htmlFor="title">Title</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the title" {...register("title")} />
            <p className="text-sm text-red-500">{errors.title?.message}</p>
          </div>

          {/* ************** DESCRIPTION ************** */}
          <div className='mb-4' >
            <label htmlFor="description">Description</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the description" {...register("description")} />
            <p className="text-sm text-red-500">{errors.description?.message}</p>
          </div>

          {/* ************** IMAGE ************** onChange={getImage}  */}
          <div className='mb-4'>
            <label htmlFor='image'>Image</label>
            <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="file" placeholder="image file" id='image' {...register("image")} onChange={getImage} />
          </div>

          {/* ************** SUBMIT ************** */}
          <input className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400" type="submit" value="Save"></input>

          {/* ************** CANCEL ************** */}
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

    </div >
  );
}

/* export default FormCreatePost1; */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from 'react';
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

    //const [cancleAction, setCancleAction] = useState(false);

    var urlSavePost = Global.urlBackend + 'posts';
    //console.log(urlSavePost);

    // console.log(Global.urlBackend);
    //var urlBackend = Global.urlBackend;
    /* urlBackend: 'http://localhost:3000/api/' */

    //var urlPostImage = Global.urlUploadImage;
    /* urlUploadImage: 'http://localhost:3000/api/upload-image/' */

    let navigate = useNavigate();

    // include the shema with the resolve function in the form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(postSchema),
    });

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
        savepost(postObj);

    };

    //console.log('Show post array ', post);


    function savepost(post) {

        /* 
           **************************************************************************
           here we will save the object post and the image into the mongo db server 
           create a POST verb to store the post object in mongodb 
           urlBackend: 'http://localhost:3000/api/'
           **************************************************************************
        */

        //  console.log('In function savepost  posts: ', posts);
        //setPostIsSet(false);
        //console.log('In function savepost postIsSet ', postIsSet);

        // save the post in the backend url:     
        /*  Attention: we need to call an autoinvocation function to store the post in mongodb */
        (async () => {
            try {

                // setPostSaved(false);
                // console.log('Post now !!! ');
                const res = await axios.post(urlSavePost, post);

                // console.log('urlSavePost: ', urlSavePost + 'posts');
                console.log(res.data);

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
                /* clear the fields nombre, apellidos, description */
                setTitle('');
                setDescription('');

                /*    navigate('/home'); */
            }
            catch (error) {
                console.error(error);
            }
        })();  // function autoinvocation 

    };


    return (
        <div>




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


            {/*        if only post was saved sussessful then redirect to home */}
            {
                postSaved && (
                    <div>
                        <Navigate to='/home' />
                    </div>
                )
            }







            <div className='text-2xl flex justify-center '>Create post</div>


            <div className="flex justify-center items-center py-4 text-white">
                {/*  <section> */}


                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='mb-4'>
                        <label htmlFor="title">Title</label>
                        <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the title" {...register("title")} />
                        <p className="text-sm text-red-500">{errors.title?.message}</p>
                    </div>


                    <div className='mb-4' >
                        <label htmlFor="description">Description</label>
                        <input className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" type="text" placeholder="set the description" {...register("description")} />
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

/* export default FormCreatePost1; */
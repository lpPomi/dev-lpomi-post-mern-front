
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import * as yup from "yup";


import { useState, useEffect } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

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



    // include the shema with the resolve function in the form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(postSchema),
    });

    // save all inputs from the form in the data object
    const onSubmit = (data) => {
        console.log(data);
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
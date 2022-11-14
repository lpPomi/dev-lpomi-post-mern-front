import { Route, Routes } from 'react-router-dom';

// import the pages
import FormCreatePost from '../pages/FormCreatePost';
import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';


function Router() {
    return (

        /* className="bg-neutral-600 min-h-screen flex items-center"
        className="px-10 container m-auto py-4 bg-blue-300" */

        <div className="bg-neutral-600 min-h-screen flex ">
            <div className="px-10 container mx-20 my-5 mr-20 py-4 bg-blue-300">

                {/*    <Header /> */}

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='home' element={<Home />} />
                    <Route path='create' element={<FormCreatePost />} />
                    {/* Route not found 404. Always put it on the end of all router */}
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>

                {/* to show correctly the footer */}
                {/*        <div className='clearfix'></div>
            <Footer /> */}
            </div >
        </div >
    );
}

export default Router;
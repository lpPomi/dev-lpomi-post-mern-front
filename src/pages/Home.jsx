
import PostList from '../components/PostList';
import { ReactForms } from '../pages/ReactForms';

import { FormCreatePost1 } from '../pages/FormCreatePost1';


import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            {/* link to the component FormCreatePost */}
            <nav>
                <Link to='/create'>create post</Link>
            </nav>

            {/*   <ReactForms /> */}

            {/*  <FormCreatePost1 /> */}

            <PostList />
        </div>
    );
}

export default Home;
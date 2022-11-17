
import PostList from '../components/PostList';
import Header from '../components/Header';

import { ReactForms } from '../pages/ReactForms';

import { FormCreatePost1 } from '../pages/FormCreatePost1';


import { Link } from "react-router-dom";

function Home() {

  return (
    <div>
      <Header />
      <PostList />
    </div>
  );
}

export default Home;



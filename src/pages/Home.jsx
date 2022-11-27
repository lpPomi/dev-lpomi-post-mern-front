
import PostList from '../components/PostList';
import Header from '../components/Header';

import { ReactForms } from '../pages/ReactForms';

import { FormCreatePost1 } from '../pages/FormCreatePost1';
import Parent from '../components/Parent';

import { Link } from "react-router-dom";

import useEffect from 'react';

function Home() {



  return (
    <div>
      <Header />
      {/*  <Parent /> */}
      <PostList />
    </div>
  );
}

export default Home;



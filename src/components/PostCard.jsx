import { Link } from "react-router-dom";


// ***********************
// Show all Posts in Cards 
// ***********************

/* export function PostCard({ post }) { */
export const PostCard = ({ post }) => {


  return (

    <div className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer">

      <div className="px-4 py-7">

        <div className='flex justify-between'>
          <div className="text-2xl">
            {post.title}
          </div>

          {/*  link to the component PostDetails  */}
          <nav>
            <Link to={'/details/' + post._id} className="bg bg-orange-500 text-sm px-2 py-1 rounded-sm">Details</Link>
          </nav>
        </div>

        <div className="text-1xl">
          {post.description}
        </div>

      </div>
    </div>
  );
};
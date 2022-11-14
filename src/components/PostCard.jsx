
/* export function PostCard({ post }) { */

export const PostCard = ({ post }) => {

    //console.log('In PostCard ', post);

    return (
        <div className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer">
            <div className="px-4 py-7">

                <div className="text-2xl">
                    {post.title}
                </div>

                <div className="text-1xl">
                    {post.description}
                </div>
            </div>

        </div>
    );
}


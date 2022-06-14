import React from "react";

const index = () => {
  return <div>index</div>;
};

export default index;

// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable react/function-component-definition */
// import { LikeOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import useDidMount from "hooks/useDidMount";
// import { likePost } from "services/api";

// interface IProps {
//   postID: string;
//   isLiked: boolean;
//   likeCallback: (postID: string, state: boolean, newLikeCount: number) => void;
// }

// const LikeButton: React.FC<IProps> = (props) => {
//   const [isLiked, setIsLiked] = useState(props.isLiked);
//   const [isLoading, setLoading] = useState(false);
//   const didMount = useDidMount();

//   useEffect(() => {
//     setIsLiked(props.isLiked);
//   }, [props.isLiked]);

//   const dispatchLike = async () => {
//     if (isLoading) return;

//     try {
//       setLoading(true);

//       const { state, likesCount } = await likePost(props.postID);
//       if (didMount) {
//         setLoading(false);
//         //    @ts-ignore
//         setIsLiked(state);
//       }
//       //    @ts-ignore

//       props.likeCallback(props.postID, state, likesCount);
//     } catch (e) {
//       didMount && setLoading(false);
//       console.log(e);
//     }
//   };

//   return (
//     <span
//       className={` px-1 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 cursor-pointer text-l w-2/4  ${
//         isLiked
//           ? "text-indigo-700 font-bold dark:text-indigo-400 dark:hover:bg-indigo-1100"
//           : "text-gray-700 dark:hover:bg-indigo-1100 dark:hover:text-white  dark:bg-indigo-1000 hover:text-gray-800 dark:text-gray-400"
//       } ${isLoading && "opacity-50"}`}
//       onClick={dispatchLike}
//     >
//       <LikeOutlined />
//       &nbsp;
//       {isLiked ? "Unlike" : "Like"}
//     </span>
//   );
// };

// export default LikeButton;

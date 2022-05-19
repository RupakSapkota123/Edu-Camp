/* eslint-disable @typescript-eslint/no-shadow */
import axios from "axios";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updatePostLikes } from "redux/actions/feedActions";
import { getNewsFeed } from "services/api";
import { IPost, IRootReducer } from "types/types";
import PostItem from "./PostItem";

function New() {
  const dispatch = useDispatch();
  const state = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (state: IRootReducer) => ({
      newsFeed: state.newsFeed,
      auth: state.auth,
      error: state.error.newsFeedError,
      isLoadingFeed: state.loading.isLoadingFeed,
      isLoadingCreatePost: state.loading.isLoadingCreatePost,
    }),
    shallowEqual,
  );

  React.useEffect(() => {
    getNewsFeed()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("newsFeed", state.newsFeed);
  const likeCallback = (
    postID: string,
    state: boolean,
    newLikeCount: number,
  ) => {
    dispatch(updatePostLikes(postID, state, newLikeCount));
  };
  return (
    <div>
      {state.newsFeed.posts.map((post: IPost) => (
        <PostItem key={post.id} post={post} likeCallback={likeCallback} />
      ))}
    </div>
  );
}

export default New;

/* eslint-disable react/function-component-definition */
import axios from "axios";
import LikeButton from "components/main/likeButton";
import React from "react";
import { getNewsFeed } from "services/api";
import { IPost } from "types/types";

interface IProps {
  post: IPost;
  likeCallback: (postID: string, state: boolean, newLikeCount: number) => void;
}

const PostItem: React.FC<IProps> = ({ likeCallback, post }) => {
  const displayLikeMetric = (likesCount: number, isLiked: boolean) => {
    const like = likesCount > 1 ? "like" : "likes";
    const likeMinusSelf = likesCount - 1 > 1 ? "like" : "likes";
    const people = likesCount > 1 ? "people" : "person";
    const peopleMinusSelf = likesCount - 1 > 1 ? "people" : "person";

    if (isLiked && likesCount <= 1) {
      return "You like this.";
    }
    if (isLiked && likesCount > 1) {
      return `You and ${
        likesCount - 1
      } other ${peopleMinusSelf} ${likeMinusSelf} this.`;
    }
    return `${likesCount} ${people} ${like} this.`;
  };

  return (
    <div>
      hello hii byee
      {displayLikeMetric(post.likesCount, post.isLiked)}
      <LikeButton
        postID={post.id}
        isLiked={post.isLiked}
        likeCallback={likeCallback}
      />
    </div>
  );
};

export default PostItem;

import { call, put } from "redux-saga/effects";
import { CREATE_POST_START, GET_FEED_START } from "constants/actionType";
import { getNewsFeed } from "services/api";
import { IPost } from "types/types";
import { setNewsFeedErrorMessage } from "../actions/errorActions";
import { getNewsFeedSuccess } from "../actions/feedActions";
import { isCreatingPost, isGettingFeed } from "../actions/loadingActions";

interface INewsFeedSaga {
  type: string;
  payload: any;
}

function* newsFeedSaga({ type, payload }: INewsFeedSaga) {
  switch (type) {
    case GET_FEED_START:
      try {
        console.log("hy");

        yield put(isGettingFeed(true));
        yield put(setNewsFeedErrorMessage(null));
        console.log("payload=====");
        const posts: IPost[] = yield call(getNewsFeed, payload);
        console.log("posts=====", posts);
        yield put(isGettingFeed(false));
        yield put(getNewsFeedSuccess(posts));
      } catch (e: any) {
        console.log(e);
        yield put(isGettingFeed(false));
        yield put(setNewsFeedErrorMessage(e));
      }

      break;
    default:
      throw new Error("Unexpected action type.");
  }
}

export default newsFeedSaga;

import { call, put } from "redux-saga/effects";
import { GET_USER_START } from "constants/actionType";
import { fetchUser } from "services/api";
import { IProfile } from "types/types";
import { setProfileErrorMessage } from "../actions/errorActions";
import { isGettingUser } from "../actions/loadingActions";
import { getUserSuccess } from "../actions/profileActions";

interface IProfileSaga {
  type: string;
  payload: any;
}

fetchUser("627bfe723f0ca49141d66b66")
  .then((data: any) => {
    console.log("data=====", data);
  })
  .catch((e: any) => {
    console.log("error=====", e);
  });

function* profileSaga({ type, payload }: IProfileSaga) {
  switch (type) {
    case GET_USER_START:
      try {
        yield put(isGettingUser(true));
        const user: IProfile = yield call(fetchUser, payload);
        console.log("sagaUser=====", user);
        yield put(isGettingUser(false));
        yield put(setProfileErrorMessage(null));
        yield put(getUserSuccess(user));
      } catch (e: any) {
        yield put(setProfileErrorMessage(e));
        yield put(isGettingUser(false));
        console.log(e);
      }
      break;
    default:
      throw new Error(`Unexpected action type ${type}.`);
  }
}

export default profileSaga;

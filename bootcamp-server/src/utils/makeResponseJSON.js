import moment from 'moment';

const initState = {
  data: null,
  success: false,
  error: null,
  timeStamp: null,
};

const makeResponseJSON = (data, success = true) => {
  return {
    ...initState,
    data,
    success,
    timeStamp: moment().format('YYYY-MM-DD HH:mm A'),
  };
};

export default makeResponseJSON;

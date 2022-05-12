import moment from 'moment';

const initState = {
  data: null,
  success: false,
  error: null,
  timeStamp: null,
  status_code: 404,
};

const makeResponseJSON = (data, success) => {
  return {
    ...initState,
    data,
    success,
    timeStamp: moment().format('YYYY-MM-DD HH:mm A'),
  };
};

export default makeResponseJSON;

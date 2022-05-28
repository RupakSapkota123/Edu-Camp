import moment from 'moment';

const initState = {
  data: null,
  success: false,
  error: null,
  timeStamp: null,
};

const makeResponseJSON = (data, count, success = true) => {
  return {
    ...initState,
    data,
    count: count || data.length,
    success,
    timeStamp: moment().format('YYYY-MM-DD HH:mm A'),
  };
};

export default makeResponseJSON;

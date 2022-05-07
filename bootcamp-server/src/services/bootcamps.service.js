const getAllBootcamps = async (body) => {
  try {
    return await body;
  } catch (err) {
    return err;
  }
};

const getSingleBootcamp = async (id) => {
  try {
    const message = `get single bootcamp ${id}`;
    return message;
  } catch (err) {
    return err;
  }
};

const createBootcamp = async (body) => {
  try {
    return await body;
  } catch (err) {
    return err;
  }
};

const updateBootcampById = async (id) => {
  try {
    const message = `update bootcamp ${id}`;
    return message;
  } catch (err) {
    return err;
  }
};

const deleteBootcampById = async (id) => {
  try {
    const message = `delete bootcamp ${id}`;
    return message;
  } catch (err) {
    return err;
  }
};

export default {
  getAllBootcamps,
  getSingleBootcamp,
  createBootcamp,
  updateBootcampById,
  deleteBootcampById,
};

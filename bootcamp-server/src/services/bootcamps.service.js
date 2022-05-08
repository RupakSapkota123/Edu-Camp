import { Bootcamp } from '../schema/index.js';

const getAllBootcamps = async (body) => {
  try {
    const bootcamps = await Bootcamp.find({ body });
    return bootcamps;
  } catch (err) {
    return err;
  }
};

const getSingleBootcamp = async (id) => {
  const bootcamp = await Bootcamp.findById(id);

  //* check if bootcamp exists
  if (!bootcamp || bootcamp === null) {
    throw new Error('Bootcamp not found');
  }

  return bootcamp;
};

const createBootcamp = async (body) => {
  const bootcamp = await Bootcamp.create(body);
  return bootcamp;
};

const updateBootcampById = async (id, bootcampBody) => {
  const bootcamp = await getSingleBootcamp(id);
  if (!bootcamp || bootcamp === null) {
    throw new Error('Bootcamp not found');
  }
  if (await Bootcamp.findByName(bootcampBody.name)) {
    throw new Error('Bootcamp name is taken');
  }
  Object.assign(bootcamp, bootcampBody);
  await bootcamp.save();
  return bootcamp;
};

const deleteBootcampById = async (id) => {
  const bootcamp = await getSingleBootcamp(id);
  if (!bootcamp || bootcamp === null) {
    throw new Error('Bootcamp not found');
  }
  await bootcamp.remove();
  return bootcamp;
};

export default {
  getAllBootcamps,
  getSingleBootcamp,
  createBootcamp,
  updateBootcampById,
  deleteBootcampById,
};

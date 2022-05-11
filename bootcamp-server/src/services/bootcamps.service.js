import { Bootcamp } from '../schema/index.js';

/**
 * @desc: get all bootcamps
 * @param {Object} body
 * @returns {Promise<Bootcamp>}
 */
const getAllBootcamps = async (body) => {
  try {
    const bootcamps = await Bootcamp.find({
      body,
    });
    return bootcamps;
  } catch (err) {
    return err;
  }
};

/**
 * @desc: get single bootcamps
 * @param {ObjectId} id
 * @returns {Promise<Bootcamp>}
 */
const getSingleBootcamp = async (id) => {
  const bootcamp = await Bootcamp.findById(id);

  //* check if bootcamp exists
  if (!bootcamp || bootcamp === null) {
    throw new Error('Bootcamp not found');
  }

  return bootcamp;
};

/**
 * @desc: Create New Bootcamps
 * @param {Object} body
 * @returns {Promise<Bootcamp>}
 */
const createBootcamp = async (body) => {
  const bootcamp = await Bootcamp.create(body);
  return bootcamp;
};

/**
 * @desc: Update Bootcamp
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Bootcamp>}
 */
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

/**
 * @desc: Delete Bootcamp
 * @param {ObjectId} id
 * @returns {Promise<Bootcamp>}
 */
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

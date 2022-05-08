import httpStatus from 'http-status';

import { bootcampsServices } from '../services/index.js';
import { ApiError, CatchAsync } from '../utils/index.js';

/*
 * @desc: get all bootcamps
 * @route: GET /api/v1/bootcamps
 * @access: public
 * @return: json
 * @catch: ApiError
 */
const getAllBootcamps = CatchAsync(async (req, res) => {
  try {
    const bootcamps = await bootcampsServices.getAllBootcamps(req.body);
    res.status(200).json({ bootcamps, success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/*
 * @desc: get single bootcamps
 * @route: GET /api/v1/bootcamps/:id
 * @access: public
 * @return: json
 * @catch: ApiError
 */
const getSingleBootcamp = CatchAsync(async (req, res) => {
  try {
    const { id } = await req.params;
    const bootcamps = await bootcampsServices.getSingleBootcamp(id);
    res.status(200).json({ bootcamps, success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/*
 * @desc: get single bootcamps
 * @route: GET /api/v1/bootcamps/:id
 * @access: public
 * @return: json
 * @catch: ApiError
 */

/*
 * @desc: Create New Bootcamps
 * @route: POST /api/v1/bootcamps
 * @access: private
 * @return: json
 * @catch: ApiError
 */
const createBootcamp = CatchAsync(async (req, res) => {
  try {
    const bootcamps = await bootcampsServices.createBootcamp(req.body);
    res.status(httpStatus.CREATED, 'Bootcamp created successfully').json({ bootcamps, success: true });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
  }
});

/*
 * @desc: Update Bootcamps
 * @route: PUT /api/v1/bootcamps/:id
 * @access: private
 * @return: json
 * @catch: ApiError
 */
const updateBootcampById = CatchAsync(async (req, res) => {
  try {
    const { id } = await req.params;
    const bootcamps = await bootcampsServices.updateBootcampById(id, req.body);
    res.status(200).json({ bootcamps, success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/*
 * @desc: Delete Bootcamp
 * @route: Delete /api/v1/bootcamps/:id
 * @access: private
 * @return: json
 * @catch: ApiError
 */
const DeleteBootcampById = CatchAsync(async (req, res) => {
  try {
    const { id } = await req.params;
    const bootcamps = await bootcampsServices.deleteBootcampById(id);
    res.status(200).json({ bootcamps, success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default {
  getAllBootcamps,
  getSingleBootcamp,
  createBootcamp,
  updateBootcampById,
  DeleteBootcampById,
};

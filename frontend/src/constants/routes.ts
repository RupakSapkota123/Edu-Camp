//* AUTH
export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const FORGETPASSWORD = "auth/register";
export const RESETPASSWORD = "auth/resetpassword/:id";
export const UPDATEUSERDETAILS = "auth/updatedetails";
export const UPDATEPASSWORD = "auth/updatepassword";
export const LOGOUT = "auth/logout";
export const LOGGEDINUSER = "auth/me";

//* bootcamps
export const GETBOOTCAMPS = "bootcamps";
export const GETSINGLEBOOTCAMPS = "bootcamps/:id";
export const CREATEBOOTCAMPS = "bootcamps";
export const UPDATEBOOTCAMPS = "bootcamps/:id";
export const DELETEBOOTCAMPS = "bootcamps/:id";
export const GETBOOTCAMPBYDISTANCE = "bootcamps/radius/:zipcode/:miles";
export const UPLOADPHOTO = "bootcamps/:id/photo";

//* Courses
export const GETCOURSES = "courses";
export const GETCOURSESFORBOOTCAMPS = "bootcamps/:id/courses";
export const GETSINGLECOURSES = "courses/:id";
export const CREATECOURSES = "courses";
export const UPDATECOURSES = "courses/:id";
export const DELETECOURSES = "courses/:id";

//* Reviews
export const GETREVIEWS = "reviews";
export const GETREVIEWSFORBOOTCAMPS = "reviews/:id";
export const CREATEREVIEWS = "bootcamps/:id/reviews";
export const UPDATEREVIEWS = "reviews/:id";
export const GETSINGLEREVIEW = "reviews/:id";
export const DELETEREVIEWS = "review/:id";

//* Users
export const GETUSER = "users";
export const GETSINGLEUSER = "users/:id";
export const CREATEUSER = "users";
export const UPDATEUSER = "users/:id";
export const DELETEUSER = "users/:id";

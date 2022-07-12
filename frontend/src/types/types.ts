export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IRootReducer {
  auth: IUser;
  error: IError;
  loading: TLoading;
  settings: ISettingsState;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
}

export interface IErrorState {
  authError: IError | null;
  profileError: IError | null;
  newsFeedError: IError | null;
}

export interface TLoading {
  isLoadingAuth: boolean;
  isLoadingCreatePost: boolean;
  isLoadingGetUser: boolean;
  isLoadingFeed: boolean;
}

export interface IError {
  status_code: number;
  data: any;
  error: {
    message: string;
    title: string;
    type: string;
  };
  success: boolean;
  timestamp: string | Date;
  [prop: string]: any;
}

export interface IUser {
  id: string;
  email: string;
  [prop: string]: any;
}

export interface IBootcamps {
  id: string;
  name: string;
  description: string;
  website: string;
  location: {
    coordinates: string;
    city: string;
    country: string;
    zipcode: string;
    state: string;
    street: string;
  };
  phone: number;
  email: string;
  address: string;
  careers: string[];
  averageRating: number;
  averageCost: number;
  photo: string;
  housing: boolean;
  jobAssistance: boolean;
  jobGuarantee: boolean;
  acceptGi: boolean;
}

export interface IReviews {
  id: string;
  title: string;
  text: string;
  rating: number;
}

export interface ICourses {
  id: string;
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: string;
  scholarshipAvailable: boolean;
}

export interface ISettingsState {
  theme: "light" | "dark";
}

export interface IFetchParams {
  offset?: number;
  limit?: number;
  skip?: number;
  q?: string;
  type?: string;
  sort?: "asc" | "desc";
}

export interface ICreateBootcamp {
  description: string;
  photos?: [];
}

export interface IImage {
  id: string;
  url: string;
  file: File | null;
}

export interface IFileHandler<T> {
  imageFile: T;
  setImageFile: React.Dispatch<React.SetStateAction<T>>;
  isFileLoading: boolean;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    callback?: (file?: IImage) => void,
  ) => void;
  removeImage: (id: string) => void;
  clearFiles: () => void;
}

import * as yup from 'yup';

// Create validation schema
export const postSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  // image: Yup.mixed().required("The image required"),
});

import * as yup from 'yup';

// Create validation schema
export const reactFormSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().min(18).required(),
  password: yup.string().min(4).max(20).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords Don't Match")
    .required(),
});

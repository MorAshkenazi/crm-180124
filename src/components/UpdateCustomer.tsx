import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Customer } from "../interfaces/Customer";
import { addCustomer } from "../services/customersService";
interface UpdateCustomerProps {}

const UpdateCustomer: FunctionComponent<UpdateCustomerProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required().min(2),
      lastName: yup.string().required().min(2),
      email: yup.string().email().required(),
      phone: yup
        .string()
        .required()
        .matches(/^05[0-9]{1}-?[0-9]{7}$/),
    }),
    onSubmit: (values) => {
      // addCustomer(values as Customer)
      //   .then(() => navigate("/"))
      //   .catch((err) => console.log(err));
    },
  });
  return <>Update Customer</>;
};

export default UpdateCustomer;

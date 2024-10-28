import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addCustomer } from "../services/customersService";
import Customers from "./Customers";
import { Customer } from "../interfaces/Customer";
import { log } from "console";

interface AddCustomerProps {}

const AddCustomer: FunctionComponent<AddCustomerProps> = () => {
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
      addCustomer(values as Customer)
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <h1 className="display-1 text-start">
        <i className="fa-solid fa-address-card"></i>CRM
      </h1>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h5 className="display-5">New Customer</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="John"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">First Name</label>
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-danger">{formik.errors.firstName}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Doe"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Last Name</label>
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-danger">{formik.errors.lastName}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="john@doe.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="phone"
              className="form-control"
              id="phone"
              placeholder="052-8536253"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>
          <button
            className="btn btn-success w-100 mb-3"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Add
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;

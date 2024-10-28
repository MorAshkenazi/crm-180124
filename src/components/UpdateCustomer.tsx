import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Customer } from "../interfaces/Customer";
import {
  addCustomer,
  getCustomerById,
  updateCustomer,
} from "../services/customersService";
interface UpdateCustomerProps {}

const UpdateCustomer: FunctionComponent<UpdateCustomerProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  let { id } = useParams();
  let [customer, setCustomer] = useState<Customer>({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    getCustomerById(id as string)
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    },
    enableReinitialize: true,
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
      updateCustomer(id as string, values as Customer)
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <h1 className="display-1 text-start">
        <i className="fa-solid fa-address-card"></i>CRM
      </h1>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h5 className="display-5">Update Customer</h5>
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
            className="btn btn-warning w-100 mb-3"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Update
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCustomer;

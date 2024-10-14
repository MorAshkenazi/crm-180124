import { FunctionComponent, useEffect, useState } from "react";
import { Customer } from "../interfaces/Customer";
import {
  addCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../services/customersService";

interface CustomersProps {}

const Customers: FunctionComponent<CustomersProps> = () => {
  let [customers, setCustomers] = useState<Customer[]>([]);
  let [customersChanged, setCustomersChanged] = useState<boolean>(false);

  useEffect(() => {
    getAllCustomers()
      .then((customers) => setCustomers(customers.data))
      .catch((err) => console.log(err));
  }, [customersChanged]);

  return (
    <>
      <h1 className="display-1 text-start">
        <i className="fa-solid fa-address-card"></i>CRM
      </h1>
      <div className="container">
        <button className="btn btn-success">Add Customer</button>
        {customers.length ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="col-2">Id</th>
                <th className="col-2">First Name</th>
                <th className="col-2">Last Name</th>
                <th className="col-2">Phone</th>
                <th className="col-2">Email</th>
                <th className="col-1"></th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer: Customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>
                    <i className="fa-solid fa-user-pen text-warning"></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-user-minus text-danger"
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          deleteCustomer(customer.id as string)
                            .then(() => {
                              setCustomersChanged(!customersChanged);
                              addCustomer({
                                firstName: "Margol",
                                lastName: "Bitter",
                                email: "margol@avi.com",
                                phone: "0526325693",
                              });
                            })
                            .catch((err) => console.log(err));
                        }
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers</p>
        )}
      </div>
    </>
  );
};

export default Customers;

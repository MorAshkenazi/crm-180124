import axios from "axios";
import { Customer } from "../interfaces/Customer";

const api: string = "http://localhost:8000/customers";

// CRUD

// get all customers from db
export function getAllCustomers() {
  return axios.get(api);
}

// get a specific customer from db
export function getCustomerById(customerId: string) {
  return axios.get(`${api}/${customerId}`);
}

// add new customer to db
export function addCustomer(newCustomer: Customer) {
  return axios.post(api, newCustomer);
}

// update a specific customer from db
export function updateCustomer(customerId: string, updatedCustomer: Customer) {
  return axios.put(`${api}/${customerId}`, updatedCustomer);
}

// delete a specific customer from db
export function deleteCustomer(customerId: string) {
  return axios.delete(`${api}/${customerId}`);
}

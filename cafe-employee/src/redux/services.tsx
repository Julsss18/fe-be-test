import { Cafe, Employee } from "./types";

const BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export const addCafe = async (payload: any): Promise<any> => {
  const formData = new FormData();

  formData.append("form", JSON.stringify(payload));
  formData.append("file", payload.logo[0].originFileObj);
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  await fetch(`${BASE_URL}/cafes`, requestOptions).then((res) => res);
};

export const deleteCafe = async (payload: any): Promise<any> => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: payload }),
  };
  await fetch(`${BASE_URL}/cafes`, requestOptions);
};

export const updateCafe = async (payload: any): Promise<any> => {
  const formData = new FormData();

  if (payload.logo[0].originFileObj) {
    formData.append("file", payload.logo[0].originFileObj);
  }

  formData.append("form", JSON.stringify(payload));
  const requestOptions = {
    method: "PUT",
    body: formData,
  };
  await fetch(`${BASE_URL}/cafes/${payload.id}`, requestOptions).then(
    (res) => res
  );
};

export const getCafe = async (): Promise<Cafe[]> =>
  await fetch(`${BASE_URL}/cafes`).then((res) => res.json());

export const getCafeByLocation = async (action: any): Promise<Cafe[]> =>
  await fetch(`${BASE_URL}/cafes?location=${action.payload}`).then((res) =>
    res.json()
  );

export const getEmployees = async (): Promise<Employee[]> =>
  await fetch(`${BASE_URL}/employees`).then((res) => res.json());

export const getEmployeesByCafeName = async (
  action: any
): Promise<Employee[]> =>
  await fetch(`${BASE_URL}/employees?cafe=${action.payload}`).then((res) =>
    res.json()
  );

export const updateEmployee = async (action: any): Promise<any> => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: action.payload,
  };
  await fetch(`${BASE_URL}/employee`, requestOptions).then((res) => res.json());
};

export const addEmployee = async (action: any): Promise<any> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: action.payload,
  };
  await fetch(`${BASE_URL}/employee`, requestOptions).then((res) => res.json());
};

export const deleteEmployee = async (payload: any): Promise<any> => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: payload }),
  };
  await fetch(`${BASE_URL}/employee`, requestOptions);
};

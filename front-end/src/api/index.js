import { axiosInstance } from './axios';

const apiLogin = async (email, password) => {
  const url = '/login';
  return await axiosInstance.post(url, { email, password });
};

const apiGetAllMedicines = async () => {
  const url = '/medicines';
  return await axiosInstance.get(url);
};

const apiPostBill = async (patient, medicines, description) => {
  const url = '/bills';
  return await axiosInstance.post(url, { patient, medicines, description });
};

const apiGetBills = async () => {
  const url = '/bills';
  return await axiosInstance.get(url);
};

const apiGetMedicineTypes = async () => {
  const url = '/medicine-types';
  return await axiosInstance.get(url);
};

const apiGetMedicinesByType = async (id) => {
  const url = '/medicines/type/' + id;
  return await axiosInstance.get(url);
};

const apiPostMedicine = async (
  id,
  name,
  unit,
  price,
  amountPerDay,
  usage,
  description,
  medicineTypeId
) => {
  const url = '/medicines/';
  return await axiosInstance.post(url, {
    id,
    name,
    unit,
    price,
    amountPerDay,
    usage,
    description,
    type: medicineTypeId,
  });
};

const apiPutMedicine = async (
  id,
  name,
  unit,
  price,
  amountPerDay,
  usage,
  description,
  medicineTypeId
) => {
  const url = '/medicines/' + id;
  return await axiosInstance.put(url, {
    name,
    unit,
    price,
    amountPerDay,
    usage,
    description,
    type: medicineTypeId,
  });
};

const apiDeleteMedicine = async (id) => {
  const url = '/medicines/' + id;
  return await axiosInstance.delete(url);
};

export {
  apiLogin,
  apiGetAllMedicines,
  apiPostBill,
  apiGetBills,
  apiGetMedicineTypes,
  apiGetMedicinesByType,
  apiPostMedicine,
  apiPutMedicine,
  apiDeleteMedicine,
};

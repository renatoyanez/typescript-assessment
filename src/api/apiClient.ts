import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const BASE_URL = window?.env?.REACT_APP_FAKEAPI_API_URL || "https://fakerapi.it/api/v2/custom?_quantity=10&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text"

const apiClient = (token: string | null = null): AxiosInstance => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    : {
        "Content-Type": "multipart/form-data",
      };

  const client = axios.create({
    baseURL: BASE_URL,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

// Define common API methods
const apiGet = (url: string, config = {}) => {
  return apiClient().get(url, config);
};

const apiDelete = (url: string, config = {}) => {
  return apiClient().delete(url, config);
};

const apiPut = (url: string, data = {}, config = {}) => {
  return apiClient().put(url, data, config);
};

const apiPost = (url: string, data = {}, config = {}) => {
  return apiClient().post(url, data, config);
};

// Export API methods
export { apiGet, apiDelete, apiPut, apiPost };

// SIMPLER WAY:
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     // Other headers like authorization token
//   },
// });

// // Define common API methods
// const _get = (url, config = {}) => {
//   return apiClient.get(url, config);
// };

// const _delete = (url, config = {}) => {
//   return apiClient.delete(url, config);
// };

// const _put = (url, data = {}, config = {}) => {
//   return apiClient.put(url, data, config);
// };

// const _post = (url, data = {}, config = {}) => {
//   return apiClient.post(url, data, config);
// };

// // Export API methods
// export { _get, _delete, _put, _post };
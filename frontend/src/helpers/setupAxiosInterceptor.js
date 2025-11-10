import { store } from '../store';

const setupAxiosInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth?.token;

      console.log(token)

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setupAxiosInterceptor;

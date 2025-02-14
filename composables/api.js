import axios from "axios";

export const useApi = () => {
  const config = useRuntimeConfig();

  const fetchFeaturedLetters = () => {
    return axios.get(`${config.public.apiUrl}/letters`);
  }

  const fetchLetter = (id) => {
    return axios.get(`${config.public.apiUrl}/letters/${id}`)
  };

  const sendLetter = (payload) => {
    return axios.post(`${config.public.apiUrl}/send/letters`, payload);
  };

  return {
    fetchFeaturedLetters,
    fetchLetter,
    sendLetter
  };
};
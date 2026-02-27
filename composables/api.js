export const useApi = () => {
  const config = useRuntimeConfig();

  const fetchFeaturedLetters = () => {
    return $fetch(`${config.public.apiUrl}/letters`);
  };

  const fetchLetter = (id) => {
    return $fetch(`${config.public.apiUrl}/letters/${id}`);
  };

  const sendLetter = (payload) => {
    return $fetch(`${config.public.apiUrl}/send/letters`, {
      method: "POST",
      body: payload,
    });
  };

  return {
    fetchFeaturedLetters,
    fetchLetter,
    sendLetter,
  };
};

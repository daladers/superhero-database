export const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return "An unexpected error occurred. Please try again.";
};

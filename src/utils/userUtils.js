// utils/userUtils.js
export const getUserInfo = (userData) => {
    const { firstName, lastName, photoUrl } = userData;
    return { firstName, lastName, photoUrl };
  };
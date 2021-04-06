export const getURLSearchParams = ({ ...inputParams }) => {
  const params = new URLSearchParams({ ...inputParams });
  const deleteKeys = [];

  params.forEach((val, key) => {
    if (val === 'undefined') {
      deleteKeys.push(key);
    }
  });

  deleteKeys.forEach(each => {
    params.delete(each);
  });

  return params.toString();
};

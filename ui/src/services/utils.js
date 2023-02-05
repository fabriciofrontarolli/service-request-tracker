export const normalizePayload = (formData) => {
  // remove null values from payload
  Object.keys(formData).forEach(function(key) {
    if (formData[key] === null || formData[key] === undefined || formData[key] === '') {
        delete formData[key];
    }
  });
};

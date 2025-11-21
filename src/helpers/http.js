export const responseStatusError = (res, code, text) => {
  return res.status(code).json({
    errorMessage: text,
  });
};

export const responseStatusSuccess = (res, code, text) => {
  return res.status(code).json(text);
};

export const columnsTableUsers = [
  "first_name",
  "last_name",
  "email",
  "password",
];

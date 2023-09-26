const HTTP_STATUS = {
  CODE: {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHENTICATED: 403,
  },
  MESSAGE: {
    SUCCESS: "Success",
    NOT_FOUND: "Not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
  },
};

const ROLE = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
  CUSTOMER: "customer",
};

export { HTTP_STATUS, ROLE };

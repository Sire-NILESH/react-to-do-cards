import { globalErrorActions } from "../store/global-error-slice";
import { useDispatch } from "react-redux";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const useSetGlobalError = (message, statusCode) => {
  const dispatch = useDispatch();

  dispatch(
    globalErrorActions.setGlobalError({
      statusCode: 400,
      message: "Failed to add task",
    })
  );
};

export default AppError;

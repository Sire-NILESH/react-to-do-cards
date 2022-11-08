import React, { useState } from "react";
import CardModal from "./CardModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { globalErrorActions } from "../store/global-error-slice";

const ErrorModal = (props) => {
  const errorObj = props.error;
  // const errorObj = useSelector((state) => state.globalError);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const closeHandler = () => {
    dispatch(globalErrorActions.resetGlobalError());
    if (isOpen) closeModalHandler();
  };

  return (
    <>
      {errorObj && (
        <CardModal
          title={`Error ${errorObj.statusCode}`}
          openHandler={openModalHandler}
          closeHandler={closeHandler}
          isOpen={isOpen}
          variant="short"
        >
          <div className="space-y-8">
            <p className="border-l-8 border-red-600 p-4 text-2xl font-semibold text-slate-500 dark:text-slate-300">
              We've encountered an error performing that action.
            </p>
            <p className="text-base text-slate-400">{errorObj.message}</p>
            <button
              onClick={closeHandler}
              className="w-full rounded-full bg-red-500 py-2 text-center text-base uppercase tracking-widest text-white transition-colors duration-300 ease-in-out hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </CardModal>
      )}
    </>
  );
};

export default ErrorModal;

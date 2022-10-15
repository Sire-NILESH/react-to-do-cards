import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function CardModal(props) {
  return (
    <div>
      {/* Modal */}
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={props.closeHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <div className="fixed inset-0 bg-gray-300/10 backdrop-blur-md" /> */}
            <div className="fixed inset-0  bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`absolute top-[16%] left-1/2  w-[90vw] -translate-x-1/2 transform sm:w-[32rem] md:w-[36rem] ${
                    props.variant && props.variant === "short"
                      ? ""
                      : "min-h-[48rem]"
                  } z-40 flex flex-col gap-8 overflow-auto  rounded-3xl border-t-4 border-l-4  border-[#fdfbfb]  bg-[#f2f2ff] px-6 py-10 shadow-md dark:border-none dark:bg-gray-800 md:p-12`}
                >
                  <Dialog.Title as="div">
                    <div className="flex justify-between">
                      <h2 className="w-[65%] text-2xl font-semibold text-slate-600 dark:text-slate-300">
                        {/* {card && card.title} */}
                        {props.title}
                      </h2>
                      <button
                        className="shadow-btn flex h-8 w-8 items-center justify-center rounded-full border-t-2 border-l-2 border-[#fdfbfb] text-slate-500 dark:border-2 dark:border-gray-700 dark:bg-slate-800 dark:shadow-none dark:hover:border-gray-600"
                        onClick={props.closeHandler}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </Dialog.Title>

                  {props.children}

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-slate-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={props.closeHandler}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>{" "}
    </div>
  );
}

export default CardModal;

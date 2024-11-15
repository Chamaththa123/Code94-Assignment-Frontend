import React from "react";
import { CloseIcon, WarningIcon } from "../../utils/icons";

export const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed font-satoshi inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-sm bg-black bg-opacity-50">
      <div className="relative p-4 w-full md:max-w-[40%] max-w-[80%] py-[]">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <CloseIcon />
          </button>
          <div className="p-4 text-center">
            <WarningIcon />
            <h3 className="mb-5 text-[25px] font-semibold text-[#162427] text-center">
              ARE YOU SURE?
            </h3>
            <h3 className="mb-5 text-[16px] font-medium text-[#162427] ">
              You will not be able to undo this action if you proceed!
            </h3>
            <div className="flex gap-5 items-center justify-center">
              <button
                onClick={onClose}
                className="w-[100px] py-[6px] text-center ms-3 text-[16px] font-medium text-[#162427] inline-flex items-center justify-center  bg-white rounded-md border border-[#001EB9] "
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="text-white bg-[#001EB9] font-medium rounded-md text-[16px] inline-flex items-center justify-center border border-[#001EB9] w-[100px] py-[6px] text-center"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

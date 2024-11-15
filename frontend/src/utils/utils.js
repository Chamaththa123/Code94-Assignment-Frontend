export const tableHeaderStyles = {
  headCells: {
    style: {
      font: "satoshi",
      fontWeight: "700",
      color: "#001EB9",
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      font: "satoshi",
      fontWeight: "500",
      color: "#162427",
      fontSize: "14px",
      padding: "20px 10px 20px 10px",
    },
  },
};

export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    fontWeight: "600",
    color: state.isFocused ? "#64728C" : "#64728C82",
    borderColor: state.isFocused ? "#64728C" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px #64728C" : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "#64728C" : provided.borderColor,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#64728C" : "#64728C",
    backgroundColor: state.isSelected ? "#e7e7e7" : "white",
    ":hover": {
      backgroundColor: state.isSelected ? "#ccc" : "#f3f3f3",
    },
    fontSize: "14px",
    fontWeight: "600",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#64728C",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#bdbdbd",
  }),
};

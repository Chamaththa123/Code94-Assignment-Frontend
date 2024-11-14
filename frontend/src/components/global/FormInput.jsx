export const FormInput = ({
    name,
    data,
    inputName,
    handleChange,
    errors,
    type,
    placeholder,
    disabled,
  }) => {
    return (
      <div className="md:w-[100%] w-full ">
        <div className="flex items-center gap-2">
        <label className="flex-shrink-0 font-satoshi w-[25%] text-[14px] md:text-[16px] leading-[24px] font-medium text-[#162427]">
          {name}
        </label>
        <input
          name={inputName}
          type={type}
          className="block flex-grow w-[60%] rounded-[5px] focus:outline-[#bdbdbd] bg-[#F7F7F7] border-0 py-2.5 pl-3 text-[#162427] ring-1 ring-inset mt-2 ring-[#D0D5DD] placeholder:text-[#667085] placeholder:text-[14px] md:placeholder:text-[14px] placeholder:inter focus:ring-1 focus:ring-inset sm:leading-6 text-[14px] md:text-[14px] font-normal font-satoshi"
          value={data[inputName]}
          onChange={(e) => handleChange(inputName, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        </div>
        {errors[inputName] && (
          <p className="pt-1 text-xs font-medium text-red-500 font-satoshi">
            {errors[inputName]}
          </p>
        )}
      </div>
    );
  };

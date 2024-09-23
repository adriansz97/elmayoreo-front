
const returnClassButton = (variant) => {
  if (variant === "success") {
    return "inline-block px-4 py-2 text-white duration-150 font-medium bg-green-600 rounded-lg hover:bg-green-500 active:bg-green-700 md:text-sm"

  }
  return "inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm";
}

export const Button = ({ label = "", onClick = ()=>{}, className = "", variant = "primary", ...rest }) => {
  return (
    <button
      className={`${returnClassButton(variant)} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  )
}

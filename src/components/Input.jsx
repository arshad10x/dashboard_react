
const Input = (props) => {
  return (
    <input
    type={props.type}
    value={props.value}
    onChange={props.onChange}
    name={props.name}
    className="border-2 border-gray-500 w-64 h-10 rounded p-4"
    placeholder={props.placeholder}
    // required
  />

  )
   
}

export default Input
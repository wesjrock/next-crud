interface InputProps {
  type?: "text" | "number";
  text: string;
  value: any;
  readOnly?: boolean;
  className?: string;
  min?: number;
  max?: number;
  onChange?: (value: any) => void;
}

const Input = (props: InputProps) => {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-2">{props.text}</label>
      <input
        type={props.type ?? "text"}
        value={props.value}
        readOnly={props.readOnly}
        min={props.min}
        max={props.max}
        onChange={(e) => props.onChange?.(e.target.value)}
        className={`
          border border-purple-500 rounded-lg
          focus:outline-none bg-gray-100 px-4 py-2
          ${props.readOnly ? "" : "focus:bg-white"}
        `}
      />
    </div>
  );
};

export default Input;

import { FormItemProps } from "./type";

const RenderFormItem = (props: FormItemProps) => {
  return (
    <p>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={(ev) => {
          props.onValueChange(ev.target.value);
        }}
      />
    </p>
  );
};

export default RenderFormItem;
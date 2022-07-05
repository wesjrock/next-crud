import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
  client: Client;
  clientChanged?: (client: Client) => void;
  cancelled?: () => void;
}

const Form = (props: FormProps) => {
  const id = props.client?.id;
  const [name, setName] = useState(props.client?.name ?? "");
  const [age, setAge] = useState(props.client?.age ?? 18);

  return (
    <div>
      {id ? <Input readOnly text="ID" value={id} className="mb-5" /> : false}
      <Input text="Name" value={name} onChange={setName} className="mb-5" />
      <Input text="Age" type="number" min={18} max={130} value={age} onChange={setAge} />
      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={() => {
            if (name != "") {
              props.clientChanged?.(new Client(name, +age, id));
            }
          }}
        >
          {id ? "Edit" : "Save"}
        </Button>
        <Button onClick={props.cancelled}>Cancel</Button>
      </div>
    </div>
  );
};

export default Form;

import { useState } from "react";

const useTableOrForm = () => {
  const [visible, setVisible] = useState<"table" | "form">("table");

  const showTable = () => setVisible("table");
  const showForm = () => setVisible("form");

  return {
    tableVisible: visible === "table",
    formVisible: visible === "form",
    showTable,
    showForm,
  };
};

export default useTableOrForm;

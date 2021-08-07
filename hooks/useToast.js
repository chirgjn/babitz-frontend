import { Alert } from "antd";
import { createContext, useState, useContext } from "react";
export const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [error, setError] = useState(null);

  return (
    <ToastContext.Provider value={{ setError, error }}>
      {children}
      {error ? <Toast message={error.message} /> : null}
    </ToastContext.Provider>
  );
}
function Toast(props) {
  return <Alert message={props.message} type="error" closable />;
}
export const useToast = () => {
  const value = useContext(ToastContext);
  if (value == null) {
    throw new Error("Missing Toast Provider");
  }
  return { setError: value.setError };
};

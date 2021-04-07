import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ErrorListener = (props) => {
  const store = useSelector(store => store.myReducer);

  useEffect(() => {
    if (store.error) {
      alert(store.errorMsg);
    }
    // eslint-disable-next-line
  }, [store.error]);

  return props.children;
};

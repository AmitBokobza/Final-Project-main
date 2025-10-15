import { Bounce, toast } from "react-toastify";

const toastEmitter = {
  success: (message: any) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      theme: "dark",
      transition: Bounce,
    }),
  error: (message: any) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      theme: "dark",
      transition: Bounce,
    }),
};

export default toastEmitter;
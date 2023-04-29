import { toast } from "react-toastify";

export const success = (msg: string) =>
  toast.success(msg, {
    closeOnClick: true,
    autoClose: 1000,
    theme: "dark",
  });
export const error = (msg: string) =>
  toast.error(msg, {
    closeOnClick: true,
    autoClose: 1000,
    theme: "dark",
  });
export const warn = (msg: string) =>
  toast.warn(msg, {
    closeOnClick: true,
    autoClose: 1000,
    theme: "dark",
  });
export const info = (msg: string) =>
  toast.info(msg, {
    closeOnClick: true,
    autoClose: 1000,
    theme: "dark",
  });

import { CLODINARY_IMAGE_UPLOAD_URI } from "@/configs";
import axios from "axios";

export const uploadImage = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vcart-upload");
    formData.append("folder", "vcart");
    const res = await axios.post(CLODINARY_IMAGE_UPLOAD_URI, formData);
    console.log(res.data, "from utils");
    return res.data;
  } catch (e) {
    return {
      error: e,
    };
  }
};

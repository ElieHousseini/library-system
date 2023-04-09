import axios from "axios";
import { ProductType } from "../types";

type PostPropType = {
    url: string,
    formData: ProductType
}

type PostReturnType = {
  success: boolean,
  message: string
}

const postData = async ({url, formData}: PostPropType) : Promise<PostReturnType> => {
  const {data} = await axios.post(url, formData)
  return data;
};

export default postData
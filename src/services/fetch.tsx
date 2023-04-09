import axios from "axios";
import { ProductType } from "../types";

type FetchPropType = {
    url: string
}

const fetchData = async ({url} : FetchPropType): Promise<ProductType[]> => {
    const {data} = await axios.get(url)
    return data
}

export default fetchData
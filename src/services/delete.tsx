import axios from "axios";

type DeletePropType = {
    url: string,
    skus: string[]
}

type DeletereturnType = {
    success: boolean,
    message: string
}

const deleteData = async ({url, skus} : DeletePropType): Promise<DeletereturnType> => {
    const {data} = await axios.post(url,
    {skus: skus}
    )
    return data
}

export default deleteData
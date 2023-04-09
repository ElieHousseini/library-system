export type ProductType = {
    sku: string,
    name: string,
    price: string,
    type: string,

    // DVD
    size?: string,
    
    // Furniture
    height?: string,
    width?: string,
    length?: string,

    weight?: string,
};
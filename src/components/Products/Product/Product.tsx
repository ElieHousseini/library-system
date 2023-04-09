import styles from './Product.module.scss'
import { ProductType } from '../../../types';

type myProductType = {
    product: ProductType,
    onChange:  (event: React.ChangeEvent<HTMLInputElement>) => void,
    isChecked: boolean
}

const Product = ({product, onChange, isChecked } : myProductType) : JSX.Element => {
    const {sku, name, price, type, size, height, width, length, weight} = product;
    return (
        <div id={styles.container}>
            <div id={styles.item}>
                <p>{sku} </p>
                <p>{name}</p>
                <p>{price} $</p>
                <p>
                    {type.toLocaleLowerCase() === 'furniture' && `Dimensions: ${height}x${width}x${length}`}
                    {type.toLocaleLowerCase() === 'dvd' && `Size: ${size} MB`}
                    {type.toLocaleLowerCase() === 'book' && `Weight: ${weight} KG`}
                </p>
            </div>
            <input checked={isChecked} onChange={onChange} type="checkbox" aria-label={name} id={sku} className="delete-checkbox" />
        </div>
    )
}

export default Product
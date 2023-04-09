import styles from './Footer.module.scss'

type FooterPropsType = {text: string}

const Footer = ({text}: FooterPropsType) : JSX.Element => {
    return (
        <footer>
            <div id={styles.container}>
                <h2>{text}</h2>
            </div>
        </footer>

    )
}

export default Footer
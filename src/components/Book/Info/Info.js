import { Container } from "semantic-ui-react";
import styles from "./Info.module.scss";

export function Info(props) {
    const { book } = props;

    return (
        <Container className={styles.info}>
            <div className={styles.summary}>
                <p>{book.summary}</p>
            </div>

            <div className={styles.more}>
                <ul>
                    <li>
                        <span>Fecha de lanzamiento:</span> {book.releaseDate}
                    </li>
                </ul>
            </div>
        </Container>
    );
}
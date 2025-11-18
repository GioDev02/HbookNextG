import { Basket } from "./Basket";
import { Resume } from "./Resume";
import styles from "./StepOne.module.scss";

export function StepOne(props) {
    const { books } = props;

    return (
        <div className={styles.stepOne}>
            <div className={styles.center}>
                <Basket books={books} />
            </div>
            <div className={styles.right}>
                <Resume books={books} />
            </div>
        </div>
    );
}

/**  <Resume books={books} /> */
import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import styles from "./Basket.module.scss";
import { ENV } from "@/utils";

export function Basket(props) {
    const { books } = props;
    const { changeQuantityItem, deleteItem } = useCart();

    const options = Array.from({ length: 50 }, (_, index) => {
        const number = index + 1;
        return { key: number, text: String(number), value: number };
    });

    return (
        <div className={styles.basket}>
            <h2>Cesta</h2>

            <div className={styles.block}>
                {map(books, (book) => (
                    <div key={book.id} className={styles.product}>
                        <img src={book.attributes.cover.data.attributes.url} />
                        <div className={styles.contenido}>
                            <div className={styles.info}>
                                <div>
                                    <p>{book.attributes.title}</p>
                                    <p>{book.attributes.category.data.attributes.title}</p>
                                </div>

                                <Icon
                                    name="trash alternate online"
                                    link
                                    onClick={() => deleteItem(book.id)}
                                />
                            </div>

                            <div className={styles.quantity}>
                                <Dropdown
                                    className="number"
                                    options={options}
                                    selection
                                    value={book.quantity}
                                    compact
                                    onChange={(_, data) =>
                                        changeQuantityItem(book.id, data.value)
                                    }
                                />
                                <span>
                                    S/.
                                    {fn.calcDiscountedPrice(
                                        book.attributes.price,
                                        book.attributes.discount
                                    )}

                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
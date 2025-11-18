import Link from "next/link";
import { map } from "lodash";
import { fn } from "@/utils";
import { Label } from "@/components/Shared";
import styles from "./GridBooks.module.scss";



//a falta de s3
import { ENV } from "@/utils";
export function GridBooks(props) {
    const { books } = props;

    return (
        <div className={styles.gridBooks}>
            {map(books, (book) => (
                <Link
                    key={book.id}
                    href={`/${book.attributes.slug}`}
                    className={styles.book}
                >
                    <div>
                        <img src={`${ENV.SERVER_HOST}${book.attributes.cover.data.attributes.url}`} />
                        {book.attributes.discount > 0 && (
                            <Label.Discount className={styles.discount}>
                                {`-${book.attributes.discount}%`}
                            </Label.Discount>
                        )}
                    </div>

                    <div className={styles.infoBook}>
                        <span>{book.attributes.title}</span>
                        <span className={styles.price}>
                            S/.
                            {fn.calcDiscountedPrice(
                                book.attributes.price,
                                book.attributes.discount
                            )}

                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
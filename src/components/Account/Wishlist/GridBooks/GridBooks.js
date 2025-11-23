import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./GridBooks.module.scss";
import { ENV } from "@/utils";
export function GridBooks(props) {
    const { wishlist, onReload } = props;

    return (
        <div className={styles.gridBooks}>
            {map(wishlist, (item) => {
                const book = item.attributes.book.data;
                const cover = book.attributes.cover.data;

                return (
                    <div key={item.id} className={styles.book}>
                        <Link href={`/${book.attributes.slug}`}>
                            <div>
                                <img
                                    src={cover.attributes.url} />

                                {book.attributes.discount > 0 && (
                                    <Label.Discount className={styles.discount}>
                                        {`-${book.attributes.discount}%`}
                                    </Label.Discount>
                                )}
                            </div>

                            <div>
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

                        <WishlistIcon
                            bookId={book.id}
                            className={styles.whislistIcon}
                            removeCallback={onReload}
                        />
                    </div>
                );
            })}
        </div>
    );
}
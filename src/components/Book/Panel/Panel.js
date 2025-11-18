import { useState } from "react";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import { WishlistIcon } from "@/components/Shared";
import styles from "./Panel.module.scss";
import { ENV } from "@/utils";
export function Panel(props) {
    const { bookId, book } = props;
    const [loading, setLoading] = useState(false);
    const { addCart } = useCart();

    const category = book.category.data;
    const buyPrice = fn.calcDiscountedPrice(book.price, book.discount);

    const addCartWrapper = () => {
        setLoading(true);
        addCart(bookId);

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    return (
        <Container className={styles.panel}>
            <div className={styles.imgContiner}>
                <Image src={`${ENV.SERVER_HOST}${book.cover.data.attributes.url}`} />
            </div>

            <div className={styles.actionsContainer}>
                <div>
                    <h2>{book.title}</h2>

                    <div className={styles.moreInfo}>
                        <span>

                            <Image src={`${ENV.SERVER_HOST}${category.attributes.icon.data.attributes.url}`} />
                            {category.attributes.title}
                        </span>
                        <span>
                            <Icon name="check" />
                            En stock
                        </span>
                    </div>

                    <div className={styles.price}>
                        {book.discount > 0 && (
                            <>
                                <span className={styles.originalPrice}>
                                    <Icon name="tag" />
                                    S/. {book.price}
                                </span>

                                <span className={styles.discount}>-{book.discount}%</span>
                            </>
                        )}

                        <span className={styles.price}>S/. {buyPrice}</span>
                    </div>

                    <Button primary fluid onClick={addCartWrapper} loading={loading}>
                        Comprar ahora
                    </Button>

                    <WishlistIcon bookId={bookId} className={styles.heart} />


                </div>
            </div>
        </Container>
    );
}

/**
                    <Button primary fluid onClick={addCartWrapper} loading={loading}>
                        Comprar ahora
                    </Button>
                     <Image src={category.attributes.icon.data.attributes.url} />
                      <WishlistIcon gameId={bookId} className={styles.heart} />
                    */
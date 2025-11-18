import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { forEach, map } from "lodash";
import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

const cartCtrl = new Cart();

export function Resume(props) {
    const { books, addressSelected } = props;
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { deleteAllItems } = useCart();
    const router = useRouter();

    useEffect(() => {
        let totalTemp = 0;

        forEach(books, (book) => {
            const price = fn.calcDiscountedPrice(
                book.attributes.price,
                book.attributes.discount
            );
            totalTemp += price * book.quantity;
        });

        setTotal(totalTemp.toFixed(2));
    }, [books]);

    const onPay = async () => {
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElement);

        if (result.error) {
            console.error(result.error.message);
        } else {
            const response = await cartCtrl.paymentCart(
                result.token,
                books,
                user.id,
                addressSelected
            );

            if (response.status === 200) {
                deleteAllItems();
                goToStepEnd();
            } else {
                console.error("Error al realizar el pedido");
            }
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const goToStepEnd = () => {
        router.replace({ query: { ...router.query, step: 3 } });
    };

    if (!total) return null;

    return (
        <div className={styles.resume}>
            <h2>Resumen</h2>

            <div className={styles.block}>
                <div className={styles.products}>
                    {map(books, (book) => (
                        <div key={book.id} className={styles.product}>
                            <div>
                                <p>{book.attributes.title}</p>
                                <span>{book.attributes.category.data.attributes.title}</span>
                            </div>
                            <span>
                                {book.quantity > 0 && `${book.quantity}x`}
                                S/.
                                {fn.calcDiscountedPrice(
                                    book.attributes.price,
                                    book.attributes.discount
                                )}

                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.blockTotal}>
                <div>
                    <span>Total</span>
                    <span>S/. {total}</span>
                </div>

                <Button
                    primary
                    fluid
                    disabled={!addressSelected}
                    onClick={onPay}
                    loading={loading}
                >
                    Pagar
                </Button>
            </div>
        </div>
    );
}
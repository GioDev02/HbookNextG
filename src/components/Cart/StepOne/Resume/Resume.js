import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { forEach } from "lodash";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

export function Resume(props) {
    const { books } = props;
    const router = useRouter();
    const [totals, setTotals] = useState(null);

    useEffect(() => {
        let totals = {
            original: 0,
            discount: 0,
            price: 0,
        };

        forEach(books, (book) => {
            const price = fn.calcDiscountedPrice(
                book.attributes.price,
                book.attributes.discount
            );

            totals = {
                original: totals.original + book.attributes.price * book.quantity,
                discount:
                    totals.discount + (book.attributes.price - price) * book.quantity,
                price: totals.price + price * book.quantity,
            };
        });

        setTotals(totals);
    }, [books]);

    const goToStepTwo = () => {

        const { query } = router;
        console.log("valor de query :", query); // TODO: COMPARAR
        router.replace({ query: { ...router.query, step: 2 } });
    };

    if (!totals) return null;

    return (
        <div className={styles.resume}>
            <h2>Resumen</h2>

            <div className={styles.block}>
                <div className={styles.prices}>
                    <div>
                        <span>Precio oficial</span>
                        <span>S/.{totals.original.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Descuento</span>
                        <span>S/.{totals.discount.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Subtotal</span>
                        <span>S/.{totals.price.toFixed(2)}</span>
                    </div>
                </div>

                <Button primary fluid onClick={goToStepTwo}>
                    Proceder con el pago
                </Button>

                <Link href="/">Continuar comprando</Link>
            </div>
        </div>
    );
}
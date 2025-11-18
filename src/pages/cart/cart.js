import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Book } from "@/api";
import { CartLayout } from "@/layouts";
import { useCart } from "@/hooks";
import { Cart } from "@/components/Cart";
import { Seo } from "@/components/Shared";

const bookCtrl = new Book();

export default function CartPage() {
    const {
        query: { step = 1 },
    } = useRouter();
    const currentStep = Number(step);
    const [books, setBooks] = useState(null);
    const { cart } = useCart();

    useEffect(() => {
        (async () => {
            try {
                const data = [];
                for await (const item of cart) {
                    const response = await bookCtrl.getBookById(item.id);
                    data.push({ ...response.data, quantity: item.quantity });
                }
                setBooks(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [cart]);

    return (
        <>

            <Seo title="Carrito" />
            <CartLayout>
                {currentStep === 1 && <Cart.StepOne books={books} />}
                {currentStep === 2 && <Cart.StepTwo books={books} />}
                {currentStep === 3 && <Cart.StepThree />}
            </CartLayout>
        </>
    );
}

/**   <Seo title="Carrito" /> */
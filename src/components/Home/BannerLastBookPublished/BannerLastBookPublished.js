import { useState, useEffect } from "react";
import { Container, Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { Book } from "@/api";
import { Label } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./BannerLastBookPublished.module.scss";

//a falta de s3
import { ENV } from "@/utils";

const bookCtrl = new Book();

export function BannerLastBookPublished() {
    const [book, setBook] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await bookCtrl.getLastPublished();
                // console.log(response.data[0]);
                setBook(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    if (!book) return null; //si no existe ningun libro publicado que no se muestre nada (este componente)

    const wallpaper = book.attributes.wallpaper;
    const releaseDate = new Date(book.attributes.releaseDate).toISOString();
    const price = fn.calcDiscountedPrice(
        book.attributes.price,
        book.attributes.discount
    );
    /*
        const wallpaper = game.attributes.wallpaper;
        const releaseDate = new Date(game.attributes.releaseDate).toISOString();
        const price = fn.calcDiscountedPrice(
            game.attributes.price,
            game.attributes.discount
        );*/

    return (
        <div className={styles.container}>
            <Image src={`${ENV.SERVER_HOST}${wallpaper.data.attributes.url}`}
                className={styles.wallpaper}
            />

            <Link className={styles.infoContainer} href={book.attributes.slug}>
                <Container>
                    {/*Cambiar fecha de publicacion del libro a ffecha en el que el libro estará displonible en la aplicación, cosaque sería más actual */}
                    <span className={styles.date}>
                        {DateTime.fromISO(releaseDate).plus({ days: 1 }).toRelative()}
                    </span> { }

                    <h2>{book.attributes.title}</h2>

                    <p className={styles.price}>

                        <Label.Discount>-{book.attributes.discount}%</Label.Discount>
                        <span className={styles.finalPrice}>S/.{price}</span>
                    </p>
                </Container>
            </Link>

        </div>
    );
}

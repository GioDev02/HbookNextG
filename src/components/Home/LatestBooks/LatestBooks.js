import { useState, useEffect } from "react";
import { Book } from "@/api";
import { GridBooks } from "@/components/Shared";

const bookCtrl = new Book();

export function LatestBooks(props) {
    const { title, limit = 9, categoryId = null } = props;
    const [books, setBooks] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await bookCtrl.getLatestPublished({
                    limit,
                    categoryId,
                });
                console.log(response.data);
                setBooks(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []); // Se ejecuta solo una vez cuando el componente se monta

    //  if (!books) return null;

    return (
        <div>
            <h2>{title}</h2>
            <GridBooks books={books} />
        </div>
    );
}

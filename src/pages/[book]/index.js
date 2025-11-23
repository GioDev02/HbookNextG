import { Book } from "@/api";


export { default } from "./book";

export async function getServerSideProps(context) {

    const {
        params: { book },
    } = context;


    const bookCtrl = new Book();
    const response = await bookCtrl.getBySlug(book);

    return {
        props: {
            book: response,
        },
    };
}
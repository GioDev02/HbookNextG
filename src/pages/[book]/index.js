import { Book } from "@/api";


export { default } from "./book";

export async function getServerSideProps(context) {
    console.log("book context: ", context);
    const {
        params: { book },
    } = context;
    // console.log("book param: ", book);

    const bookCtrl = new Book();
    const response = await bookCtrl.getBySlug(book);
    console.log("dinamica", response);
    return {
        props: {
            book: response,
        },
    };
}
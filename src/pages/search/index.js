
import { Book } from "@/api";
export { default } from "./search";

//busqueda al lado del servidor

export async function getServerSideProps(context) {


    console.log("search context: ", context)
    const { query: { s, page = 1 } } = context;

    const bookCtrl = new Book();
    const response = await bookCtrl.searchBooks(s, page);
    return {
        props: {
            books: response.data,
            pagination: response.meta.pagination,
            searchText: s,
        }
    }
}

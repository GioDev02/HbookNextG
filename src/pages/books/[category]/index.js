
import { Category, Book } from "@/api";
export { default } from "./category";


export async function getServerSideProps(context) {

    const { query, params } = context;
    const { page = 1 } = query;
    const { category } = params;


    const categoryCtrl = new Category();
    const responseCategory = await categoryCtrl.getBySlug(category);

    const bookCtrl = new Book();
    const responseBook = await bookCtrl.getBooksByCategorySlug(category, page);

    return {
        props: {
            category: responseCategory,
            books: responseBook.data,
            pagination: responseBook.meta.pagination,
        },
    };


}
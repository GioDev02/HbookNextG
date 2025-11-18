import React from 'react'
import { BasicLayout } from "@/layouts";
import { Book } from "@/components/Book";
import { Separator, Seo } from "@/components/Shared";
export default function BookPage(props) {
    const { book } = props;
    const wallpaper = book.attributes.wallpaper;
    return (
        <>
            <Seo
                title={book.attributes.title}
                description={book.attributes.summary}
            />

            <BasicLayout>
                <Book.HeaderWallpaper image={wallpaper.data.attributes.url} />
                <Book.Panel bookId={book.id} book={book.attributes} />
                <Separator height={50} />
                <Book.Info book={book.attributes} />
                <Separator height={30} />
                <Book.Media video={book.attributes.video}
                    screenshots={book.attributes.screenshots.data}
                />
            </BasicLayout>
        </>
    );
}

export async function getServerSideProps(context) {
    const {
        params: { book },
    } = context;
    const bookCtrl = new Book();
    const response = await bookCtrl.getBySlug(book);
    console.log("dinamica", response);
    return {
        props: {
            book: response,
        },
    };
}
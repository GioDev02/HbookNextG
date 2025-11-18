import React from 'react'
import { BasicLayout } from "@/layouts";
import { Book } from "@/components/Book";
import { Separator, Seo } from "@/components/Shared";
export default function BookPage(props) {
    const { book } = props;
    const wallpaper = book.attributes.wallpaper;
    console.log("Book", book)
    console.log("dinamica", props);
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

/** <Seo
                title={game.attributes.title}
                description={game.attributes.summary}
            />
           <Book.HeaderWallpaper image={wallpaper.data.attributes.url} />
                <Book.Panel gameId={game.id} game={game.attributes} />

                <Separator height={50} />

                <Book.Info game={game.attributes} />

                <Separator height={30} />

                <Book.Media
                    video={game.attributes.video}
                    screenshots={game.attributes.screenshots.data}
                />

                <Separator height={50} />  
            
            
            */
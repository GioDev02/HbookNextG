import React from 'react'
import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
    GridBooks,
    Separator,
    NoResult,
    Pagination, Seo
} from "@/components/Shared";


export default function CategoryPage(props) {
    console.log(props);// props recibidos de forma automatica de getServerSideProps
    const { books, category, pagination } = props;
    const hasProducts = size(books) > 0;

    return (
        <>

            <Seo title={`Libros de ${category.attributes.title}`} />
            <BasicLayout relative>
                <Container>
                    <Separator height={50} />

                    <h2>{category.attributes.title}</h2>

                    {hasProducts ? (
                        <>
                            <GridBooks books={books} />
                            <Separator height={30} />
                            {<Pagination
                                currentPage={pagination.page} /**Indicar la pagina actual */
                                totalPages={pagination.pageCount}
                            />}
                        </>
                    ) : (
                        <NoResult
                            text={`La categoria ${category.attributes.title} aun no tiene productos`}
                        />
                    )}

                    <Separator height={100} />
                </Container>
            </BasicLayout>
        </>
    );
}
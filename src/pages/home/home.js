import { BasicLayout } from '@/layouts'
import React from 'react'
import { Home } from '@/components/Home';
import { Separator, BarTrust, BannerAd, Seo } from "@/components/Shared";
import { Container } from "semantic-ui-react";

const categoryId = {
    romance: 1,
    terror: 2,
    misterio: 3,
    fantasia: 4
};

export default function HomePage() {
    return (
        <>
            <Seo />
            <BasicLayout  >
                <Home.BannerLastBookPublished />
                <Separator height={100} />
                <Container>

                    <Home.LatestBooks title="Últimas publicaciones" />
                </Container>
                <Separator height={100} />

                <BarTrust />

                <Separator height={100} />
                <Container>
                    <Home.LatestBooks title="Romance" limit={3} categoryId={categoryId.romance} />
                </Container>
                <Separator height={50} />
                <BannerAd title="Registrate y obten los mejores precios"
                    subtitle="¡Compra con otros libros y elige el tuyo"
                    btnTitle="Entrar ahora"
                    btnLink="/account"
                    image="/images/img01.png" />
                <Separator height={50} />
                <Container>
                    <Home.LatestBooks title="Terror" limit={3} categoryId={categoryId.terror} />
                </Container>
                <Separator height={100} />
            </BasicLayout>
        </>
    );
};  

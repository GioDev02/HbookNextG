import React from 'react'
import styles from "./BasicLayout.module.scss";
import classNames from "classnames";
import { TopBar, Footer } from '@/components/Layout';
import { Container } from 'semantic-ui-react';


export function BasicLayout(props) {
    const { children, isOpenSearch = false,
        isContainer = false,
        relative = false,
    } = props;
    return (


        <>
            {/*TODO: TopBar */}
            <TopBar isOpenSearch={isOpenSearch}></TopBar>
            <Container fluid>
                <div className={classNames({ [styles.relative]: relative })}>
                    {isContainer ? <Container>{children}</Container> : children}
                </div>

            </Container>
            {/*TODO: Footer */}
            <Footer />
        </>

    )
}

/**Creamos la carpeta de Layout en componentes que es donde vmaos a crear todos los componentes que tengan relación con algun Layout de la aplicaición*/
import React from 'react';
import styles from "./TopBar.module.scss";
import { Image } from 'semantic-ui-react';
import { Account } from '../Account';
import { Menu } from "../Menu";
import Link from "next/link";

export function TopBar(props) {

    const { isOpenSearch } = props;

    return (
        <div className={styles.topBar}>
            <div className={styles.left}>
                <Link href="/">
                    <Image src="/images/logo.png" alt="Reading" />
                </Link>

            </div>

            <div className={styles.center}>
                <Menu isOpenSearch={isOpenSearch} />
            </div>

            <div className={styles.right}>
                <Account />
            </div>
        </div>
    )
}

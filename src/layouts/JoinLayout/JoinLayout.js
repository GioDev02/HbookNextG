import React from 'react';
import Link from "next/link";
import { Icon, Image } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import styles from "./JoinLayout.module.scss";

export function JoinLayout(props) {
    const { children } = props;
    const router = useRouter();
    const { user } = useAuth();
    console.log("valoir de useRouter", router);
    console.log(user);

    //recordar que un usuario logueado no puede acceder ni al registro ni al login de usuario 
    if (user) {
        router.push("/");
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <Link href="/">
                    <Image src="/images/logo.png" alt="Reading" />
                </Link>
                <Link href="/">
                    <Icon name="close"></Icon>
                </Link>
            </div>
            <div className={styles.blockLeft}>{children}</div>
            <div className={styles.blockRight}></div>
        </div>
    )
}

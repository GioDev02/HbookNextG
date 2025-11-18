import React from 'react'
import Link from "next/link";
import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth"
import styles from "./sign-in.module.scss";
import { Seo } from "@/components/Shared";
export default function signInPage() {
    return (
        <>
            <Seo title="Iniciar Sesión" />
            <JoinLayout>
                <div className={styles.signIn}>
                    <h3>Iniciar sesion</h3>
                    <LoginForm />
                    <div className={styles.actions}>
                        <Link href="/join/sign-up">¿No tienes una cuenta?</Link>
                    </div>
                </div>
            </JoinLayout>

        </>

    )
}

import React from 'react'
import styles from "./Footer.module.scss";
import Link from "next/link";
import { Container, Image, Button } from "semantic-ui-react";




export function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.columns}>
                    <div>
                        <Link href="/">
                            <Image src="/images/logo.png" alt="Reading" />
                        </Link>
                    </div>

                    <div>
                        <ul>
                            <Link href="#">Términos y condiciones</Link>
                            <Link href="#">Política de privacidad</Link>
                            <Link href="#">Contacto</Link>
                            <Link href="#">FAQS</Link>
                        </ul>
                    </div>

                    <div className={styles.social}>
                        <Button as="a" href="#" circular color='facebook' icon="facebook" />
                        <Button as="a" href="#" circular color='twitter' icon="twitter" />
                        <Button as="a" href="#" circular color='linkedin' icon="linkedin" />
                        <Button as="a" href="#" circular color='youtube' icon="youtube" />
                    </div>
                </div>
                <div className={styles.copyright}>
                    <span>Copyright © 2025 HuaycanBook - All rights reserved</span>
                </div>
            </Container>

        </div>
    )
}

import React from 'react'
import { BasicLayout } from "@/layouts";
import { Separator, Seo } from "@/components/Shared";
import { Icon, Tab } from 'semantic-ui-react';
import { useAuth } from "@/hooks";
import styles from "./account.module.scss";
import {
    Info, Settings, Address, Wishlist, Orders

} from "@/components/Account";
import { useState } from "react";
import { useRouter } from "next/router";



export default function AccountPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [reload, setReload] = useState(false);


    if (!user) {
        router.push("/");
        return null;
    };

    const onReload = () => setReload((prevState) => !prevState);

    const panes = [

        {
            menuItem: "Mis pedidos",
            render: () => (
                <Tab.Pane attached={false}>
                    <Orders />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Lista de deseos",
            render: () => (
                <Tab.Pane attached={false}>
                    <p>Mi lista de deseos</p>
                    <Wishlist onReload={onReload} />
                    <Separator height={80} />

                </Tab.Pane>
            ),
        },
        {
            menuItem: "Direcciones",
            render: () => (
                <Tab.Pane attached={false}>
                    {/*pasamos OnreloadPorque vamos a crear direcciones y para que recargue */}
                    <Address.AddAddress onReload={onReload} />
                    {/*Porque vamos a crear actualizar direcciones y para que recargue */}
                    <Address.ListAddresses reload={reload} onReload={onReload} />
                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: 20, icon: "settings", content: "Ajustes" },
            render: () => (
                <Tab.Pane attached={false}>
                    <Settings.ChangeNameForm />
                    <div className={styles.containerForms}>
                        <Settings.ChangeEmailForm />
                        <Settings.ChangePasswordForm />
                    </div>

                    <Separator height={80} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: 21,
                icon: "log out",
                content: "",
                onClick: logout
            }
        },
    ]

    return (
        <>
            <Seo title="Mi cuenta" />
            <BasicLayout isContainer relative>
                <Info />
                <Tab
                    menu={{ secondary: true, pointing: true }}
                    panes={panes}
                    className={styles.tabs}
                />
            </BasicLayout>
        </>
    )
}

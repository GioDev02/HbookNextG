import React from 'react';
import { useState, useEffect } from 'react';
import { Image, Icon, Input } from 'semantic-ui-react';
import Link from 'next/link';
import { map, set } from "lodash";
import classNames from 'classnames';
import { Category } from "@/api"
import styles from "./Menu.module.scss";
import { ENV } from "@/utils";
import { useRouter } from "next/router";

const categoryCtrl = new Category();

export function Menu(props) {

    const { isOpenSearch } = props;
    const [categories, setCategories] = useState(null);
    const [showSearch, setShowSearch] = useState(isOpenSearch);
    const [searchText, setSearchText] = useState("");
    const router = useRouter();


    const openCloseSearch = () => setShowSearch((prevState) => !prevState)

    console.log(showSearch)
    //console.log(" DSAD", categories);
    useEffect(() => {
        (async () => {
            try {
                const response = await categoryCtrl.getAll();
                //  console.log("resultado de categoryas ", response.data);
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        setSearchText(router.query.s || "");//En una propiedad .s es donde esta el valor
        console.log("routerquery", router.query.s);
    }, []); // , [router.query]);

    const onSearch = (text) => {
        setSearchText(text);
        router.replace(`/search?s=${text}`);
    };





    return (
        <div className={styles.categories}>
            {map(categories, (category) => (
                <Link key={category.id} href={`/books/${category.attributes.slug}`} >
                    <Image src={category.attributes.icon.data.attributes.url}
                    />
                    <p>{category.attributes.title}</p>
                    {console.log(category.attributes.icon.data.attributes.url)}
                </Link>

            ))}
            <button
                className={styles.search}
                onClick={openCloseSearch}
            >
                <Icon name='search'></Icon>


            </button>
            <div className={classNames(styles.inputContainer, {
                [styles.active]: showSearch
            })}>
                <Input id="search-books" placeholder="Buscador" className={styles.input} focus={true}
                    onChange={(_, data) => onSearch(data.value)}
                    value={searchText}
                />
                <Icon name='close' className={styles.closeInput} onClick={openCloseSearch}
                />
            </div>


        </div>
    )
}

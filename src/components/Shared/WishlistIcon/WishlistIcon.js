import { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";
import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import styles from "./WishlistIcon.module.scss";

const wishlistCtrl = new Wishlist();

export function WishlistIcon(props) {
    const { bookId, className, removeCallback } = props;
    const [hasWishlist, setHasWishlist] = useState(null);
    const { user } = useAuth();


    useEffect(() => {
        (async () => {
            try {
                const response = await wishlistCtrl.check(user.id, bookId);
                setHasWishlist(response);
            } catch (error) {
                setHasWishlist(false);
                console.error(error);
            }
        })();
    }, [bookId]);

    const addWishlist = async () => {
        const response = await wishlistCtrl.add(user.id, bookId);
        setHasWishlist(response);
    };

    const deleteWishlist = async () => {
        try {
            await wishlistCtrl.delete(hasWishlist.id);
            setHasWishlist(false);

            if (removeCallback) { /**SI EXISTE REMOVECALLBACK, YA QUE LA OTRA OPCION ES QUE SEA NULL*/
                removeCallback(); /**Siempre existiria removecallback per solo se ejacutara cuando llame a deleteWishlit */
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (hasWishlist === null) return null;

    return (
        <Icon
            name={
                hasWishlist ? "heart" : "heart outline"}
            onClick={hasWishlist ? deleteWishlist : addWishlist}
            className={classNames(styles.wishlistIcon, {
                [className]: className,
            })}
        />
    );
}

/**
 * 
 *  <Icon
            name={
            hasWishlist ? "heart" : "heart outline"}
onClick = { hasWishlist? deleteWishlist: addWishlist }
className = { classNames(styles.wishlistIcon, {
    [className]: className,
            })}
        />
    */
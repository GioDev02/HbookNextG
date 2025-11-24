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
        if (!user) return;

        (async () => {
            try {
                const response = await wishlistCtrl.check(user.id, bookId);
                setHasWishlist(response);
            } catch (error) {
                setHasWishlist(false);
                console.error(error);
            }
        })();
    }, [bookId, user]);

    const addWishlist = async () => {
        try {
            const response = await wishlistCtrl.add(user.id, bookId);
            setHasWishlist(response);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteWishlist = async () => {
        try {
            // Verificar que hasWishlist sea un objeto con id
            if (!hasWishlist || typeof hasWishlist !== 'object' || !hasWishlist.id) {
                console.error("No valid wishlist object to delete");
                return;
            }

            await wishlistCtrl.delete(hasWishlist.id);
            setHasWishlist(false);

            if (removeCallback) {
                removeCallback();
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
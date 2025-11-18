import classNames from "classnames";
import styles from "./Discount.module.scss";

export function Discount(props) {
    const { children, className } = props;

    return (
        <span
            className={classNames(styles.labelDiscount, { [className]: className })}
        >
            {children}
        </span>
    );
}

/**Documentación
 * styles.labelDiscount → clase local del módulo
 * [className]: className → clase externa pasada por props (no está en styles)
 * 
 * 
 * 
 * classNames(styles.labelDiscount, { [styles.className]: className })
 * eso buscaría dentro del módulo Discount.module.scss una clase llamada className,
que no existe

*/
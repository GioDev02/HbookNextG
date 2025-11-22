import { useState } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import Slider from "react-slick";
import { FullModal } from "@/components/Shared";
import styles from "./Gallery.module.scss";
import { ENV } from "@/utils";
export function Gallery(props) {
    const { screenshots } = props;
    const [show, setShow] = useState(false);

    const onOpenClose = () => setShow((prevState) => !prevState);

    const screenshotsClone = [...screenshots]; //clonando el array
    const principalImage = screenshotsClone.shift();

    const settings = {
        dots: true,
        dotsClass: styles.dots,
        infinite: true,
        slidersToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: function (index) {
            return <Image src={screenshots[index].attributes.url} />
        },
    };

    return (
        <>
            <div className={styles.gallery}>
                <div className={styles.principal}>

                    <Image src={principalImage.attributes.url}
                        onClick={onOpenClose}
                    />
                </div>

                <div className={styles.grid}>
                    {map(screenshotsClone, (screenshot) => (
                        <div key={screenshot.id}>
                            <Image src={screenshot.attributes.url} onClick={onOpenClose} />
                        </div>
                    ))}
                </div>
            </div>

            <FullModal show={show} onClose={onOpenClose}>
                <div className={styles.carouselContainer}>
                    <Slider {...settings}>
                        {map(screenshots, (screenshot) => (
                            <div key={screenshot.id}>
                                <Image src={screenshot.attributes.url} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </FullModal>


        </>
    );
}

/**
 * Documentacion:
 *React necesita un atributo key único para cada elemento de la lista que devuelve el .map().
Esto ayuda a React a saber qué elementos cambiaron, se eliminaron o se agregaron cuando vuelve a renderizar..
 */


/**
 * 
 * 
 *  <FullModal show={show} onClose={onOpenClose}>
                <div className={styles.carouselContainer}>
                    <Slider {...settings}>
                        {map(screenshots, (screenshot) => (
                            <div key={screenshot.id}>
                                <Image src={screenshot.attributes.url} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </FullModal>
 */
import { Container } from "semantic-ui-react";
import { Video } from "./Video";
import { Gallery } from "./Gallery";
import { Separator } from "@/components/Shared";

export function Media(props) {
    console.log("Media props", props);
    const { video, screenshots } = props;

    return (
        <Container>
            <h2>Visuales</h2>
            <Separator height={30} />
            <Video video={video} />
            <Separator height={30} />
            <Gallery screenshots={screenshots} />
        </Container>
    );
}
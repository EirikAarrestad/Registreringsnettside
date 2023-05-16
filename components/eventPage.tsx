import { StaticImageData } from "next/image";
import Jumbotron from "../components/jumbotron";
import Page from "../components/page";
import styles from "./eventPage.module.scss";

type EventPageProps = {
    title: string; // Title of the event
    description: string; // Description of the event
    background: StaticImageData; // Background image for the event page
    children: React.ReactNode; // Content to be displayed inside the event page
};

const EventPage: React.FC<EventPageProps> = ({ title, description, background, children }) => {
    return (
        <Page title={title} description={description}>
            {/* Jumbotron component */}
            <Jumbotron small={true} background={background.src}>
                <div className={styles.jumbotronOverlay}>
                    <div className={styles.overskrift}>
                        <h1>{title.toUpperCase()}</h1>
                        <p>{description}</p>
                        {title !== "Politikere i Norge" && <hr />} {/* Render a horizontal line if the title is not "Politikere i Norge" */}
                    </div>
                </div>
            </Jumbotron>
            <div className={styles.eventPageWrapper}>{children}</div> {/* Content of the event page */}
        </Page>
    );
};

export default EventPage;

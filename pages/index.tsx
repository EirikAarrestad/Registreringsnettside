import EventPage from "@/components/eventPage";
import OsloLion from "../public/politikere.jpg";
import styles from "../styles/index.module.scss";

const Home = (): JSX.Element => {
    return (
        <EventPage
            description="En nettside for å registere og få oversikt over politikere"
            background={OsloLion}
            title="Politikere i Norge"
        >
            <div className={styles.container}>
                <h1>Kort forklaring om nettsiden</h1>
                <p>
                    Dette er en nettside programert i
                    <a href="https://nextjs.org/">NEXT.JS</a>, et rammeverk for
                    Javascript. Nettsiden har en responsiv navbar med 3 ulike
                    knapper; Hjem, Alle Politikere og Register Ny Politiker. Jeg
                    har valgt Firebase Firestore som database.
                </p>
                <br />
                <p>
                    <b>Alle Politikere</b>
                    <br />
                    Denne siden viser en HTML-tabell med alle politikerne
                    sortert etter etternavn, det er også mulig å filtrer gjennom
                    partiene med en select meny. Det er også mulig å søke etter
                    ønsket politiker.
                </p>
                <br />
                <p>
                    <b>Registrer Ny Politiker</b>
                    <br />
                    Denne siden viser ett skjema der du kan legge til en ny
                    politiker i databasen.
                </p>
                <br />
                <p>
                    <b>Hjem</b>
                    <br />
                    Denne knappen tar deg tilbake til denne hjemmesiden
                </p>
            </div>
        </EventPage>
    );
};

export default Home;

import EventPage from "../components/eventPage";
import styles from "../styles/displayPoliticians.module.scss";
import { useState, useEffect } from "react";

import { app } from "../components/firebaseConfig";
import { getFirestore, query, collection, getDocs } from "firebase/firestore";

import stortingLøve from "../public/OsloLion.jpg";

const db = getFirestore(app);

interface PoliticianProps {
    name: string;
    lastName: string;
    party: string;
    county: string;
}

// PoliticianTable component represents the table displaying the list of politicians
const PoliticianTable = ({ politicians }: { politicians: PoliticianProps[] }): JSX.Element => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Navn</th>
                        <th>Parti</th>
                        <th>Valgkrets</th>
                    </tr>
                </thead>
                <tbody>
                    {politicians.map((politician, index) => (
                        <tr key={index}>
                            <td>
                                {politician.name} {politician.lastName}
                            </td>
                            <td>{politician.party}</td>
                            <td>{politician.county}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const DisplayPoliticians = (): JSX.Element => {
    const [searchResults, setSearchResults] = useState<PoliticianProps[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedParty, setSelectedParty] = useState("");
    const [politicians, setPoliticians] = useState<PoliticianProps[]>([]);

    // Function that loads all the data from the database
    useEffect(() => {
        const getPoliticians = async () => {
            try {
                const q = query(collection(db, "Politikere"));
                const querySnapshot = await getDocs(q);
                const politiciansData = querySnapshot.docs.map(
                    (doc) => doc.data() as PoliticianProps
                );
                setPoliticians(politiciansData ?? []);
            } catch (error) {
                console.error(
                    "Error searching politicians in Firestore: ",
                    error
                );
            }
        };
        getPoliticians();
    }, []);

    // A function that filters and sorts the politicians based on search term and selected party
    useEffect(() => {
        const filterPoliticians = () => {
            const filtered = selectedParty
                ? politicians.filter(
                      (politician) => politician.party === selectedParty
                  )
                : politicians;

            const regex = new RegExp(searchTerm, "i");
            setSearchResults(
                filtered
                    .filter(
                        (politician) =>
                            regex.test(politician.name) ||
                            regex.test(politician.lastName) ||
                            regex.test(politician.county)
                    )
                    .sort((a, b) => {
                        const aLastName = (a.lastName || "").toLowerCase();
                        const bLastName = (b.lastName || "").toLowerCase();
                        if (aLastName < bLastName) {
                            return -1;
                        } else if (aLastName > bLastName) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
            );
        };
        filterPoliticians();
    }, [searchTerm, selectedParty, politicians]);

    return (
        <EventPage
            title="Se politkere"
            description=""
            background={stortingLøve}
        >
            <div className={styles.container}>
                <select
                    value={selectedParty}
                    onChange={(event) => setSelectedParty(event.target.value)}
                >
                    <option value="">Alle partier</option>
                    <option value="AP">Arbeiderpartiet</option>
                    <option value="FRP">Fremskrittspartiet</option>
                    <option value="H">Høyre</option>
                    <option value="KRF">Kristelig Folkeparti</option>
                    <option value="MDG">Miljøpartiet De Grønne</option>
                    <option value="R">Rødt</option>
                    <option value="SP">Senterpartiet</option>
                    <option value="SV">Sosialistisk Venstreparti</option>
                    <option value="V">Venstre</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <PoliticianTable politicians={searchResults} />
            </div>
        </EventPage>
    );
};

export default DisplayPoliticians;

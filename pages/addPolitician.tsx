import EventPage from "@/components/eventPage";
import styles from "../styles/addPolitician.module.scss";
import { app } from "../components/firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import stortingBakgrunn from "../public/stortinget.jpg";

const db = getFirestore(app);

// AddPolitician component represents the page for registering a new politician
const AddPolitician = (): JSX.Element => {
    const [data, setData] = useState({
        name: "",
        lastName: "",
        party: "",
        county: "",
    });

    // Update the data state based on user input
    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    // Adds the data from the input fields to the database
    const handleAddPolitician = async () => {
        try {
            // Combine the name and lastName values
            const fullName = data.name + " " + data.lastName;

            // Check if the party and county values are not empty
            if (data.county) {
                // Add a new document to the "Politikere" collection with the combined name and other entered data
                await addDoc(collection(db, "Politikere"), {
                    name: fullName,
                    party: data.party,
                    county: data.county,
                });

                // Reset the data state
                setData({ name: "", lastName: "", party: "", county: "" });
            } else {
                alert("Du må velge valgkrets");
            }
        } catch (error) {
            console.error("Error adding politician to Firestore: ", error);
        }
    };

    return (
        <EventPage title="Register ny politiker" description="" background={stortingBakgrunn}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSplitter}>
                    <div id="kontakt">
                        <div className={styles.inputForm}>
                            <label htmlFor="name">Navn</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Navn..."
                                value={data.name}
                                onChange={handleInput}
                            />

                            <label htmlFor="lastName">Etternavn</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Etternavn..."
                                value={data.lastName}
                                onChange={handleInput}
                            />

                            <label htmlFor="party">Parti</label>
                            <select
                                id="party"
                                name="party"
                                value={data.party}
                                onChange={handleInput}
                            >
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

                            <label htmlFor="county">Valgkrets</label>
                            <select
                                id="county"
                                name="county"
                                value={data.county}
                                onChange={handleInput}
                            >
                                <option value="">Velg valgkrets</option>
                                <option value="Aust-Agder">Aust-Agder</option>
                                <option value="Vest-Agder">Vest-Agder</option>
                                <option value="Akershus">Akershus</option>
                                <option value="Buskerud">Buskerud</option>
                                <option value="Finnmark">Finnmark</option>
                                <option value="Hedmark">Hedmark</option>
                                <option value="Hordaland">Hordaland</option>
                                <option value="Møre og Romsdal">Møre og Romsdal</option>
                                <option value="Nordland">Nordland</option>
                                <option value="Oppland">Oppland</option>
                                <option value="Oslo">Oslo</option>
                                <option value="Rogaland">Rogaland</option>
                                <option value="Sogn og Fjordane">Sogn og Fjordane</option>
                                <option value="Telemark">Telemark</option>
                                <option value="Nord-Trøndelag">Nord-Trøndelag</option>
                                <option value="Sør-Trøndelag">Sør-Trøndelag</option>
                                <option value="Vestfold">Vestfold</option>
                                <option value="Østfold">Østfold</option>
                            </select>
                            <button type="button" onClick={handleAddPolitician}>
                                Legg til
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </EventPage>
    );
};

export default AddPolitician;

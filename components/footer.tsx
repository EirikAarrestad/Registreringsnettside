import styles from './footer.module.scss';

// Footer component represents the footer section of the page
// It includes contact information, a contact form, and attribution details
const Footer = (): JSX.Element => (
    <>
    <div className={styles.footerContainer}>
        <div className={styles.footerSplitter}>
            <div>
                <span className={styles.spellet}>SKIEN</span>
                <div className={styles.adresser}>
                    <p><b>Besøksadresse</b> <span><br/>Gråstein VGS.<br/> 3712 Skien</span></p><br/>
                    <p><b>Postadresse</b> <span><br/>Borgevegen 41<br/> 3712 Skien</span></p>
                </div>
            </div>
            <div id="kontakt">
                <form className={styles.inputForm}>
                    <label htmlFor="name">Navn</label>
                    <input type="text" id="name" name="name" placeholder="Navnet ditt.."/>
                    <label htmlFor="e-mail">E-post</label>
                    <input type="text" id="e-mail" name="e-mail" placeholder="E-posten din.."/>
                    <small>Vi deler ikke e-posten din med andre.</small><br/><br/>
                    <label htmlFor="message">Melding</label>
                    <textarea id="message" name="message" placeholder="Skriv noe.."></textarea>
                    <input type="button" value="Kontakt"/>
                </form>
            </div>
        </div>
        <hr/>
        © 2023 - D.D Politikken Skien<br/>
        <span className={styles.arre}>
            Utviklet av <a className={styles.arre} href="https://www.instagram.com/eirikaarre/">Eirik Aarrestad</a>
        </span>
    </div>
    </>
)

export default Footer
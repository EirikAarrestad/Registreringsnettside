import styles from "./jumbotron.module.scss";
import Image from "next/image";

type JumbotronProps = {
    small?: boolean; // Indicates if the jumbotron should have a smaller size
    background: string; // Background image source for the jumbotron
    children: React.ReactNode; // Content to be displayed inside the jumbotron
};

const Jumbotron: React.FC<JumbotronProps> = ({ small, background, children }): JSX.Element => (
    <>
        <div
            className={[styles.jumbotron, small && styles.jumbotronSmall].join(" ")}>
            <img
                src={background}
                alt="alt"
                className={styles.darkIMG}
            />
            {children} {/* Render the content inside the jumbotron */}
        </div>
    </>
);

export default Jumbotron;

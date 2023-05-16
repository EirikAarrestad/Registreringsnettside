import styles from "./navbar.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationAnchor {
    header: string; // Header text for the navigation anchor
    url: string; // URL to navigate to
}

const Navbar = (): JSX.Element => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [showNavbar, toggleNavbar] = useState<boolean>(true);

    const router = useRouter();

    const handleLinkClick = (url: string) => {
        router.push(url);
    };

    // Array of navigation anchors
    const navigationAnchors: NavigationAnchor[] = [
        {
            header: "Registrer Ny Politiker",
            url: "/addPolitician",
        },
        {
            header: "Politikere",
            url: "/displayPoliticians",
        },
        {
            header: "Hjem",
            url: "/",
        },
    ];

    useEffect(() => {
        // Handle scroll event
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        // Trigger initial state update and add scroll event listener
        handleScroll();
        window.addEventListener("scroll", handleScroll);

        // Add burger script
        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/ccac5df2b0.js";
        script.async = true;
        document.body.appendChild(script);

        // Clean up scroll event listener and remove script on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            {/* Navbar container */}
            <div
                className={`${styles.navbar} ${
                    scrollY < 150 || !showNavbar ? "" : styles.navbarScrolled
                }`}
                style={showNavbar ? {} : { backgroundColor: "black" }}
            >
                <div className={styles.innerNavbar}>
                    {/* Navbar brand */}
                    <Link href="/" as="/">
                        <div className={styles.navbarBrandLeft}></div>
                        <div className={styles.navbarBrandRight}>
                            <br />
                            <br />
                        </div>
                    </Link>
                    {/* Navbar navigation anchors */}
                    <div className={styles.navbarRight}>
                        {navigationAnchors.map((anchor) => {
                            return (
                                <a
                                    className={styles.navbarRightA}
                                    key={anchor.header}
                                    onClick={()=> handleLinkClick(anchor.url)}
                                >
                                    <span className={styles.whiteButton}>
                                        {anchor.header}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                    {/* Burger menu */}
                    <div
                        className={styles.burger}
                        onClick={() => toggleNavbar(!showNavbar)}
                    >
                        <a className="icon">
                            <i
                                style={{ color: "white" }}
                                className="fa fa-bars"
                            ></i>
                        </a>
                    </div>
                </div>
                {/* Mobile navigation menu */}
                <div
                    style={
                        showNavbar ? { display: "none" } : { display: "block" }
                    }
                >
                    {navigationAnchors.map((anchor) => {
                        return (
                            <Link
                                onClick={() => toggleNavbar(!showNavbar)}
                                href={anchor.url}
                                key={anchor.header}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        padding: "20px",
                                        fontSize: "20px",
                                        textAlign: "center",
                                    }}
                                    className={styles.whiteButton}
                                >
                                    {anchor.header.toUpperCase()}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;

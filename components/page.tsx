import Footer from "./footer";
import Head from "next/head";
import Navbar from "./navbar";

type PageProps = {
    title?: string; // Title of the page (optional)
    description?: string; // Description of the page (optional)
    children: React.ReactNode; // Content to be displayed inside the page
};

// The Page component is a layout component that sets up the basic structure of a page. 
// It includes a Head component for setting metadata
// A Navbar component at the top
// The main content specified by the children prop
// And a Footer component at the bottom

const Page: React.FC<PageProps> = ({ title, description, children }) => (
    <>
        <Head>
            <title>{title || "Politikere"}</title> {/* Set the title of the page. If no title is provided, default to "Politikere" */}
            <meta name="description" content={description} /> 
            <link rel="icon" href="/png_liten_trans.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" /> 
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> 
            <link href={"https://fonts.googleapis.com/css2?family=Secular+One&display=swap"} rel="stylesheet"></link>
            <link href={"https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Secular+One&display=swap"} rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Miriam+Libre:wght@400;700&display=swap" rel="stylesheet"></link> 
        </Head>
        <Navbar /> 
        {children} 
        <Footer /> 
    </>
);

export default Page;

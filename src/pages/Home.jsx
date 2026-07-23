import Hero from "../sections/Hero";
import { Helmet } from "react-helmet-async";
import ProductIntro from "../components/ProductIntro";
import ClientMarquee from "../components/ClientMarquee";
import IndustryVerticals from "../components/IndustryVerticals";
import FounderMessage from "../components/FounderMessage";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Sarawagi Enterprises | Top Industrial Distributor in Jamshedpur
        </title>
        <meta
          name="description"
          content="Sarawagi Enterprises is a trusted industrial solutions provider specializing in
          industrial valves, filtration systems, construction chemicals, and protective coatings. We are authorized dealers
           and distributors of leading global and Indian brands, delivering reliable products and expert technical support."
        />
      </Helmet>
      <Hero />
      <ProductIntro />
      <FounderMessage />
      <IndustryVerticals />
      <ClientMarquee />
    </>
  );
}

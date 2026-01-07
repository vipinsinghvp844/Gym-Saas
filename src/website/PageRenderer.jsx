import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

import Hero from "./sections/Hero";
import Features from "./sections/Features";
import CTA from "./sections/CTA";
import RegisterForm from "./sections/RegisterForm";
import PublicHeader from "./sections/Header";
import PublicFooter from "./sections/Footer";
import Pricing from "./sections/pricing";
import Testimonials from "./sections/Testimonials";
import Gallery from "./sections/Gallery";


const sectionMap = {
  header:PublicHeader,
  hero: Hero,
  features: Features,
  cta: CTA,
  pricing:Pricing,
  testimonials:Testimonials,
  gallery:Gallery,
  register_form: RegisterForm,
  footer: PublicFooter,
};

const PageRenderer = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    try {
      const res = await publicApi.get(
        `/pages/get-by-slug.php?slug=${slug}`
      );
      setPage(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!page) return <h3>Loading page...</h3>;

  const structure = JSON.parse(page.structure_json);
  const data = JSON.parse(page.page_data_json || "{}");

  return (
    <div>
      {structure.sections.map((section, index) => {
        const Component = sectionMap[section.type];
        if (!Component) return null;

        return (
          <Component
            key={index}
            data={data[section.type] || {}}
          />
        );
      })}
    </div>
  );
};

export default PageRenderer;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import publicApi from "../services/publicApi";

import Hero from "./sections/Hero";
import Features from "./sections/Features";
import CTA from "./sections/CTA";
import RegisterForm from "./sections/RegisterForm";


const sectionMap = {
  hero: Hero,
  features: Features,
  cta: CTA,
  register_form: RegisterForm,
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicApi from "../services/publicApi";

import Hero from "./sections/Hero";
import Features from "./sections/Features";
import RegisterForm from "./sections/RegisterForm";

const sectionMap = {
  hero: Hero,
  features: Features,
  register_form: RegisterForm,
};

const GymPageRenderer = () => {
  const { gym, slug } = useParams();
  const [page, setPage] = useState(null);
  const [gymInfo, setGymInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPage();
  }, [gym, slug]);

  const loadPage = async () => {
    try {
      const res = await publicApi.get(
        `/public/gym-page.php?gym=${gym}&page=${slug || "home"}`
      );

      setGymInfo(res.data.gym);
      setPage(res.data.page);
    } catch (err) {
      setError("Page not found");
    }
  };

  if (error) return <p>{error}</p>;
  if (!page || !gymInfo) return <p>Loading...</p>;

  const structure = JSON.parse(page.structure_json || "{}");
  const pageData = JSON.parse(page.page_data_json || "{}");
  console.log(pageData);
  

  return (
    <div>
      <h1>{gymInfo.name}</h1>

      {Array.isArray(structure.sections) &&
        structure.sections.map((sec, i) => {
          const Section = sectionMap[sec.type];
          if (!Section) return null;

          return (
            <Section
              key={i}
              data={pageData[sec.type] || {}}
            />
          );
        })}
    </div>
  );
};

export default GymPageRenderer;

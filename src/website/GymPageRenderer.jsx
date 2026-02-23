import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicApi from "../services/publicApi";
import GymLoader from "../components/ui/GymLoader";

import GymHero from "./sections/GymHero";
import GymCTA from "./sections/GymCTA";
import GymRegistrationForm from "./sections/GymRegistrationForm.jsx";
import GymHeader from "./sections/GymHeader";
import GymFooter from "./sections/GymFooter";
import GymPricing from "./sections/GymPricing";
import GymGallery from "./sections/GymGallery";
import GymTestimonials from "./sections/GymTestimonials";
import GymFeatures from "./sections/GymFeatures";
import GymContactLocation from "./sections/GymContactLocation.jsx";


const sectionMap = {
  header: GymHeader,
  hero: GymHero,
  features: GymFeatures,
  cta: GymCTA,
  pricing: GymPricing,
  gallery: GymGallery,
  testimonials: GymTestimonials,
  register_form: GymRegistrationForm,
  contact_location: GymContactLocation,
  footer: GymFooter,
};

const safeParse = (str, fallback = {}) => {
  try {
    return JSON.parse(str || "{}");
  } catch {
    return fallback;
  }
};

const GymPageRenderer = () => {
  const { gym, slug } = useParams();

  const [page, setPage] = useState(null);
  const [gymInfo, setGymInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPage();
  }, [gym, slug]);

  const loadPage = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await publicApi.get(
        `/public/gym-page.php?gym=${gym}&page=${slug || "home"}`
      );

      setGymInfo(res.data.gym);
      setPage(res.data.page);
    } catch (err) {
      console.error(err);
      setError("Page not found");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     STATES
  ====================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GymLoader label="Loading Website..." />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Page not found
      </div>
    );
  }

  /* ======================
     PARSE DATA SAFE
  ====================== */

  const structure = safeParse(page.structure_json);
  const pageData = safeParse(page.page_data_json);

  return (
    <div>
      {/* optional gym name */}
      {/* <h1>{gymInfo?.name}</h1> */}

      {Array.isArray(structure.sections) &&
        structure.sections.map((sec, i) => {
          const Section = sectionMap[sec.type];
          if (!Section) return null;

          // ✅ IMPORTANT FIX
          const sectionKey = sec.id || sec.type;
          const data =
            pageData[sectionKey] ||
            pageData[sec.type] ||
            {};

          return (
            <Section
              key={sectionKey + "_" + i}
              data={data}
              section={sec}
            />
          );
        })}
    </div>
  );
};

export default GymPageRenderer;

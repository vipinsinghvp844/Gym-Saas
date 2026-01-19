import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import publicApi from "../services/publicApi";

import Hero from "./sections/Hero";
import Features from "./sections/Features";
import CTA from "./sections/CTA";
import RegisterForm from "./sections/RegisterForm";
import PublicHeader from "./sections/Header";
import PublicFooter from "./sections/Footer";
import Pricing from "./sections/Pricing";
import Testimonials from "./sections/Testimonials";
import Gallery from "./sections/Gallery";

const sectionMap = {
  header: PublicHeader,
  hero: Hero,
  features: Features,
  cta: CTA,
  pricing: Pricing,
  testimonials: Testimonials,
  gallery: Gallery,
  register_form: RegisterForm,
  footer: PublicFooter,
};

const PageRenderer = () => {
  const { slug } = useParams();
  const finalSlug = slug || "home";

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ selected plan from pricing
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalSlug]);

  const loadPage = async () => {
    try {
      setLoading(true);
      const res = await publicApi.get(`/pages/get-by-slug.php?slug=${finalSlug}`);
      setPage(res.data.data || null);
    } catch (err) {
      console.error(err);
      setPage(null);
    } finally {
      setLoading(false);
    }
  };

  const structure = useMemo(() => {
    try {
      return JSON.parse(page?.structure_json || "{}");
    } catch {
      return {};
    }
  }, [page]);

  const data = useMemo(() => {
    try {
      return JSON.parse(page?.page_data_json || "{}");
    } catch {
      return {};
    }
  }, [page]);

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // fallback if id not found
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    scrollToRegister();
  };

  if (loading && !page) return <h3>Loading page...</h3>;
  if (!page) return <h3>Page not found</h3>;

  return (
    <div>
      {(structure.sections || []).map((section, index) => {
        const Component = sectionMap[section.type];
        if (!Component) return null;

        // ✅ sectionKey: new format uses section.id, old uses type
        const sectionKey = section.id || section.type;

        // ✅ section data: new format stored by id, old stored by type
        const sectionData = data?.[sectionKey] || data?.[section.type] || {};

        // ✅ inject special props only for specific sections
        if (section.type === "pricing") {
          return (
            <Pricing
              key={sectionKey || index}
              data={sectionData}
              page={page}
              section={section}
              onSelectPlan={handlePlanSelect}
              selectedPlan={selectedPlan}
            />
          );
        }

        if (section.type === "register_form") {
          return (
            <RegisterForm
              key={sectionKey || index}
              data={sectionData}
              page={page}
              section={section}
              selectedPlan={selectedPlan}
              onPlanReset={() => setSelectedPlan(null)}
            />
          );
        }

        return (
          <Component
            key={sectionKey || index}
            data={sectionData}
            page={page}
            section={section}
          />
        );
      })}
    </div>
  );
};

export default PageRenderer;

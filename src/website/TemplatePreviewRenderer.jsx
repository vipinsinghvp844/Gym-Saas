import Hero from "./sections/Hero";
import Features from "./sections/Features";
import CTA from "./sections/CTA";
import RegisterForm from "./sections/RegisterForm";
import PublicHeader from "./sections/Header";
import PublicFooter from "./sections/Footer";
import Pricing from "./sections/Pricing";
import Testimonials from "./sections/Testimonials";
import Gallery from "./sections/Gallery";
import GymHeader from "./sections/GymHeader";
import GymHero from "./sections/GymHero";
import GymFeatures from "./sections/GymFeatures";
import GymCTA from "./sections/GymCTA";
import GymPricing from "./sections/GymPricing";
import GymTestimonials from "./sections/GymTestimonials";
import GymGallery from "./sections/GymGallery";
import GymRegistrationForm from "./sections/GymRegistrationForm";
import GymContactLocation from "./sections/GymContactLocation";
import GymFooter from "./sections/GymFooter";

// ✅ same map as PageRenderer
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
const sectionMap2 = {
  header: GymHeader,
  hero: GymHero,
  features: GymFeatures,
  cta: GymCTA,
  pricing: GymPricing,
  testimonials: GymTestimonials,
  gallery: GymGallery,
  register_form: GymRegistrationForm,
  contact_location: GymContactLocation,
  footer: GymFooter,
};

const safeParse = (str) => {
  try {
    return JSON.parse(str || "{}");
  } catch {
    return {};
  }
};

const TemplatePreviewRenderer = ({
  type = "platform",
  structure_json,
  page_data_json,
}) => {
  

  const structure = safeParse(structure_json);
  const pageData = safeParse(page_data_json);

  const sections = structure.sections || [];

  const activeSectionMap =
    type === "gym" ? sectionMap2 : sectionMap;

  if (!sections.length) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        No sections found in this template.
      </div>
    );
  }

  return (
    <div className="bg-white">
      {sections.map((section, index) => {

        const Component =
          activeSectionMap[section.type];

        if (!Component) return null;

        const key = section.id || section.type;
        const data =
          pageData[key] ||
          pageData[section.type] ||
          {};

        return (
          <Component
            key={key + "_" + index}
            data={data}
            section={section}
            previewMode={true}
          />
        );
      })}
    </div>
  );
};

export default TemplatePreviewRenderer;

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

/* =========================
   SAFE JSON ARRAY PARSER
   (handles string | array | null)
========================= */
const safeArray = (value, fallback = []) => {
    if (!value) return fallback;

    // already array
    if (Array.isArray(value)) return value;

    // try parse JSON string
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch {
        return fallback;
    }
};

const GymHeader = ({
    data = {},
    gym,
    previewMode = false,
}) => {

    /* =========================
       DEFAULT VALUES
    ========================= */
    const {
        logo_text = "FITPRO",
        button_text = "Join Now",
        button_link = "register",
    } = data;

    /* =========================
       SAFE MENU (IMPORTANT FIX)
    ========================= */
    const menu = useMemo(
        () =>
            safeArray(data.menu, [
                { label: "Home", link: "home" },
                { label: "About", link: "about" },
                { label: "Features", link: "features" },
                { label: "Plans", link: "plans" },
                { label: "Gallery", link: "gallery" },
                { label: "Testimonials", link: "testimonials" },
                { label: "Contact", link: "contact" },
            ]),
        [data.menu]
    );

    const [open, setOpen] = useState(false);

    /* =========================
       URL BUILDER
    ========================= */
    const buildLink = (slug) => {
        if (previewMode) return "#";

        // platform website
        if (!gym) return `/p/${slug}`;

        // gym website
        return `/g/${gym}/${slug}`;
    };
    const scrollToSection = (slug) => {
        if (previewMode) return;

        const el = document.getElementById(slug);

        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    /* =========================
       UI
    ========================= */
    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* ===== LOGO ===== */}
                <div className="text-white font-bold text-lg tracking-wide">
                    {logo_text}
                </div>

                {/* ===== DESKTOP MENU ===== */}
                <nav className="hidden md:flex items-center gap-8">
                    {menu.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToSection(item.link)}
                            className="text-sm text-white/80 hover:text-white transition"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* ===== CTA BUTTON ===== */}
                <div className="hidden md:block">
                    <button
                        onClick={() => scrollToSection(button_link)}
                        className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                    >
                        {button_text}
                    </button>
                </div>

                {/* ===== MOBILE MENU BUTTON ===== */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white text-xl"
                >
                    ☰
                </button>
            </div>

            {/* ===== MOBILE MENU ===== */}
            {open && (
                <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 space-y-4">
                    {menu.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                scrollToSection(item.link);
                                setOpen(false);
                            }}
                            className="block text-white/80"
                        >
                            {item.label}
                        </button>
                    ))}

                    <button
                        onClick={() => scrollToSection(button_link)}
                        className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                    >
                        {button_text}
                    </button>
                </div>
            )}
        </header>
    );
};

export default GymHeader;
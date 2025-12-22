const Hero = ({ data }) => {
  return (
    <section style={{ padding: 40, background: "#eee" }}>
      <h1>{data.title || "Default Title"}</h1>
      <p>{data.subtitle || "Subtitle here"}</p>
      <button>{data.button_text || "Get Started"}</button>
    </section>
  );
};

export default Hero;

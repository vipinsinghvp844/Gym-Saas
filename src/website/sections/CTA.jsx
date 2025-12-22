const CTA = ({ data }) => {
  return (
    <section style={{ padding: 40, background: "#ddd" }}>
      <h3>{data.text || "Ready to start?"}</h3>
      <button>{data.button || "Join Now"}</button>
    </section>
  );
};

export default CTA;

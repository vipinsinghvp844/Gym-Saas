const Features = ({ data }) => {
  const items = Array.isArray(data?.items) ? data.items : [];
  

  return (
    <section style={{ padding: 40 }}>
      <h2>{data?.heading || "Features"}</h2>

      {items.length === 0 ? (
        <p>No features added yet.</p>
      ) : (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Features;

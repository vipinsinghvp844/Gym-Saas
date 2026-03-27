const Avatar = ({ firstName, lastName, image, size = 40 }) => {
  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={firstName}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg,#8b5cf6,#ec4899)",
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;

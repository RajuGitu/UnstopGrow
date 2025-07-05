const getColorMap = {
  green: {
    from: "#ecfdf5", to: "#d1fae5", border: "#a7f3d0", text: "#059669", dark: "#065f46",
  },
  purple: {
    from: "#f3e8ff", to: "#e9d5ff", border: "#d8b4fe", text: "#7e22ce", dark: "#581c87",
  },
  blue: {
    from: "#eff6ff", to: "#dbeafe", border: "#bfdbfe", text: "#2563eb", dark: "#1e3a8a",
  },
};

const MetricCard = ({ title, value, icon, color }) => {
  const selected = getColorMap[color];

  return (
    <div
      className="rounded-lg shadow-sm p-6 border"
      style={{
        background: `linear-gradient(to bottom right, ${selected.from}, ${selected.to})`,
        borderColor: selected.border,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: selected.text }}>{title}</p>
          <p className="text-3xl font-bold mt-1" style={{ color: selected.dark }}>{value}</p>
          <p className="text-xs flex items-center mt-1" style={{ color: selected.text }}>
          </p>
        </div>
        <div className="h-8 w-8" style={{ color: selected.text }}>{icon}</div>
      </div>
    </div>
  );
};

export default MetricCard;
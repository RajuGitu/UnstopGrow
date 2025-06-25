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
  // add more colors
};

const MetricCard = ({ title, value, change, icon, color }) => {
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
            <svg
              className="h-3 w-3 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17L17 7" />
            </svg>
            {change}
          </p>
        </div>
        <div className="h-8 w-8" style={{ color: selected.text }}>{icon}</div>
      </div>
    </div>
  );
};

export default MetricCard;
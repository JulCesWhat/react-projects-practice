import { useFeatureFlags } from "./FeatureFlagsProvider";

const FeatureFlags = () => {
  const { status, flags, error } = useFeatureFlags();

  if (status === "loading") return <div>Loading</div>;
  if (status === "error") return <div>{error}</div>;

  return (
    <div className="feature-flag-container">
      <h1>Feature Flags</h1>
      <div className="sub-container">
        {Object.entries(flags).map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>:{" "}
            <span>{value ? "is enabled" : "is disabled"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeatureFlags;

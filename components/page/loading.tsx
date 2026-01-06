export default function LoadingAnimation() {
  return (
    <div
      className=""
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eff3fc",
      }}
    >
      <div
        className=""
        style={{
          width: 200,
          height: 100,
          backgroundImage: "url('/logo/logo.gif')",
          backgroundSize: "110%",
          backgroundPosition: "center",
          filter: "map-url('#grayscale')",
        }}
      ></div>
    </div>
  );
}

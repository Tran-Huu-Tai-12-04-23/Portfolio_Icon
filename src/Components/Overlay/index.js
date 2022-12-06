function Overlay() {
  return (
    <div
      className='overlay'
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: "#000",
      }}
    />
  );
}

export default Overlay;

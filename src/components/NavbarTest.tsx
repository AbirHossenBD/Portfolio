"use client";

export function NavbarTest() {
  return (
    <div style={{
      position: "fixed",
      top: "20px",
      left: "20px",
      width: "100px",
      height: "100px",
      backgroundColor: "red",
      zIndex: 99999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "24px",
      fontWeight: "bold",
      cursor: "pointer"
    }}
    onClick={() => console.log("TEST CLICKED")}
    >
      TEST
    </div>
  );
}

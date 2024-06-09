import logo from "../../images/react.png";

export default function Header() {
  return (
    <div className="pt-3 py-2 pl-2" style={{ borderBottom: "1px solid #777" }}>
      <img src={logo} style={{ height: "35px", verticalAlign: "top" }}></img>
      <span className="h2 pt-4 m-2 text-white-50"> CONTACTOPEDIA</span>
    </div>
  );
}

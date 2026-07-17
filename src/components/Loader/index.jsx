import "../Loader/Loader.css";
import logo from "../../assets/wealthwise.png";

const Loader = () => {
  return (
    <div className="loader_con">
      <div className="loader-ring-wrap">
        <div className="loader-ring" />
        <div className="loader-ring-inner" />
        <div className="loader-logo-center">
          <img src={logo} alt="Wealth Wise" />
        </div>
      </div>

      <p className="loader-wordmark">Wealth Wise</p>
      <p className="loader-tagline">Digital Banking</p>

      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
};

export default Loader;

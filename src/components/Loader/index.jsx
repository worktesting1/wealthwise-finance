import "../Loader/Loader.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CirclesWithBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader_con">
      <CirclesWithBar
        height="100"
        width="100"
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
      <h1 data-aos="flip-up">Wealth Wise</h1>
      <h1 data-aos="flip-down"></h1>
    </div>
  );
};

export default Loader;

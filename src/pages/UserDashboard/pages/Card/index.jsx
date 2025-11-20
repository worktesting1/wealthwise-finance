import { useEffect, useState } from "react";
import "./styles.css";
// import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DebitCard from "./DebitCard";
import Location from "./Location";
import map from "../../../../assets/images/map.png";
import visa from "../../../../assets/images/visa.png";
import pattern from "../../../../assets/images/pattern.png";
import chip from "../../../../assets/images/chip.png";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../context/context";
import Sidebar from "../../components/Sidbar";
import DesktopHeader from "../../components/DesktopHeader";

const CardContent = () => {
  const [step, setStep] = useState(1);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { cardAmount, cardIssuing } = user;
  const { userCards } = useGlobalContext();
  const cardDetails = userCards[0];

  const navigateToNextStep = () => {
    if (cardIssuing === true) {
      setStep(2);
    } else {
      notify();
    }
  };

  const notify = () =>
    toast.error("Error, Please Contact Customer Care To Get Card");

  return (
    <section>
      <div className="card_wrapper">
        {cardDetails === undefined ? (
          step === 1 ? (
            <>
              <div
                style={{ marginTop: 100, marginBottom: 40 }}
                className="card_header_sect"
              >
                <h3>Issuing Fee</h3>
                <button onClick={navigateToNextStep}>Get A Card</button>
              </div>
              <div style={{ marginTop: 0 }} className="card">
                <div className="card_inner">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(45deg, #0045c7,#ff2c7d
                      )`,
                    }}
                    className="card_front default_card"
                  >
                    <img src={map} alt="map" className="map_image" />
                    <div className="row">
                      <img src={chip} alt="chip" />
                      <img src={visa} alt="visa" className="visa" />
                    </div>
                    <h3>Wealth Wise Card</h3>
                  </div>
                  <div
                    style={{
                      backgroundImage: `linear-gradient(45deg, #0045c7, #ff2c7d
                      )`,
                    }}
                    className="card_back"
                  >
                    <img src={map} alt="map" className="map_image" />
                    <div className="bar_code"></div>
                    <div className="row card_cvv">
                      <div>
                        <img src={pattern} alt="pattern" />
                      </div>
                      <p>{234}</p>
                    </div>
                    <div className="row card_text">
                      <p>
                        With our International Debit Card, Spend easily and
                        securely anywhere, at any time.
                      </p>
                    </div>

                    <div className="row signature">
                      <p>CUSTOMER SIGNATURE</p>
                      <img src={visa} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            cardDetails?.status !== "approved" && (
              <>
                <div className="card_header_sect">
                  <p>Issuing Fee</p>
                  <p>${cardAmount}</p>
                </div>
                <div
                  style={{ margin: 0, marginTop: 20 }}
                  className="card_header_sect"
                >
                  <p>Delivery Cost</p>
                  <p>Base on location</p>
                </div>
                <Location />
              </>
            )
          )
        ) : cardDetails?.status === "approved" ? (
          <DebitCard
            card_number={cardDetails?.cardNumber}
            name={cardDetails?.name}
            ccv={cardDetails.ccv}
            cardType={cardDetails?.cardType}
            createdAt={cardDetails?.createdAt}
          />
        ) : (
          <div className="card">
            <div className="card_inner">
              <div className="card_front verification_card">
                <img src={map} alt="map" className="map_image" />
                <h3>Verifying Payment For Card</h3>
              </div>
              <div className="card_back">
                <img src={map} alt="map" className="map_image" />
              </div>
            </div>
          </div>
        )}
        <p>
          With our International Debit Card, which is accepted everywhere and
          ideal for easy international transactions, internet shopping, and
          travel, you can truly enjoy financial freedom. Spend easily and
          securely anywhere, at any time, use our debit card to withdraw money
          freely without fees or any hickup.
        </p>
      </div>
    </section>
  );
};

const Card = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = JSON.parse(sessionStorage.getItem("userToken"));
  const _id = user._id;
  const {
    getUserWithdrawals,
    getTotalBalance,
    getKYC,
    getUser,
    getAllDeposits,
    getAllLoans,
    getAllCard,
  } = useGlobalContext();
  useEffect(() => {
    getUserWithdrawals(token, _id);
    getUser(token, _id);
    getTotalBalance(_id, token);
    getKYC(token, _id);
    getAllDeposits(token, _id);
    getAllLoans(token, _id);
    getAllCard(token, _id);
  }, []);
  return (
    <>
      <div className="bank_dashbaord">
        <CardContent />
      </div>
      <div className="bank_desktop_dashboard">
        <Sidebar />
        <div className="bank_desktop_dashboard_body">
          <DesktopHeader />
          <CardContent />
        </div>
      </div>
    </>
  );
};

export default Card;

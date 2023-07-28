import { useState, useEffect } from "react";
import EmiDataTable from "../emiDataTable/emiDataTable";
import { useNavigate } from "react-router-dom";

import { Loan } from "loanjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

function CalculationPage(props) {
  const {
    loanDetails,
    onClickSuggestion,
    currencySymbol,
    onClickSuggTabBackBtn,
    updateInputValues,
  } = props;
  const [emiTableBox, setEmiTableBox] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const [showTabBackBtn, setShowTabBackBtn] = useState(false);

  const navigate = useNavigate();

  const [loanDetailsBtnText, setLoanDetailsBtnText] =
    useState("Hide Loan Details");

  const [suggestionsArray, setSuggestionsArray] = useState([
    {
      suggestion:
        " Choose 5 years and get 5% less intrest rate on the total Principal",
    },
    {
      suggestion:
        " Choose 4 years and get 8% less intrest rate on the total Principal",
    },
  ]);

  useEffect(() => {
    // Update 'isMobile' state whenever the window size changes
    const activePage = window.location.pathname;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth >= 600 && activePage !== "/") {
        navigate("/");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickViewLoanDetails = () => {
    if (loanDetailsBtnText === "View Loan Details") {
      setLoanDetailsBtnText("Hide Loan Details");
      setEmiTableBox(true);
    } else if (loanDetailsBtnText === "Hide Loan Details") {
      setLoanDetailsBtnText("View Loan Details");
      setEmiTableBox(false);
    }
  };

  const handleClickSuggestion = (index) => {
    onClickSuggestion(index + 1);
    setShowTabBackBtn(true);

    {
      isMobile && navigate("/suggestion");
    }
  };

  const handleClickBackButton = () => {
    updateInputValues("1", "2");
    navigate("/");
  };

  const handleClickTabBackButton = () => {
    onClickSuggTabBackBtn();
    setShowTabBackBtn(false);
  };

  return (
    <div className="calculation-page">
      <div>
        <div>
          {/* <button onClick={handleClickBackButton} className="back-button">
            Back
          </button> */}
          <FontAwesomeIcon
            onClick={handleClickBackButton}
            className="back-button"
            icon={faCircleChevronLeft}
          />
          {showTabBackBtn && (
            // <button
            //   onClick={handleClickTabBackButton}
            //   className="back-button-tab"
            // >
            //   Back
            // </button>
            <FontAwesomeIcon
              className="back-button-tab"
              onClick={handleClickTabBackButton}
              icon={faCircleChevronLeft}
            />
          )}
        </div>
        <div className="calculation-page__amount-box">
          <p className="calculation-page__amount-box__description">
            EMI:
            {/* <span> $ 10,000 </span> */}
            <span>
              {currencySymbol}{" "}
              {loanDetails.installments[0].installment.toFixed(2)}
            </span>
          </p>
          <p className="calculation-page__amount-box__description">
            Total Principal:
            {/* <span> $1,000 </span> */}
            <span>
              {currencySymbol} {loanDetails.amount.toFixed(2)}
            </span>
          </p>
          <p className="calculation-page__amount-box__description">
            Intrest:
            {/* <span> $2,000 </span> */}
            <span>
              {currencySymbol} {loanDetails.interestSum.toFixed(2)}
            </span>
          </p>
          <p className="calculation-page__amount-box__description">
            Total Paid:
            {/* <span> $5,99,999 </span> */}
            <span>
              {currencySymbol} {loanDetails.sum.toFixed(2)}
            </span>
          </p>
        </div>
        <p className="calculation-page__view-details">
          <span onClick={handleClickViewLoanDetails}>{loanDetailsBtnText}</span>
        </p>
        {emiTableBox && (
          <div className="table-container">
            <div className="table-box">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Principal</th>

                    <th>interest</th>
                  </tr>
                </thead>
                <tbody>
                  <EmiDataTable emiData={loanDetails} />
                </tbody>
              </table>
            </div>
          </div>
        )}

        {suggestionsArray.map((eachSuggestion, index) => (
          <div
            className="sugessions-page__suggestion"
            onClick={() => handleClickSuggestion(index)}
            key={index}
          >
            <p>{eachSuggestion.suggestion} </p>
            <span>*Suggested for 5years 4months </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalculationPage;

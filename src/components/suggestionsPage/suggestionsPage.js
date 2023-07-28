import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { Loan } from "loanjs";
function SuggestionsPage(props) {
  const {
    presentLoanDetais,
    previousLoanDetais,
    suggestedDuration,
    duration,
    currencySymbol,
    onClickSuggTabBackBtn,
  } = props;

  const navigate = useNavigate();

  const years = Math.trunc(duration / 12);
  const months = duration % 12;

  const suggestedYears = Math.trunc(suggestedDuration / 12);
  const suggestedMonths = suggestedDuration % 12;

  const handleClickBackButton = () => {
    navigate("/calculation");
  };

  useEffect(() => {
    // Update 'isMobile' state whenever the window size changes
    const activePage = window.location.pathname;
    const handleResize = () => {
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

  return (
    <>
      <div className="comparision-page">
        <div>
          <FontAwesomeIcon
            className="back-button"
            onClick={handleClickBackButton}
            icon={faCircleChevronLeft}
          />
        </div>
        <h3 className="comparision-page__heading">Suggested</h3>
        <div className="comparision-page__compared-cards">
          <p className="comparision-page__passage">
            Loan for {years} Years {months} Months{" "}
          </p>
          <div className="calculation-page__amount-box">
            <p className="calculation-page__amount-box__description">
              EMI:
              {/* <span> $ 10,000 </span> */}
              <span>
                {currencySymbol}{" "}
                {presentLoanDetais.installments[0].installment.toFixed(2)}
              </span>
            </p>
            <p className="calculation-page__amount-box__description">
              Total Principal:
              {/* <span> $1,000 </span> */}
              <span>
                {currencySymbol} {presentLoanDetais.amount.toFixed(2)}
              </span>
            </p>
            <p className="calculation-page__amount-box__description">
              Intrest:
              {/* <span> $2,000 </span> */}
              <span>
                {currencySymbol} {presentLoanDetais.interestSum.toFixed(2)}
              </span>
            </p>
            <p className="calculation-page__amount-box__description">
              Total Paid:
              {/* <span> $5,99,999 </span> */}
              <span>
                {currencySymbol} {presentLoanDetais.sum.toFixed(2)}
              </span>
            </p>
          </div>
          <p className="comparision-page__vs">V/s</p>
          <p className="comparision-page__passage">
            Loan for {suggestedYears} Years {suggestedMonths} Months{" "}
          </p>
          <div className="calculation-page__amount-box">
            <p className="calculation-page__amount-box__description">
              EMI:
              {/* <span> $ 10,000 </span> */}
              <span>
                {currencySymbol}{" "}
                {previousLoanDetais.installments[0].installment.toFixed(2)}
              </span>
            </p>
            <p className="calculation-page__amount-box__description">
              Total Principal:
              {/* <span> $1,000 </span> */}
              <span>
                {currencySymbol} {previousLoanDetais.amount.toFixed(2)}
              </span>
            </p>
            <p className="calculation-page__amount-box__description">
              Intrest:
              {/* <span> $2,000 </span> */}
              <span>
                {currencySymbol} {previousLoanDetais.interestSum.toFixed(2)}
              </span>
            </p>
            <p className="calculation-page__amount-box__description">
              Total Paid:
              {/* <span> $5,99,999 </span> */}
              <span>
                {currencySymbol} {previousLoanDetais.sum.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        {/* <button className="form__button">Back</button> */}
      </div>
    </>
  );
}

export default SuggestionsPage;

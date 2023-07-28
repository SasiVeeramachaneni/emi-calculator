import { useState, useEffect } from "react";

import { Loan } from "loanjs";

import { v4 as uuidv4 } from "uuid";

import { Link, useNavigate } from "react-router-dom";

import EmiDataTable from "../../components/emiDataTable/emiDataTable.js";
import CalculationPage from "../calculationPage/calculationPage.js";
import SuggestionsPage from "../suggestionsPage/suggestionsPage.js";

// import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faL,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import "../../sass/main.scss";

import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";

const countryCodeToCurrencyPrefix = {
  AUG: "$ ",
  US: "$ ",
  GB: "£ ",
  EU: "€ ",
  IN: "₹ ",
};

const countryOptions = [
  { value: "AUG", label: "Australia" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "EU", label: "Eurozone" },
  { value: "IN", label: "India" },

  // Add more countries as needed...
];

Chart.register(Tooltip, Title, Legend, ArcElement);

// const loan = new Loan(
//   1000, // amount
//   12, // installments number
//   5, // interest rate
//   true // diminishing
// );

function HomePage(props) {
  const {
    getLoanDetails,
    loanAmountVal,
    intrestRateVal,
    yearVal,
    monthVal,
    downPaymentVal,
  } = props;

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isTab, setIsTab] = useState(
    window.innerWidth >= 600 && window.innerWidth <= 900
  );

  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  const [currencySymbol, setCurrencySymbol] = useState("$ ");

  const currencyPrefix = countryCodeToCurrencyPrefix[selectedCountry.value];

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSettingsCard(false);

    setCurrencySymbol(countryCodeToCurrencyPrefix[selectedOption.value]);
  };

  const [loanAmount, setLoanAmount] = useState("0");
  const [downPayment, setDownPayment] = useState("0");
  const [intrestRate, setIntrestRate] = useState("0");
  const [year, setYear] = useState("0 Years");
  const [month, setMonth] = useState("0 Months");
  const [loanDetails, setLoanDetails] = useState(new Loan(10000, 10, 10, true));
  const [previousLoanDetais, setPreviousLoanDetais] = useState(
    new Loan(100, 10, 10, true)
  );

  const [duration, setDuration] = useState("0");
  const [suggestedDuration, setSuggestedDuration] = useState("0");

  const [loanDetailsObj, setLoanDetailsObj] = useState({
    duration: 10,
    intrestRate: 10,
    loanAmount: 10,
    downPayment: 10,
  });

  const [errMsg, setErrMsg] = useState("");

  const [displayHomePage, setDisplayHomePage] = useState(true);

  const [displayCalculation, setDisplayCalculation] = useState(false);

  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const [showBackBtn, setShowBackBtn] = useState(true);

  const [settingsCard, setSettingsCard] = useState(false);

  const handleChangeLoanAmount = (value) => {
    setLoanAmount(value);
  };

  const handleChangeDownPayment = (value) => {
    setDownPayment(value);
  };

  const handleChangeIntrestRate = (value) => {
    setIntrestRate(value);
  };

  const handleClickCalculateBtn = () => {
    const years = year.split(" ")[0];
    const months = month.split(" ")[0];
    const duration = parseInt(years) * 12 + parseInt(months);
    // setErrMsg
    const decreasedMonths = parseInt(duration) - 1;
    const loanDetObj = {
      duration,
      intrestRate,
      loanAmount,
      downPayment,
    };
    setLoanDetailsObj(loanDetObj);

    if (loanAmount === "0" || loanAmount === "" || loanAmount === undefined) {
      setErrMsg("*Enter a valid Loan Amount");
    } else if (
      year === "0 Years" &&
      (month === "0 Months" ||
        month === "1 Months" ||
        month === "2 Months" ||
        month === "3 Months")
    ) {
      setErrMsg("*Minimum Duration 4 months");
    } else if (
      intrestRate === "0" ||
      intrestRate === "" ||
      intrestRate === undefined
    ) {
      setErrMsg("*Enter a Valid Intrest");
    } else {
      setErrMsg("");
      console.log(isTab, "Is Tab");

      {
        isMobile && navigate("/calculation");
      }

      setDisplayCalculation(true);
      setDisplaySuggestions(false);
      getLoanDetails(
        new Loan(loanAmount, duration, intrestRate, true),
        new Loan(loanAmount, decreasedMonths, intrestRate, true),
        currencySymbol,
        duration,
        suggestedDuration,
        loanAmount,
        intrestRate,
        year,
        month,
        downPayment
      );

      setLoanDetails(new Loan(loanAmount, duration, intrestRate, true));
      console.log(isMobile);
    }
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleChangeYears = (event) => {
    setYear(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  // const onClickSuggestion = (index) => {
  //   const years = year.split(" ")[0];
  //   const months = month.split(" ")[0];
  //   const duration = parseInt(years) * 12 + parseInt(months);
  //   const decreasedMonths = duration - index;

  //   if (isTab && displayCalculation && displaySuggestions) {
  //     setDisplayHomePage(false);
  //   }

  //   setPreviousLoanDetais(
  //     new Loan(loanAmount, decreasedMonths, intrestRate, true)
  //   );
  //   setDuration(duration);
  //   setSuggestedDuration(decreasedMonths);
  //   setDisplaySuggestions(true);
  // };
  const onClickSuggestion = (index) => {
    const years = year.split(" ")[0];
    const months = month.split(" ")[0];
    const duration = parseInt(years) * 12 + parseInt(months);
    const decreasedMonths = duration - index;

    if (isTab && !isMobile) {
      // For tablet and desktop screen sizes
      setDisplayHomePage(false);
      setDisplayCalculation(true);
      setDisplaySuggestions(true);
    } else if (!isMobile && !isTab) {
      setDisplayHomePage(true);
      setDisplayCalculation(true);
      setDisplaySuggestions(true);
    } else {
      // For mobile screen sizes
      setDisplayHomePage(false);
      setDisplayCalculation(false);
      setDisplaySuggestions(true);
    }

    setPreviousLoanDetais(
      new Loan(loanAmount, decreasedMonths, intrestRate, true)
    );
    setDuration(duration);
    setSuggestedDuration(decreasedMonths);
  };

  const handleClickGearIcon = () => {
    setSettingsCard(!settingsCard);
  };

  const updateInputValues = () => {};

  useEffect(() => {
    // Update 'isMobile' state whenever the window size changes
    console.log("loan amount", yearVal, monthVal);
    setLoanAmount(loanAmountVal);
    setIntrestRate(intrestRateVal);
    setYear(yearVal);
    setMonth(monthVal);
    setDownPayment(downPaymentVal);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setIsTab(window.innerWidth >= 600 && window.innerWidth <= 900);

      if (window.innerWidth <= 600) {
        navigate("/");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClickSuggTabBackBtn = () => {
    setDisplayHomePage(true);
    setDisplayCalculation(true);
    setDisplaySuggestions(false);
  };

  const generateOptions = (dur, start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i}>
          {i} {dur}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="">
      <section className="section-home">
        {settingsCard && (
          <div className="popup-card">
            <div className="popup-card__content-card">
              <div className="">
                <p>Select Country</p>
                <Select
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  maxMenuHeight={160}
                />
              </div>
            </div>
          </div>
        )}
        {displayHomePage && (
          <div className="home-page">
            <div>
              <div className="home-page__head-icon-cont">
                <p className="home-page__heading">
                  <span className="home-page__heading--primary">Loan </span>{" "}
                  Details:
                </p>
                <FontAwesomeIcon
                  onClick={handleClickGearIcon}
                  className="home-page__icon"
                  icon={faGear}
                />
                {/* {settingsCard && (
                  <div className="home-page__settings-card">
                    <p>Select Country</p>
                    <Select
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    />
                  </div>
                )} */}
              </div>

              <form className="form" onSubmit={handleSubmitForm}>
                <div className="">
                  <label className="form__label">Loan Amount</label>
                  <br />
                  <CurrencyInput
                    key={selectedCountry.value} // Add key prop to force remount when selected country changes
                    id="input-example"
                    name="input-name"
                    // prefix="$ "
                    prefix={currencyPrefix}
                    className="form__input"
                    placeholder="Please enter Loan Amount"
                    decimalsLimit={2}
                    value={loanAmount}
                    defaultValue={0}
                    onValueChange={handleChangeLoanAmount}
                  />
                </div>
                <div className="">
                  <label className="form__label">Down Payment</label>
                  <br />

                  <CurrencyInput
                    id="input-example"
                    name="input-name"
                    // prefix="$ "
                    prefix={currencyPrefix}
                    className="form__input"
                    placeholder="Please enter DownPayment"
                    defaultValue={0}
                    decimalsLimit={2}
                    value={downPayment}
                    onValueChange={handleChangeDownPayment}
                  />
                </div>
                <div className="form__sub-inputs-group">
                  <div>
                    <label className="form__label">Tenure</label>
                    <br />

                    <select
                      onChange={handleChangeYears}
                      className="form__input form__input--1"
                      value={year}
                    >
                      {generateOptions("Years", 0, 60)}
                    </select>

                    <select
                      onChange={handleChangeMonth}
                      className="form__input form__input--1"
                      value={month}
                    >
                      {generateOptions("Months", 0, 11)}
                    </select>
                  </div>
                  <div className="">
                    <label className="form__label">Intrest rate</label>
                    <br />

                    <CurrencyInput
                      id="input-example"
                      name="input-name"
                      suffix="%"
                      className="form__input"
                      placeholder="Intrest rate"
                      defaultValue={0}
                      decimalsLimit={2}
                      value={intrestRate}
                      onValueChange={handleChangeIntrestRate}
                    />
                  </div>
                </div>
                <p className="error-message">{errMsg}</p>
              </form>
            </div>

            <button
              type="submit"
              onClick={handleClickCalculateBtn}
              className="form__button u-margin-top-big"
            >
              calculate your EMI
            </button>
          </div>
        )}

        {/* <CalculationPage loanDetailsObj={loanDetailsObj} /> */}

        {!isMobile && displayCalculation && (
          <CalculationPage
            loanDetails={loanDetails}
            onClickSuggestion={onClickSuggestion}
            currencySymbol={currencySymbol}
            onClickSuggTabBackBtn={onClickSuggTabBackBtn}
            showBackBtn={showBackBtn}
          />
        )}

        {!isMobile && displaySuggestions && (
          <SuggestionsPage
            presentLoanDetais={loanDetails}
            previousLoanDetais={previousLoanDetais}
            suggestedDuration={suggestedDuration}
            duration={duration}
            currencySymbol={currencySymbol}
            onClickSuggTabBackBtn={onClickSuggTabBackBtn}
          />
        )}
      </section>
    </div>
  );
}

export default HomePage;

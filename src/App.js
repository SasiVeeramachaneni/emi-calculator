import HomePage from "./components/homePage/homePage";
import CalculationPage from "./components/calculationPage/calculationPage";
import SuggestionsPage from "./components/suggestionsPage/suggestionsPage";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Loan } from "loanjs";

function App() {
  const [loanDetails, setLoanDetails] = useState(new Loan(8000, 10, 10, true));
  const [previousLoanDetais, setPreviousLoanDetais] = useState(
    new Loan(6000, 10, 10, true)
  );
  const [currencySymbol, setCurrencySymbol] = useState("$ ");
  const [duration, setDuration] = useState("0");
  const [suggestedDuration, setSuggestedDuration] = useState("0");
  const [loanAmount, setLoanAmount] = useState("0");
  const [intrestRate, setIntrestRate] = useState("0");
  const [year, setYear] = useState("0 Years");
  const [month, setMonth] = useState("0 Months");
  const [downPayment, setDownPayment] = useState("0");

  const getLoanDetails = (
    loanDet,
    prevLoanDetails,
    currSymbl,
    duration,
    suggestedDuration,
    loanAmt,
    intRate,
    yr,
    mnth,
    downPymt
  ) => {
    setLoanDetails(loanDet);
    // setPreviousLoanDetais(prevLoanDetails);
    setCurrencySymbol(currSymbl);
    setDuration(duration);
    setSuggestedDuration(suggestedDuration);
    setLoanAmount(loanAmt);
    setIntrestRate(intRate);
    setDownPayment(downPymt);
    setMonth(mnth);
    setYear(yr);
  };

  const onClickSuggestion = (index) => {
    console.log(index);
    const previousMonths = parseInt(duration) - index;
    setSuggestedDuration(previousMonths);
    setPreviousLoanDetais(
      new Loan(loanAmount, previousMonths, intrestRate, true)
    );
  };

  const updateInputValues = (one, two) => {
    console.log(one, two);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                getLoanDetails={getLoanDetails}
                loanAmountVal={loanAmount}
                intrestRateVal={intrestRate}
                durationVal={duration}
                yearVal={year}
                monthVal={month}
                downPaymentVal={downPayment}
              />
            }
          />
          <Route
            path="/calculation"
            element={
              <CalculationPage
                loanDetails={loanDetails}
                onClickSuggestion={onClickSuggestion}
                currencySymbol={currencySymbol}
                updateInputValues={updateInputValues}
              />
            }
          />

          <Route
            path="/suggestion"
            element={
              <SuggestionsPage
                presentLoanDetais={loanDetails}
                previousLoanDetais={previousLoanDetais}
                currencySymbol={currencySymbol}
                suggestedDuration={suggestedDuration}
                duration={duration}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

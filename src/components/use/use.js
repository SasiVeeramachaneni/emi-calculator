import { useState } from "react";

import { Loan } from "loanjs";

import { v4 as uuidv4 } from "uuid";

import EmiDataTable from "./components/emiDataTable/emiDataTable";

import "./App.css";

import "../src/sass/main.scss";

import CurrencyInput from "react-currency-input-field";

// import { ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";

import { Pie, Doughnut } from "react-chartjs-2";

// https://www.youtube.com/watch?v=r8zwDzlNSsA

Chart.register(Tooltip, Title, Legend, ArcElement);

// const loan = new Loan(
//   1000, // amount
//   12, // installments number
//   5, // interest rate
//   true // diminishing
// );

function App() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [intrestRate, setIntrestRate] = useState(0);
  const [data, setData] = useState({
    datasets: [
      {
        label: "",
        data: [1, 1, 1],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
    labels: ["Principal amount", "Interest Payable", "Taxes"],
  });

  const loan_1 = new Loan(10000, 10, 10, true);
  // loan on 1 000($) in 12 diminishing installments (ex. months) with 5% interest rate

  const loan_2 = new Loan(500000, 360, 3.5);
  // loan on 500 000($) in 360 equal installments (30 years) with 3.5% interest rate

  // var loan = new LoanJS.Loan(1000, 12, 5, true);
  console.log(loan_1);

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend (labels on top of the chart)
      },

      // tooltip: {
      //   callbacks: {
      //     label: (context) => {
      //       const label = context.label || "";
      //       const value = context.raw || 0;
      //       return `${label}: ${value}`;
      //     },
      //   },
      // },
    },
  };

  const handleChangeLoanAmount = (value) => {
    // const value = event.target.value.replace(/\D/g, "");
    // const formattedValue = Number(value).toLocaleString();
    // setLoanAmount(formattedValue);
    console.log(typeof value);
  };

  const handleChangeDownPayment = (value) => {
    // const value = event.target.value.replace(/\D/g, "");
    // const formattedValue = Number(value).toLocaleString();
    setDownPayment(value);
  };

  const handleChangeIntrestRate = (value) => {
    setIntrestRate(value);
  };

  const handleClickCalculateBtn = () => {};

  return (
    <div className="">
      <section className="section-home">
        <div className="home-page">
          {/* <p className="home-page__heading-primary">Loan EMI</p>
          <h3 className="home-page__heading-secondary">Calculator</h3> */}
          <div className="">
            <p className="home-page__heading">
              <span className="home-page__heading--primary">Loan </span>{" "}
              Details:
            </p>
          </div>
          <form className="form">
            ;
            <div className="">
              <label className="form__label">Loan Amount</label>
              <br />
              {/* <input
                className="form__input"
                onChange={handleChangeLoanAmount}
                value={loanAmount}
                placeholder="$ 00,000"
              /> */}
              <CurrencyInput
                id="input-example"
                name="input-name"
                prefix="$ "
                // suffix="%"
                className="form__input"
                placeholder="Please enter Loan Amount"
                defaultValue={0}
                decimalsLimit={2}
                onValueChange={handleChangeLoanAmount}
              />
            </div>
            <div className="">
              <label className="form__label">Down Payment</label>
              <br />
              {/* <input
                className="form__input"
                onChange={handleChangeDownPayment}
                value={downPayment}
                placeholder="$ 00,000"
              /> */}
              <CurrencyInput
                id="input-example"
                name="input-name"
                prefix="$ "
                // suffix="%"
                className="form__input"
                placeholder="Please enter Loan Amount"
                defaultValue={0}
                decimalsLimit={2}
                onValueChange={handleChangeDownPayment}
              />
            </div>
            <div className="form__sub-inputs-group">
              <div>
                <label className="form__label">Tenure</label>
                <br />

                {/* <input className="form__input form__input--1" /> */}
                <select className="form__input form__input--1">
                  <option>0 Years</option>
                  <option>1 Years</option>
                  <option>2 Years</option>
                  <option>3 Years</option>
                  <option>4 Years</option>
                  <option>5 Years</option>
                  <option>6 Years</option>
                  <option>7years</option>

                  <option>8 Years</option>
                  <option>9 Years</option>
                  <option>10 Years</option>
                </select>
                <select className="form__input form__input--1">
                  <option>0 Months</option>
                  <option>1 Months</option>
                  <option>2 Months</option>
                  <option>3 Months</option>
                  <option>4 Months</option>
                  <option>5 Months</option>
                  <option>6 Months</option>
                  <option>7Months</option>

                  <option>8 Months</option>
                  <option>9 Months</option>
                  <option>10 Months</option>
                  <option>11 Months</option>
                </select>
              </div>
              <div className="">
                <label className="form__label">Intrest rate</label>
                <br />
                {/* <input
                  onChange={handleChangeIntrestRate}
                  value={intrestRate}
                  className="form__input"
                /> */}
                <CurrencyInput
                  id="input-example"
                  name="input-name"
                  // prefix="$ "
                  suffix="%"
                  className="form__input"
                  placeholder="Intrest rate"
                  defaultValue={0}
                  decimalsLimit={2}
                  onValueChange={handleChangeIntrestRate}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleClickCalculateBtn}
              className="form__button"
            >
              calculate your EMI
            </button>
          </form>
        </div>

        <div className="sugessions-page">
          {/* <h3 className="sugessions-page__heading">Suggested</h3> */}
          <div className="calculation-page__amount-box">
            {/* <p className="calculation-page__amount-box__amount">$15,999</p> */}
            <p className="calculation-page__amount-box__description">
              EMI: $ 10,000
            </p>
            <p className="calculation-page__amount-box__description">
              Total Principal: $1,000
            </p>
            <p className="calculation-page__amount-box__description">
              Intrest: $2,000
            </p>
            <p className="calculation-page__amount-box__description">
              Total Paid: $5,99,999
            </p>
            {/* <p className="calculation-page__amount-box__description">
              EMI per Month
            </p> */}
          </div>
          <p className="sugessions-page__suggestion">
            Pay the first three EMIs as a down payment upfront, and avail a
            discount of 5% on the total purchase amount.
          </p>
          <p className="sugessions-page__suggestion">
            Make a down payment equal to four EMIs during the festive season and
            get a cashback of 10% on your next EMI.
          </p>
          <p className="sugessions-page__suggestion">
            Utilize your year-end bonus to make a down payment equal to six
            EMIs, and you'll be eligible for a free holiday package worth $2000.
          </p>
          <button className="form__button">View Loan Details</button>
          <table className="table">
            <thead>
              <tr>
                <th>capital</th>
                <th>installment</th>
                <th>interest</th>
                {/* <th>interestSum</th> */}
                <th>remain</th>
              </tr>
            </thead>
            <tbody>
              <EmiDataTable emiData={loan_1} />
            </tbody>
          </table>
          {/* <table className="table">
            <thead>
              <tr>
                <th>Hai</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>name</td>
                <td>email</td>
              </tr>
            </tbody>
          </table> */}
        </div>

        <div className="calculation-page">
          <h3>Suggested</h3>
          <div className="calculation-page__amount-box">
            {/* <p className="calculation-page__amount-box__amount">$15,999</p> */}
            <p className="calculation-page__amount-box__description">
              EMI: $ 10,000
            </p>
            <p className="calculation-page__amount-box__description">
              Total amount: $1,000
            </p>
            <p className="calculation-page__amount-box__description">
              Intrest: $2,000
            </p>
            <p className="calculation-page__amount-box__description">
              Paid: $5,99,999
            </p>
            {/* <p className="calculation-page__amount-box__description">
              EMI per Month
            </p> */}
          </div>
          <div className="calculation-page__pie-chart-box">
            <div className="pie-chart">
              <Doughnut data={data} options={options} />
            </div>
            <div className="calculation-page__pie-chart-box__amount">
              <div className="calculation-page__pie-chart-box__amount__item">
                <p>Principal amount</p>
                <p>$11,123</p>
              </div>
              <div className="calculation-page__pie-chart-box__amount__item">
                <p>Intrest Payable</p>
                <p>$3,123</p>
              </div>
              <div className="calculation-page__pie-chart-box__amount__item">
                <p>Taxes</p>
                <p>$2,123</p>
              </div>
            </div>
          </div>
          <div className="calculation-page__amount-description">
            <div className="calculation-page__amount-description__cont">
              <p className="calculation-page__amount-description__cont__text">
                Total Amount
              </p>
              <p className="calculation-page__amount-description__cont__amount">
                $8,59,999
              </p>
            </div>
            <div className="calculation-page__amount-description__cont">
              <p className="calculation-page__amount-description__cont__text">
                Downpayment
              </p>
              <p className="calculation-page__amount-description__cont__amount">
                $1,59,999
              </p>
            </div>
            <div className="calculation-page__amount-description__cont">
              <p className="calculation-page__amount-description__cont__text">
                Tenure
              </p>
              <p className="calculation-page__amount-description__cont__amount">
                12 months
              </p>
            </div>
            <div className="calculation-page__amount-description__cont">
              <p className="calculation-page__amount-description__cont__text">
                Intrest rate
              </p>
              <p className="calculation-page__amount-description__cont__amount">
                8.5%
              </p>
            </div>
          </div>
          <button className="form__button">Choose Your Bank</button>
        </div>
      </section>
    </div>
    // <table className="table">
    //   <thead>
    //     <tr>
    //       <th>capital</th>
    //       <th>installment</th>
    //       <th>interest</th>
    //       <th>interestSum</th>
    //       <th>remain</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <EmiDataTable emiData={loan_1} />
    //   </tbody>
    // </table>
  );
}

export default App;
// import React, { useState } from "react";
// import CurrencyInput from "react-currency-input-field";
// import Select from "react-select";

// // Sample country code to currency prefix mapping (you can replace this with actual data)
// const countryCodeToCurrencyPrefix = {
//   US: "$",
//   GB: "£",
//   EU: "€",
// };

// const countryOptions = [
//   { value: "US", label: "United States" },
//   { value: "GB", label: "United Kingdom" },
//   { value: "EU", label: "Eurozone" },
//   // Add more countries as needed...
// ];

// const CurrencyInputWithCountry = () => {
//   const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
//   };

//   const currencyPrefix = countryCodeToCurrencyPrefix[selectedCountry.value];

//   return (
//     <div>
//       <Select
//         options={countryOptions}
//         value={selectedCountry}
//         onChange={handleCountryChange}
//       />
//       <CurrencyInput
//         id="input-example"
//         name="input-name"
//         prefix={currencyPrefix}
//         placeholder="Please enter a number"
//         defaultValue={1000}
//         decimalsLimit={2}
//         onValueChange={(value, name) => console.log(value, name)}
//       />
//     </div>
//   );
// };

// export default CurrencyInputWithCountry;
// import React, { useState } from "react";
// import CurrencyInput from "react-currency-input-field";
// import { CountryList } from "react-select-country-list";

// const CurrencyInputWithCountry = () => {
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const handleCountryChange = (value) => {
//     setSelectedCountry(value);
//   };

//   const selectedCountryData = selectedCountry
//     ? CountryList.find((country) => country.value === selectedCountry.value)
//     : null;

//   const currencyPrefix = selectedCountryData ? selectedCountryData.symbol : "";

//   return (
//     <div>
//       <CountryList
//         value={selectedCountry}
//         onChange={handleCountryChange}
//         valueType="short"
//         labelType="full"
//       />
//       <CurrencyInput
//         id="input-example"
//         name="input-name"
//         prefix={currencyPrefix}
//         placeholder="Please enter a number"
//         defaultValue={1000}
//         decimalsLimit={2}
//         onValueChange={(value, name) => console.log(value, name)}
//       />
//       {/* <p>Hai</p> */}
//     </div>
//   );
// };

// export default CurrencyInputWithCountry;
// import React, { useState, useMemo } from "react";
// import Select from "react-select";
// import countryList from "react-select-country-list";

// function CountrySelector() {
//   const [value, setValue] = useState("");
//   const options = useMemo(() => countryList().getData(), []);

//   const changeHandler = (value) => {
//     setValue(value);
//   };

//   return <Select options={options} value={value} onChange={changeHandler} />;
// }

// export default CountrySelector;
// import React, { useState } from "react";
// import Select from "react-select";
// import countryData from "country-data";

// const countryOptions = countryData.countries.all.map((country) => ({
//   value: country.alpha2,
//   label: country.name,
//   currency: country.currency,
// }));

// console.log(countryOptions);

// const CurrencySelector = () => {
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
//   };

//   const selectedCountryData = selectedCountry
//     ? countryOptions.find((country) => country.value === selectedCountry.value)
//     : null;

//   return (
//     <div>
//       <Select
//         options={countryOptions}
//         value={selectedCountry}
//         onChange={handleCountryChange}
//       />
//       {selectedCountryData && (
//         <div>
//           <p>Country: {selectedCountryData.label}</p>
//           <p>Currency: {selectedCountryData.currency}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencySelector;

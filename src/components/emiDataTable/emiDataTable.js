import "../../App.css";
function EmiDataTable(props) {
  console.log(props.emiData);
  const emiData = props.emiData;
  const installments = emiData.installments;

  return (
    <>
      {installments.map((eachInstallment, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td className="tddd">{eachInstallment.capital}</td>
            {/* <td className="tddd">{eachInstallment.installment}</td> */}
            <td className="tddd">{eachInstallment.interest}</td>
            {/* <td className="tddd">{eachInstallment.interestSum}</td> */}
            {/* <td className="tddd">{eachInstallment.remain}</td> */}
          </tr>
        );
      })}
    </>
  );
}

export default EmiDataTable;

import Emptyphoto from './assets/illustration-empty.svg'
import React, {useState} from "react";
import { calculateLoanPayment } from './loan';

const initialValues = {
  amount: "",
  term: "",
  rate: "",
  type: "",
};


function Card() {

  const [screen,setScreen]=useState('2');
  const [values,setValues]=useState(initialValues);
  const [mortage,setMortage] = useState({
    monthlyPayment:0,
    totalRepayment:0,
  })

  function calculateMortage (amount,term,rate) {
    setMortage(calculateLoanPayment(amount,term,rate));
    setScreen('3');
  }

  function handleChanges(e) {
    setValues(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    calculateMortage(values.amount,values.term,values.rate);
  }

  const reload = () => {
    window.location.reload();
  }

  const monthlyPayment = parseFloat(mortage.monthlyPayment);
  const totalRepayment = parseFloat(mortage.totalRepayment);

  const formattedMonthlyPayment = isNaN(monthlyPayment) ? 'N/A' : monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedTotalRepayment = isNaN(totalRepayment) ? 'N/A' : totalRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });


  const empty = (
        <div className="two">
          <img src={Emptyphoto} alt="" />
          <h2>Results shown here</h2>
          <p className="grey">Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
        </div>
  )

  const result = (
        <div className="three">
          <h2>Your results</h2>
          <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
          <div className="result-card">
            <div className="monthly">
              <p>Your monthly repayments</p>
              <h1>${formattedMonthlyPayment}</h1>
            </div>
            <hr />
            <div className="total">
              <p>Total you'll repay over the term</p>
              <h2>${formattedTotalRepayment}</h2>
            </div>
          </div>
        </div>
  )

  const main = (
        <div className="one">
          <div className="heading-section">
          <h2>Mortgage Calculator</h2>
          <p className="clear" onClick={reload}>Clear All</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mortage-amount">
              <p>Mortage Amount</p>
              <input type="number" className="amount-input" name="amount" value={values.amount} onChange={handleChanges} />
              <p className="placeholder">$</p>
            </div>
            <div className="main-input">
              <div className="mortage-term">
                <p>Mortgage Term</p>
                <input type="number" className="year-input" name='term' value={values.term} onChange={handleChanges}/>
                <p className="placeholders">years</p>
              </div>
              <div className="mortage-rate">
                <p>Interest Rate</p>
                <input type="number" name='rate' value={values.rate} onChange={handleChanges}/>
                <p className="placeholders">%</p>
              </div>
            </div>
            <div className="mortage-type">
              <p>Mortgage Type</p>
              <div className="type-1">
              <input type="radio" name="type" id="repayment" value="repayment" checked={values.type === "repayment"} onChange={handleChanges}/><label htmlFor="repayment">Repayment</label>
              </div>
              <div className="type-2">
              <input type="radio" name="type" id="interest-only"  value="interest-only"  checked={values.type === "interest-only"} onChange={handleChanges} /><label htmlFor="interest-only">Interest Only</label>
              </div>
            </div>
            <button type='submit' className="calculate">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#133041" d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"/></svg>
              <p>Calculate Repayments</p>
            </button>
          </form>
        </div>

  )

    return(
      <div className="container">
        {main}
        {screen==2 ? empty : result}  
      </div>
    );
}

export default Card;
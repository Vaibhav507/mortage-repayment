

export function calculateLoanPayment(amount,term,rate) {
    
    const P = amount;
    const i = rate / 100 / 12;
    const n = term*12;
    const monthly = (P * (i * ((1 + i)**n)))/(((1 + i)**n) - 1);
    const total = monthly * n;

    const monthlyPayment = monthly.toFixed(2);
    const totalRepayment = total.toFixed(2);

    return{
        monthlyPayment,
        totalRepayment
    }

}

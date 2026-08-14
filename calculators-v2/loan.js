function calcLoan() {

    const price = parseFloat(document.getElementById("loanPrice").value);
    const rate = parseFloat(document.getElementById("loanRate").value);
    const years = parseFloat(document.getElementById("loanYears").value);
    const margin = 90;

    if (!price || !rate || !years) {
        document.getElementById("loanResult").innerHTML =
        "<span style='color:#ff6b6b'>Please fill in all fields.</span>";
        return;
    }

    const loanAmount = price * (margin / 100);

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    const monthly =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

    // Lawyer Fee
    let lawyerFee = "";

    if (price <= 200000) {
        lawyerFee = "RM20,000";
    } else if (price <= 400000) {
        lawyerFee = "RM25,000";
    } else if (price <= 500000) {
        lawyerFee = "RM25,000 - RM30,000";
    } else {
        lawyerFee = "RM40,000 and above";
    }

    // Valuation Fee
    let valuationFee = "";

    if (price <= 300000) {
        valuationFee = "RM1,500 - RM2,000";
    } else {
        valuationFee = "RM2,000 - RM3,000";
    }

    // Income Recommendation
    let recommendIncome = monthly / 0.35;

    let html = `

<div style="
background:#20252c;
padding:18px;
border-radius:12px;
margin-top:20px;
">

<h3 style="margin-top:0;color:#00d4ff;">
🏠 Loan Summary
</h3>

<b>Monthly Installment</b><br>
${money(monthly)}

<br><br>

<b>Lawyer Fee Estimate</b><br>
${lawyerFee}

<br><br>

<b>Valuation Fee Estimate</b><br>
${valuationFee}

<br><br>

<b>Recommended Monthly Income</b><br>
${money(recommendIncome)}

<hr style="margin:20px 0;border-color:#333;">

<div style="color:#ffc107;">
⚠ Subject to CCRIS, CTOS & Bank Approval
</div>

</div>

`;

    document.getElementById("loanResult").innerHTML = html;

}

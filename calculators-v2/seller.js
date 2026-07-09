function calcSeller() {

    const buy = parseFloat(document.getElementById("buyPrice").value) || 0;
    const sell = parseFloat(document.getElementById("sellPrice").value) || 0;
    const loan = parseFloat(document.getElementById("loanBalance").value) || 0;
    const yearsOwned = document.getElementById("yearsOwned").value;
    const lawyerType = document.getElementById("lawyerType").value;
    const bankPenalty = parseFloat(document.getElementById("bankPenalty").value) || 0;

    if (!buy || !sell) {

        document.getElementById("sellerResult").innerHTML =
        "<span style='color:#ff6b6b'>Please complete all required fields.</span>";

        return;
    }

    /* ----------------------------
       Agent Fee (3.24%)
    -----------------------------*/

    const agentFee = sell * 0.0324;

    /* ----------------------------
       Lawyer Fee
    -----------------------------*/

 let lawyerFee = 0;
let disbursement = sell * 0.0075; // 0.75%

if (lawyerType === "Own Lawyer") {

    lawyerFee = sell * 0.0085; // 0.85%

}
else {

    lawyerFee = 0;

}

    /* ----------------------------
       Gross Profit
    -----------------------------*/

    const grossProfit = sell - buy;

    const allowableExpenses =
        agentFee +
        lawyerFee +
        disbursement;

    /* ----------------------------
       RPGT
    -----------------------------*/
let rpgtRate = 0;

if (yearsOwned === "Below 3 Years") {
    rpgtRate = 30;
}
else if (yearsOwned === "4 Years") {
    rpgtRate = 15;
}
else if (yearsOwned === "5 Years") {
    rpgtRate = 5;
}
else if (yearsOwned === "More than 5 Years") {
    rpgtRate = 0;
}

let chargeableGain = grossProfit - allowableExpenses;

if (chargeableGain < 0)
    chargeableGain = 0;

const rpgt = chargeableGain * (rpgtRate / 100);
    
    /* ----------------------------
       Bank Penalty
    -----------------------------*/

    const penaltyValue =
        (bankPenalty / 100) *
        loan;

    /* ----------------------------
       Total Cost
    -----------------------------*/

    const totalCost =
        agentFee +
        lawyerFee +
        disbursement +
        rpgt +
        penaltyValue +
        loan;

    /* ----------------------------
       Net Cash
    -----------------------------*/

    const netCash =
        sell -
        totalCost;
  document.getElementById("sellerResult").innerHTML = `

<div style="
background:#1d242d;
padding:20px;
border-radius:14px;
margin-top:20px;
border:1px solid rgba(255,255,255,.08);
">

<h3 style="margin-top:0;color:#00d4ff;">
🏡 Seller Cost Summary
</h3>

<p>
<b>Buying Price</b><br>
${money(buy)}
</p>

<p>
<b>Selling Price</b><br>
${money(sell)}
</p>

<p>
<b>Gross Profit</b><br>
${money(grossProfit)}
</p>

<hr>

<h4 style="color:#00d4ff;">
🧾 Cost Breakdown
</h4>

<p>
Agent Fee (3.24%)<br>
${money(agentFee)}
</p>

<p>
Lawyer Fee<br>
${money(lawyerFee)}
</p>

<p>
Disbursement<br>
${money(disbursement)}
</p>

<p>
Allowable Expenses<br>
${money(allowableExpenses)}
</p>

<p>
RPGT (${rpgtRate}%)<br>
${money(rpgt)}
</p>

<p>
Bank Penalty<br>
${money(penaltyValue)}
</p>

<p>
Outstanding Loan<br>
${money(loan)}
</p>

<hr>

<p>
<b>Total Cost</b><br>
${money(totalCost)}
</p>

<div style="
margin-top:20px;
padding:18px;
border-radius:12px;
background:${netCash >= 0 ? "#1b5e20" : "#b71c1c"};
color:white;
text-align:center;
">

<h3 style="margin:0;">
💰 Net Cash Received
</h3>

<div style="
font-size:30px;
font-weight:700;
margin-top:10px;
">

${money(netCash)}

</div>

</div>

<p style="
margin-top:20px;
font-size:13px;
opacity:.75;
">

*Figures are estimated only. Actual legal fees, RPGT and disbursement may vary.

</p>

</div>

`;

}

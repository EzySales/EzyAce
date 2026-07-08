function calcROI() {

    const housePrice = parseFloat(document.getElementById("housePrice").value);
    const monthlyRent = parseFloat(document.getElementById("monthlyRent").value);
    const loanInstallment = parseFloat(document.getElementById("loanInstallment").value);
    const maintenanceFee = parseFloat(document.getElementById("maintenanceFee").value);
    const otherCost = parseFloat(document.getElementById("otherCost").value);

    if (
        isNaN(housePrice) ||
        isNaN(monthlyRent) ||
        isNaN(loanInstallment) ||
        isNaN(maintenanceFee) ||
        isNaN(otherCost)
    ) {
        document.getElementById("roiResult").innerHTML =
        "<span style='color:#ff6b6b'>Please fill in all fields.</span>";
        return;
    }

    // Monthly & Annual Cash Flow
    const monthlyCashFlow =
        monthlyRent - loanInstallment - maintenanceFee - otherCost;

    const annualCashFlow = monthlyCashFlow * 12;

    // Rental Yield
    const rentalYield =
        (monthlyRent * 12 / housePrice) * 100;

    // ROI
    const roi =
        (annualCashFlow / housePrice) * 100;

    // Rating
    let rating = "";
    let color = "";

    if (roi >= 8) {
        rating = "⭐⭐⭐⭐⭐ Excellent Investment";
        color = "#14a44d";
    }
    else if (roi >= 6) {
        rating = "⭐⭐⭐⭐ Good Investment";
        color = "#4caf50";
    }
    else if (roi >= 4) {
        rating = "⭐⭐⭐ Average Investment";
        color = "#ff9800";
    }
    else {
        rating = "⭐⭐ Poor Investment";
        color = "#e53935";
    }

    document.getElementById("roiResult").innerHTML = `

<div style="
background:${color};
padding:15px;
border-radius:12px;
margin-bottom:20px;
font-weight:700;
color:white;
">

${rating}

</div>

<div class="result-card">

<h3>📈 ROI Summary</h3>

<p>
<strong>Monthly Cash Flow</strong><br>
${money(monthlyCashFlow)}
</p>

<hr>

<p>
<strong>Annual Cash Flow</strong><br>
${money(annualCashFlow)}
</p>

<p>
<strong>Rental Yield</strong><br>
${rentalYield.toFixed(2)}%
</p>

<p>
<strong>Return On Investment (ROI)</strong><br>
${roi.toFixed(2)}%
</p>

<hr>

<p>
<strong>Recommendation</strong><br>

${rating}

</p>

<hr>

<p>

✔ Positive cash flow is preferred.<br>
✔ Higher rental yield generally indicates better returns.<br>
✔ Always consider vacancy, repairs and future appreciation.

</p>

</div>

`;

}

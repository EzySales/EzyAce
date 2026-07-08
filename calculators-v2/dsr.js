function money(value) {
    return "RM " + Number(value).toLocaleString("en-MY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calcDSR() {

    const income = parseFloat(document.getElementById("salary").value);
    const commitment = parseFloat(document.getElementById("commitment").value);

    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid Monthly Income.");
        return;
    }

    if (isNaN(commitment) || commitment < 0) {
        alert("Please enter a valid Existing Commitment.");
        return;
    }

    const dsr = (commitment / income) * 100;

    const maxCommitment = income * 0.65;
    const availableRepayment = Math.max(0, maxCommitment - commitment);

    // Rough property estimation
    const lowProperty = availableRepayment * 180;
    const highProperty = availableRepayment * 220;

    const lowLoan = lowProperty * 0.90;
    const highLoan = highProperty * 0.90;

    let status = "";
    let cssClass = "";

    if (dsr <= 30) {
        status = "🟢 Excellent Eligibility";
        cssClass = "success";
    } else if (dsr <= 50) {
        status = "🟢 Good Eligibility";
        cssClass = "success";
    } else if (dsr <= 70) {
        status = "🟠 Moderate Eligibility";
        cssClass = "warning";
    } else {
        status = "🔴 High Risk";
        cssClass = "danger";
    }

    document.getElementById("dsrResult").innerHTML = `

        <div class="${cssClass}">
            ${status}
        </div>

        <div class="result-card">

            <h3>📊 DSR Summary</h3>

            <p><strong>Current DSR</strong><br>${dsr.toFixed(2)}%</p>

            <hr>

            <p><strong>Maximum Monthly Repayment</strong><br>${money(maxCommitment)}</p>

            <p><strong>Available Monthly Repayment</strong><br>${money(availableRepayment)}</p>

            <hr>

            <p><strong>Estimated Property Price</strong><br>
            ${money(lowProperty)} - ${money(highProperty)}</p>

            <p><strong>Estimated Loan Amount (90%)</strong><br>
            ${money(lowLoan)} - ${money(highLoan)}</p>

            <hr>

            <p><strong>Reminder</strong></p>

            <p>
            ✔ Subject to CCRIS<br>
            ✔ Subject to CTOS<br>
            ✔ Subject to Employment Verification<br>
            ✔ Subject to Bank Approval
            </p>

        </div>

    `;

}

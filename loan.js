function startOver() {
    document.loan_form.loan_amt.value="";
    document.loan_form.periods.value="";
    document.loan_form.int_rate.value="";
    document.loan_form.extra_pmt.value="0";

    document.getElementById("loan_info").innerHTML="";
    document.getElementById("table").innerHTML="";
}

function validate() {
    
    var loan_amt = document.loan_form.loan_amt.value; 
    var periods = document.loan_form.periods.value;
    var int_rate = document.loan_form.int_rate.value;
    var extra_pmt = document.loan_form.extra_pmt.value;
    
    if(loan_amt <= 0 || isNaN(Number(loan_amt)) ) {
        alert("Enter a valid loan amount.");
        document.loan_form.loan_amt.value="";
    }

    else if(periods <= 0 || parseInt(periods) != periods) {
        alert("Enter a valid number of periods.");
        document.loan_form.periods.value="";
    }
    else if(int_rate <= 0 || isNaN(Number(int_rate)) ) {
        alert("Enter a valid interest rate number.");
        document.loan_form.int_rate.value="";
    }
    else if(extra_pmt < 0 || isNaN(Number(extra_pmt)) ) {
        alert("Enter a valid amount of extra payments.");
        document.loan_form.extra_pmt.value="0"
    }

    else {
        calculate(parseFloat(loan_amt), parseInt(periods), parseFloat(int_rate), parseFloat(extra_pmt));
    }
}

function calculate(loan_amt, periods, int_rate, extra_pmt) {
    i = int_rate/100;

    var pmt = loan_amt*(i)*Math.pow((1+i), periods) / (Math.pow((1+i), periods) - 1);

    var payment = pmt.toFixed(2);

    var pmt_extra = extra_pmt + pmt

    var info="";

    info += "<table width='250'>";
    info += "<tr><td>Loan Amount:</td>";
    info += "<td align='right'> $ "+loan_amt +"</td></tr>"
    info += "<tr><td>Number of Periods:</td>";
    info += "<td align='right'>"+periods +"</td></tr>"
    info += "<tr><td>Interest Rate:</td>";
    info += "<td align='right'>"+int_rate +"%</td></tr>"
    info += "<tr><td>Extra Payment:</td>";
    info += "<td align='right'>$ "+extra_pmt +"</td></tr>"
    info += "<tr><td>Payment per Period:</td>";
    info += "<td align='right'> $ "+payment +"</td></tr>"
    info += "<tr><td>Payment with Extra:</td>";
    info += "<td align='right'> $ "+ pmt_extra.toFixed(2) +"</td></tr>"
    info += "</table>";

    document.getElementById("loan_info").innerHTML = info;

}
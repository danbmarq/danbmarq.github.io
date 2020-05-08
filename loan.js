function startOver() {
    document.loan_form.loan_amt.value="15000";
    document.loan_form.periods.value="36";
    document.loan_form.int_rate.value="0.375";
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
    else if(extra_pmt < 0 || isNaN(Number(extra_pmt))) {
        alert("Enter a valid amount of extra payments.");
        document.loan_form.extra_pmt.value="0";
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

    var f = function thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    var info="";

    info += "<table width='250'>";
    info += "<tr><td>Loan Amount:</td>";
    info += "<td align='right'> $ "+ f(loan_amt) +"</td></tr>"
    info += "<tr><td>Number of Periods:</td>";
    info += "<td align='right'>"+periods +"</td></tr>"
    info += "<tr><td>Interest Rate:</td>";
    info += "<td align='right'>"+int_rate +"%</td></tr>"
    info += "<tr><td>Extra Payment:</td>";
    info += "<td align='right'>$ "+f(extra_pmt) +"</td></tr>"
    info += "<tr><td>Payment per Period:</td>";
    info += "<td align='right'> $ "+ f(payment) +"</td></tr>"
    info += "<tr><td>Payment with Extra:</td>";
    info += "<td align='right'> $ "+ f(pmt_extra.toFixed(2)) +"</td></tr>"
    info += "</table>";

    document.getElementById("loan_info").innerHTML = info;

    var table="";

    table += "<table cellpadding='15' border='2.25px'>";

    var current_balance = loan_amt;
    var counter = 1;
    var total_interest = 0;

    while(current_balance>0) {
        towards_int = (i)*current_balance;
        towards_balance = pmt_extra.toFixed(2) - towards_int;
        towards_balance = towards_balance.toFixed(2)
        current_balance = current_balance - towards_balance;
        current_balance = current_balance.toFixed(2)
        total_interest = total_interest + towards_int;

        table += "<tr>";
        table += "<td width='45' align='center'>"+ counter +"</td>";
        table += "<td width='65' align='center'>$ "+ f(pmt_extra.toFixed(2)) +"</td>";
        table += "<td width='65' align='center'>$ "+ f(towards_balance) +"</td>";
        table += "<td width='65' align='center'>$ "+ f(towards_int.toFixed(2)) +"</td>";
        table += "<td width='90' align='center'>$ "+ f(total_interest.toFixed(2)) +"</td>";
        table += "<td width='80' align='center'>$ "+ f(current_balance) +"</td>";
        table += "</tr>";

        counter ++;

    }

    table += "</table>";

    document.getElementById("table").innerHTML = table;
    

}

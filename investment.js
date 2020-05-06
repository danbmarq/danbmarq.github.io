function startOverInv() {
    document.inv_form.inv_amt.value="15000";
    document.inv_form.inv_periods.value="3";
    document.inv_form.rtrn_rate.value="8";

    document.getElementById("inv_info").innerHTML="";
    document.getElementById("inv_table").innerHTML="";
}

function validateInv() {
    
    var inv_amt = document.inv_form.inv_amt.value; 
    var periods = document.inv_form.inv_periods.value;
    var rtrn_rate = document.inv_form.rtrn_rate.value;
    
    if(inv_amt <= 0 || isNaN(Number(inv_amt)) ) {
        alert("Enter a valid loan amount.");
        document.inv_form.inv_amt.value="";
    }

    else if(periods <= 0 || parseInt(periods) != periods) {
        alert("Enter a valid number of periods.");
        document.inv_form.inv_periods.value="";
    }
    else if(rtrn_rate <= 0 || isNaN(Number(rtrn_rate)) ) {
        alert("Enter a valid interest rate number.");
        document.inv_form.rtrn_rate.value="";
    }
    else {
        calculate(parseFloat(inv_amt), parseInt(periods), parseFloat(rtrn_rate));
    }
}

function calculate(inv_amt, periods, rtrn_rate, extra_inv) {
    i = rtrn_rate/100;

    var ttl_rtrn = inv_amt*Math.pow((1+i), periods);

    var rtrn = ttl_rtrn-inv_amt;

    var avg_rtrn = (rtrn.toFixed(2))/periods;


    var info ="";

    info += "<table width='250'>";
    info += "<tr><td>Initial Investment:</td>";
    info += "<td align='right'> $ "+inv_amt +"</td></tr>"
    info += "<tr><td>Number of Periods:</td>";
    info += "<td align='right'>"+periods +"</td></tr>"
    info += "<tr><td>Expected Return Rate:</td>";
    info += "<td align='right'>"+rtrn_rate +"%</td></tr>"
    info += "<tr><td>Average Return per Period:</td>";
    info += "<td align='right'> $ "+avg_rtrn.toFixed(2) +"</td></tr>"
    info += "<tr><td>Total Return:</td>";
    info += "<td align='right'> $ "+ rtrn.toFixed(2) +"</td></tr>"
    info += "<tr><td>Ending Balance:</td>";
    info += "<td align='right'> $ "+ ttl_rtrn.toFixed(2) +"</td></tr>"
    info += "</table>";

    document.getElementById("inv_info").innerHTML = info ;


    var table="";

    table += "<table cellpadding='15' border='2.25px'>";

    var e;
    var current_balance = inv_amt;
    var counter = 1;
    var total_return = 0;

    for (e = 0; i < periods; i++) {

        towards_rtrn = (i)*current_balance;
        current_balance = current_balance + towards_rtrn;
        total_return = total_return + towards_rtrn;

        table += "<tr>";
        table += "<td width='60' align='center'>"+ counter +"</td>";
        table += "<td width='65' align='center'>$ "+ towards_rtrn.toFixed(2) +"</td>";
        table += "<td width='65' align='center'>$ "+ total_return +"</td>";
        table += "<td width='80' align='center'>$ "+ current_balance +"</td>";
        table += "</tr>";

        counter ++;

    }

    table += "</table>";

    document.getElementById("inv_table").innerHTML = table;

}

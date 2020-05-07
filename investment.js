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
        calculateInv(parseFloat(inv_amt), parseInt(periods), parseFloat(rtrn_rate));
    }
}

function calculateInv(inv_amt, periods, rtrn_rate, extra_inv) {
    i = rtrn_rate/100;

    var ttl_rtrn = inv_amt*Math.pow((1+i), periods);

    var rtrn = ttl_rtrn-inv_amt;

    var avg_rtrn = rtrn/periods;

    var f = function thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };


    var info ="";

    info += "<table width='250'>";
    info += "<tr><td>Initial Investment:</td>";
    info += "<td align='right'> $ "+f(inv_amt) +"</td></tr>"
    info += "<tr><td>Number of Periods:</td>";
    info += "<td align='right'>"+ periods +"</td></tr>"
    info += "<tr><td>Expected Return Rate:</td>";
    info += "<td align='right'>"+ rtrn_rate +"%</td></tr>"
    info += "<tr><td>Average Return per Period:</td>";
    info += "<td align='right'> $ "+ f(avg_rtrn.toFixed(2)) +"</td></tr>"
    info += "<tr><td>Total Return:</td>";
    info += "<td align='right'> $ "+ f(rtrn.toFixed(2)) +"</td></tr>"
    info += "<tr><td>Ending Balance:</td>";
    info += "<td align='right'> $ "+ f(ttl_rtrn.toFixed(2)) +"</td></tr>"
    info += "</table>";

    document.getElementById("inv_info").innerHTML = info ;


    var table="";

    table += "<table cellpadding='15' border='2.25px'>";

    var e;
    var current_balance = inv_amt;
    var counter = 1;
    var total_return = 0;

    for (e = 0; e < periods; e++) {

        towards_rtrn = (i)*current_balance;
        current_balance = current_balance + towards_rtrn;
        total_return = total_return + towards_rtrn;
        var prncp = current_balance - towards_rtrn;

        table += "<tr>";
        table += "<td width='75' align='center'>"+ counter +"</td>";
        table += "<td width='100' align='center'>$ "+ f(prncp.toFixed(2)) +"</td>";
        table += "<td width='90' align='center'>$ "+ f(towards_rtrn.toFixed(2)) +"</td>";
        table += "<td width='90' align='center'>$ "+ f(total_return.toFixed(2)) +"</td>";
        table += "<td width='100' align='center'>$ "+ f(current_balance.toFixed(2)) +"</td>";
        table += "</tr>";

        counter ++;

    }

    table += "</table>";

    document.getElementById("inv_table").innerHTML = table;

}

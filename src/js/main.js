$(document).ready(function() {
    // Retrieve chart 1 data
    var valid_https = 0
    var default_https = 0
    $.when(
        $.ajax({
            url: "http://192.168.240.192:3000/last_scan_stats",
            type: "GET",
            contentType: "json",
            success: function(data){
                  valid_https = data[0]["valid_https_perc"]
                  console.log(valid_https)
            }
        })
    ).then(function( data, textStatus, jqXHR ){
        console.log(valid_https)
        // Initialize doughnut charts
        ctx = $("#chart-1")
        data = {
            labels: ["Valid HTTPS", "Invalid HTTPS"],
            datasets: [{
                data: [valid_https, 100-valid_https],
                backgroundColor: ["#6ecd1b", "#ffffff"]
            }]
        }
        var myDoughnutChart = new Chart(ctx, {
            type: "doughnut",
            data: data
        })


        ctx = $("#chart-2")
        data = {
            labels: ["Valid HTTPS", "Invalid HTTPS"],
            datasets: [{
                data: [valid_https, 100-valid_https],
                backgroundColor: ["#6ecd1b", "#ffffff"]
            }]
        }
        var myDoughnutChart2 = new Chart(ctx, {
            type: "doughnut",
            data: data
        })
    })

    // Initialize data table
    $("#data-table").DataTable( {
        "processing": true,
        "pagingType": "full_numbers",
        "serverSide": true,
        "ajax": {
          //url: "https://pastebin.com/raw/pGCMswmR",
        	url: "http://192.168.240.192:3000/rpc/hosts_scanned_param?",
          contentType: "json",
          contentBody: { "_domain" : "a", "_order_by" : "domain", "_from" : 200, "_for" : 10 },
          type: "POST"
        },
        "createdRow": function( row, data, dataIndex ) {
			var live = data[4]
			if (live){
                console.log("inside")
				//$($("#data-table").cell(row,0).node()).addClass("testtesttest")
			}
		},
    } )
} )

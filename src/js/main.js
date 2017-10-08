$(document).ready(function() {
    // Setup disclaimer
    $("#disclaimer_close").on("click", function(ev){
        ev.preventDefault()
        $("#disclaimer").hide()
    })

    // Retrieve chart data
    var stats
    $.when(
        $.ajax({
            url: "http://192.168.240.192:3000/last_scan_stats",
            type: "GET",
            contentType: "json",
            success: function(data){
                  stats = data[0]
            }
        })
    ).then(function( data, textStatus, jqXHR ){
        // Inject doughnut labels data
        $("#chart-1-label").text(stats["valid_https_perc"].toFixed(1).toString() + "%")
        $("#chart-2-label").text(stats["defaults_to_https_perc"].toFixed(1).toString() + "%")

        // Initialize doughnut charts
        options = { 
            legend: {display: false},
            tooltip: {
                // TODO disable or create custom tooltips
                enabled: false
            }
        }

        data = {
            datasets: [{
                data: [stats["valid_https_perc"], 100-stats["valid_https_perc"]],
                backgroundColor: ["#06c", "#e0e0e0"]
            }],
            options: options
        }
        new Chart($("#chart-1"), {
            type: "doughnut",
            data: data
        })

        data = {
            datasets: [{
                data: [stats["defaults_to_https_perc"], 100-stats["defaults_to_https_perc"]],
                backgroundColor: ["#06c", "#e0e0e0"]
            }],
            options: options
        }
        new Chart($("#chart-2"), {
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
            url: "https://pastebin.com/raw/pGCMswmR",
            type: "POST",
            contentType: "json"
            //url: "http://192.168.240.192:3000/rpc/hosts_scanned_param?",
            //contentBody: { "_domain" : "a", "_order_by" : "domain", "_from" : 200, "_for" : 10 }
        },
        "createdRow": function( row, data, dataIndex ) {
			var live = data[4]
			if (live){
				//$($("#data-table").cell(row,0).node()).addClass("testtesttest")
			}
		},
    } )
} )

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
    var columns = ["domain", "valid_https", "default_to_https", "hsts", "hsts_preloaded", "host_graduating"]
    var server_pages = ["https://pastebin.com/raw/mYmVvFVE", "https://pastebin.com/raw/xS1UNKab"]
    var table = $("#data-table").DataTable( {
        "processing": true,
        "serverSide": true,
        "paging": true,
        "pageLength": 10,
        "lengthChange": false,
        "ajax": {
            url: "https://pastebin.com/raw/mYmVvFVE",
            type: "POST",
            contentType: "json",
            //url: "http://192.168.240.192:3000/rpc/hosts_scanned_param?_domain=eq.&_order_by=eq.domain&_from=eq.0&_for=eq.10",
            //contentBody: { "_domain" : table.search(), "_order_by" : columns[table.order()[0][0]], "_from" : table.page.info().page*table.page.len(), "_for" : table.page.len() }
        },
        "createdRow": function( row, data, dataIndex ) {
			var live = data[4]
			if (live){
				//$($("#data-table").cell(row,0).node()).addClass("testtesttest")
			}
		},
    } )

    $('#data-table')
        .on( 'order.dt',  function (){ 
            var order = table.order()
            console.log('Ordering on column '+order[0][0]+' ('+order[0][1]+')')
        })
        .on( 'search.dt', function (){
            console.log('Currently applied global search: '+table.search())
        })
        .on( 'page.dt',   function (){ 
            var info = table.page.info()
            console.log('Showing page: '+info.page+' of '+info.pages)
            table.ajax.url(server_pages[info.page%2])
            table.draw('page')
        })

} )

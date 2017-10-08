$(document).ready(function() {
    $('#data-table').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
        	url: "https://pastebin.com/raw/pGCMswmR",
        	type: 'POST'
        },
        "createdRow": function( row, data, dataIndex ) {
			var live = data[4];
			console.log(live)
			//if (alert==true){
			//	$($('#data-table').cell(row,0).node()).addClass('testtesttest');
			//}
		},
    } );
} );

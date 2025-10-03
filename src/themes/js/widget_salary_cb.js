if(typeof LANGUAGE == 'undefined')
	var LANGUAGE = 'vi';	
if(typeof CURRENT_LANGUAGE == 'string')
	var LANGUAGE = CURRENT_LANGUAGE;	
$.getScript(STATIC_TN+'js/jquery.formatCurrency-1.4.0.js', function( data, textStatus, jqxhr ){});
$.getScript(STATIC_TN+'js/autoNumeric.js', function( data, textStatus, jqxhr ){});
$.getScript(STATIC_TN+'js/widget_function_cb.js', function( data, textStatus, jqxhr ){});		

function htmlJsonpCallback(data)
{	
	$('#frm_calc_dynamic_talentnetwork').html(data);	
}	
function init_widget_cb(_url)
{
	 $.ajax({
		url: _url+'/'+LANGUAGE+'/widget/salary-cb',
		jsonp: "callback",		
		dataType: "jsonp",	
		jsonpCallback: "htmlJsonpCallback"		
	})
}

function init_widget_cb_salary(_url)
{
	 $.ajax({
		url: _url+'/'+LANGUAGE+'/widget/salary-cb?layout=salary',
		jsonp: "callback",		
		dataType: "jsonp",	
		jsonpCallback: "htmlJsonpCallback"		
	})
}

function init_widget_cb_new(_url)
{
	 $.ajax({
		url: _url+'/'+LANGUAGE+'/widget/salary-cb-new',
		jsonp: "callback",		
		dataType: "jsonp",	
		jsonpCallback: "htmlJsonpCallback"		
	})
}

function init_widget_cb_salary_new(_url)
{
	 $.ajax({
		url: _url+'/'+LANGUAGE+'/widget/salary-cb-new?layout=salary',
		jsonp: "callback",		
		dataType: "jsonp",	
		jsonpCallback: "htmlJsonpCallback"		
	})
}

function init_widget_cb_salary_advance(_url)
{
	 $.ajax({
		url: _url+'/'+LANGUAGE+'/widget/salary-cb-advance?layout=salary',
		jsonp: "callback",		
		dataType: "jsonp",	
		jsonpCallback: "htmlJsonpCallback"		
	})
}




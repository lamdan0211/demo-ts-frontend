if(typeof LANGUAGE == 'undefined')
	var LANGUAGE = 'vi';	
if(typeof CURRENT_LANGUAGE == 'string')
	var LANGUAGE = CURRENT_LANGUAGE;	
function init_widget(_url, _width, _height, _link_custom_css)
{
	var Url = _url+'/'+LANGUAGE+'/widget/salary?verb=init';
		Url += '&w='+_width;
		Url += '&h='+_height;
		Url += '&css='+_link_custom_css;
	var strHTML = '<div id="frm_calc_dynamic_talentnetwork"><iframe id="frm_calc_dynamic_ifrm_talentnetwork" width="'+_width+'" height="'+_height+'" src="'+Url+'" frameborder="0" border="1" scrolling="no" style="position:aboslute;"></iframe></div>';
	document.write(strHTML);
}






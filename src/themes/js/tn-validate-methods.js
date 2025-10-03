$.validator.messages.accept = language.msg_accept_file;
//add validator & validation
$.validator.addMethod('validatePassUnicodeOld',function(value){
	var c = 0;
	var strTemp = value.replace(/[0-9]/g, '');
	if(strTemp != value) { c++; value = strTemp; }
	strTemp = value.replace(/[a-z]/g, '');
	if(strTemp != value) { c++; value = strTemp; }
	strTemp = value.replace(/[A-Z]/g, '');
	if(strTemp != value) { c++; value = strTemp; }
	strTemp = value.replace(/[\-\_\@\~\`\#\$\%\^\&\*\?\+\"\'\!\(\)\=\?\.]/g, '');
	if(strTemp != value) { c++; value = strTemp; }
	if( c < 2 || value != '') return false;
	return true;}
,language.message_common);

$.validator.addMethod('validatePassUnicode',function(value){
		return true

}
,language.message_common);

$.validator.addMethod('validatePassCheck', function(value) {
    return /^[A-Za-z0-9,./<>?_+\-=!@#$%^&*]*$/.test(value) && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && /[,./<>?_+\-=!@#$%^&*]/.test(value);
}, language.message_common);

$.validator.addMethod('fullname',function(value){
	return value.match(/[0-9\~\`\!\@\#\$\%\^\&\*\(\)\=\+\[\]\{\}\|\\\;\:\"\<\>\,\/\?]/) ? false : true;
/*
	var strCheck = /([^0-9\~\`\!\@\#\$\%\^\&\*\(\)\=\+\[\]\{\}\|\\\;\:\"\<\>\,\/\?]+)/g;
	var reg = new RegExp(strCheck);
	var strTemp = value.replace(reg, '');
	return (strTemp=='')?true:false;
*/
}
,language.message_common);

$.validator.addMethod('requiredlastname',function(value){
	if(value.match(/[0-9\~\`\!\@\#\$\%\^\&\*\(\)\=\+\[\]\{\}\|\\\;\:\"\<\>\,\/\?]/))
		return false;
	return ($('#lastname').val() != language.member_register_write_lastname)?true:false;
}
,language.message_common);
$.validator.addMethod('requiredfirstname',function(value){
	if(value.match(/[0-9\~\`\!\@\#\$\%\^\&\*\(\)\=\+\[\]\{\}\|\\\;\:\"\<\>\,\/\?]/))
		return false;
	//if($('#lastname').val() == language.member_register_write_lastname)
	//	return true;
	return ($('#firstname').val() != language.member_register_write_firstname)?true:false;
}
,language.message_common);

jQuery.validator.addMethod("greaterThan", function(value, element, param) {
	var target = $(param);
	/*if ( this.settings.onfocusout ) {
		target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
			$(element).valid();
		});
	}*/
	
	return (parseInt(value) > parseInt(target.val()));
	
}, "must greater!");

//check multi emails
jQuery.validator.addMethod("multiemail", function(value, element) {
 if (this.optional(element)) // return true on optional element 
	 return true;
var emails = value.split(/[;,]+/); // split element by , and ;
 valid = true;
 for (var i in emails) {
	 value = emails[i];
	 valid = valid && jQuery.validator.methods.email.call(this, $.trim(value), element);
	 if(valid && value.match(/[^0-9a-zA-Z\.\-\_\@]/)) valid = false;
	 if(valid && value.match(/[\.\-\_\@]{2,10}/)) valid = false;
 }
 return valid;
},jQuery.validator.messages.email );

//DuyAnh :: check vaild code (num & chars only)
$.validator.addMethod("validCode", function(value, element) {
return this.optional(element) || value === "NA" ||
	value.match(/^[0-9a-zA-Z]+$/);
}, "Please enter a valid number, or 'NA'");

//DuyAnh :: check Length CKEditor
$.validator.addMethod("maxLen", function (value, element, param) {	
var editor = CKEDITOR.instances[element.getAttribute("id")];
var strData = editor.getData();
if(strData != ''){
	strData = decodeEntities(strData);
	var length = strData.replace(/<[^>]*>|\s/g, '').length;
	if(length > param) return false;
}
return true;

},language.msg_maxlen_ckeditor);

//Dung: check mobile number
$.validator.addMethod('mobilevalidate',function(value,element){
var mobile = $(element).val()
var filter = /^[0-9-+().\s]+$/;
if(mobile=='')return true;
if (filter.test(mobile)) {
	return true;
}
else {
	return false;
}
},language.message_common);

$.validator.addMethod('mobilevalidatevn', function(value, element) {
	var mobile = $(element).val().trim();
	var filter = /^[0-9-+().\s]+$/;
	if (mobile === '') return true;
	if (filter.test(mobile)) {
		if (mobile.startsWith('0') && mobile.length === 10) {
			return true;
		} else if ((mobile.startsWith('+') || mobile.startsWith('-')) && mobile.length <= 15 && mobile.length > 10) {
			return true;
		}
	}
	return false;
}, language.message_common);

//DuyAnh :: check file size
$.validator.addMethod('filesize', function(value, element, param) {
// param = size (en bytes) 
// element = element to validate (<input>)
// value = value of the element (file name)
if(!isIE()){
	return this.optional(element) || (element.files[0].size <= param);
} 
return true;
}, language.msg_invalid_filesize);

$.validator.addMethod("datebirthday", function(value, element) {
var tmp = value.split("/");
var iY = tmp[2];
var cY = new Date();
var y = cY.getFullYear() - iY;
return y >= 18 && y <=60;
}, language.msg_datebirthday_rule);

//DuyAnh :: check item (news cate)
$.validator.addMethod('required_items',function(value, element){
if ($(element).children('option').length <= 1) return true;
return ($(element).val()!="")?true:false;
}
,$.validator.messages.required);

//DungDV: check email domain
$.validator.addMethod('checkEmailDomain',function(value, element, param){
var domain = param;
var strEmail = $(element).val();
//alert(strEmail);
var arrEmail = strEmail.split("@");
var email = arrEmail[1];
if(domain != '' && domain != email){
	return false;
}else 
	return true;	
}
,language.msg_correct_domain_required);

//DuyAnh :: check format date mm/yyyy
$.validator.addMethod('string_date_format',function(value, element){
var txtVal = value;
var filter = new RegExp("(0[123456789]|10|11|12)([/])([1-2][0-9][0-9][0-9])");
if(filter.test(txtVal))
  return true;
else
 return false;
}
,language.msg_invalid_format);
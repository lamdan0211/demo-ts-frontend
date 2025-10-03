// I found this somewhere on the intertubes, and optimized it
$.fn.insertAtCaret = function(myValue) {
	return this.each(function() {
		var me = this;
		if (document.selection) { // IE
			me.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			me.focus();
		} else if (me.selectionStart || me.selectionStart == '0') { // Real browsers
			var startPos = me.selectionStart, endPos = me.selectionEnd, scrollTop = me.scrollTop;
			me.value = me.value.substring(0, startPos) + myValue + me.value.substring(endPos, me.value.length);
			me.focus();
			me.selectionStart = startPos + myValue.length;
			me.selectionEnd = startPos + myValue.length;
			me.scrollTop = scrollTop;
		} else {
			me.value += myValue;
			me.focus();
		}
	});
};

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
countEvent = 0;
$.fn.formChangeEvent = function()
{
	if(typeof(CKEDITOR) != "undefined" && CKEDITOR !== null) {
		for (instance in CKEDITOR.instances){
			CKEDITOR.instances[instance].updateElement();
			CKEDITOR.instances[instance].on('key', function() { countEvent++; });
		}
	}
	$('input,textarea,select', this).change(function() {
		countEvent++;
	});
	$(window).bind('beforeunload', function() {
		if(countEvent > 0){
			if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){return ''};
			return confirm(language.msg_are_you_sure_you_want_to_leave_this_page);
		}
	});
	$(this).submit(function() {
		$(window).unbind('beforeunload');
	});
};
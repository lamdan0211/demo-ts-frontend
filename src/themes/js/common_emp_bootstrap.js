$(document).ready(function(){
	$(function(){
		$('#job_id_home').change(function(){
			var request=$.ajax({
				url:EMP_TN+"/home/load-workflow-stat",
				type:"POST",			
				data:{job_id:$(this).val()}});
			request.done(function(data){
				$('#workflow_stat_home').html(data);
			});
			request.fail(function(jqXHR, textStatus) {
				alert( "Request failed: " + textStatus );
			});			
		});	
		
		$('#sKeyTop').on('keypress', function (e) {
			 if(e.which === 13){
				searchObjectTop();
			 }
		});
	});
	
	$('#user_id_home').change(function(){
		var request=$.ajax({
			url:EMP_TN+"/home/load-activity-stream",
			type:"POST",			
			data:{user_id:$(this).val()}});
		request.done(function(data){			
			$('#activity_stream_home').html(data);
		});
		request.fail(function(jqXHR, textStatus) {
			alert( "Request failed: " + textStatus );
		});			
	});

	$('.loginLinkCB').click(function(e){
		e.preventDefault();
		var request=$.ajax({
			url:EMP_TN+"/login/login-cb",
			async :false,
			type:"POST",
			dataType :"JSON"});
		request.done(function(data){
			//window.open(data.link,'_blank');
			//window.open(data.link, '_blank', 'noopener, noreferrer');
			$('#redirectLinkCB').attr('onClick', "window.open('"+data.link+"','_blank')");
			$('#redirectLinkCB').attr('attr', data.link);
			$(document).ready(function() {
				$("#redirectLinkCB").trigger('click');
				$('#redirectLinkCB').removeAttr('attr');
				$('#redirectLinkCB').removeAttr('onClick');
			});
		});
		request.fail(function(jqXHR, textStatus) {
			alert( language.msg_login_fail );
		});
	});
		
		
	$(".showDialog").fancybox();
	
	// Notify
	$.ajax({
		url: EMP_TN+"/notifyalert?type=calendar",
		async: false
	}).done(function(data) {
		$('#NotifyCalendar').html(data);
	});
	$.ajax({
		url: EMP_TN+"/notifyalert",
		async: false
	}).done(function(data) {
		$('#NotifyMenu').html(data);
	});
	// End Notify
});

$(function() {
	var hideHeaderMediumScreenMenu;
	return hideHeaderMediumScreenMenu = function() {
		return $("html").removeClass("header-medium-screen-menu-displayed");
	}, $("#show-menu").on("click", function(event) {
		return event.stopPropagation(), $("html").toggleClass("header-medium-screen-menu-displayed");
	}), $("body").on("click", function(event) {
		return $(event.target).is("#header-menu-mobile") || $("#header-menu-mobile").has(event.target).length > 0 ? void 0 : hideHeaderMediumScreenMenu();
	});
});

function searchObjectTop(){
	if(validateKeySearch('sKeyTop')){
		var param = $('#sParamTop').val();
		var keyword = $('#sKeyTop').val();
		keyword = encodeURIComponent(keyword);
		setCookie('filter'+window.location.pathname,'open');
		switch(param){
			case 'candidate':
				location.href = EMP_TN+"/resume?keywords="+keyword+"&type_key=1";
				break;
			case 'member':
				location.href = EMP_TN+"/member/search-result?keyword="+keyword+"&type_key=1";
				break;
			case 'job':
				location.href = EMP_TN+"/requisition?keyword="+keyword;
				break;
		}
		
	}
}

function lockResume(resume_id) {
    $.ajax({
        async: false,
        cache: false,
        type: "POST",
        dataType: 'JSON',
        url: EMP_TN+"/resume/lock",
        data: { "resume_id": resume_id }
    }).done(function( data ) {
        if(data.return) {
            alert(language.resume_locked);
            document.location.reload();
        }
        return false;
    });
    return false;
}

function resumeLockInfo(resume_id) {
    var ret = '';
    $.ajax({
        async: false,
        url: EMP_TN+"/resume/lockinfo",
        data: { 'resume_id': resume_id }
    }).done(function( data ) {
        ret = data;
    });
    return ret;
}

function unlockResume(lock_id, resume_id) {
    var ret = '';
    $.ajax({
        async: false,
        cache: false,
        url: EMP_TN+"/resume/lock",
        dataType: 'JSON',
	type: "POST",
        data: { 'lock_id':lock_id, 'resume_id': resume_id }
    }).done(function( data ) {
	alert(language.resume_unlocked);
        document.location.reload();
    });
    return false;
}

function showOrdersCB() {
    $.fancybox({
        href : EMP_TN+"/rdb/orders",
        type : 'ajax',
        
    });
    return false;
}

function showOrdersCBV1() {
    $.fancybox.open({
        src : EMP_TN+"/rdb/orders",
        type : 'ajax', 
    });
    return false;
}


function getResumeCB(rid, oid, rdb_type) {
    if(confirm(language.confirm_view_resume_cb)) {
        $.ajax({
                async: false,
                cache: false,
                url:EMP_TN+'/rdb/getresume',
                type: 'POST',
                dataType: 'json',
                data:{'rid':rid, 'oid':oid, 'rdb_type':rdb_type},
                success: function (data, status){
                    alert(data.message);
                    if(data.status==1)
                        document.location.reload();
                }
            });
    }
    return false;
}

function getResumeCBFlipView(rid, oid, rdb_type) {
    if(confirm(language.confirm_view_resume_cb)) {
        $.ajax({
                async: false,
                cache: false,
                url:EMP_TN+'/rdb/getresume',
                type: 'POST',
                dataType: 'json',
                data:{'rid':rid, 'oid':oid, 'rdb_type':rdb_type},
                success: function (data, status){
                    alert(data.message);
                    if(data.status==1)
                        previewResumeCB(rid);
                }
            });
    }
    return false;
}


function onNextFlipView() {
    if(curRDB_R < BLANK_RBD[curRDB_P].length-2) {
        curRDB_R++;
    } else {
        curRDB_R = 0;
        curRDB_P++;
        if(typeof BLANK_RBD[curRDB_P] == "undefined") {
            onLoadBlankFlipView();
            return false;
        }
    }
    previewResumeCB(BLANK_RBD[curRDB_P][curRDB_R], curRDB_R);
    return false;
}

function onBackFlipView() {
    if(curRDB_R > 0) {
        curRDB_R--;
    } else if(curRDB_P > 1) {
        curRDB_P--;
        if(typeof BLANK_RBD[curRDB_P] == "undefined") {
            curRDB_R = 9999;
            onLoadBlankFlipView();
            return false;
        } else {
            curRDB_R = BLANK_RBD[curRDB_P].length -2;
        }
    } else {
        $('#flip_prev').hide();
        return false;
    }
    previewResumeCB(BLANK_RBD[curRDB_P][curRDB_R], curRDB_R);
    return false;
}

function onLoadBlankFlipView() {
    $.ajax({
        async: false,
        cache: false,
        url: CURRENT_RDB_URL+"&page="+curRDB_P,
        dataType: 'JSON',
        type: "POST",
        timeout: 30000,
    }).done(function( data ) {
        BLANK_RBD[curRDB_P] = data;
        if(curRDB_R > (BLANK_RBD[curRDB_P].length - 2))
            curRDB_R = BLANK_RBD[curRDB_P].length - 2;
        if(curRDB_R < 0) curRDB_R = 0;
        previewResumeCB(BLANK_RBD[curRDB_P][curRDB_R], curRDB_R);        
        return true;
    });
}

function saveResumeRDB(resume_id) {
    $.ajax({
        async: false,
        cache: false,
        url: EMP_TN+"/rdb/saveresume",
        dataType: 'JSON',
        data: { 'resume_id':resume_id },
        type: "POST"
    }).done(function( data ) {
        alert(data.message);       
    });
    return false;
}

function addResumeCBToFolder(resume_id, folderId) {
    $('#loading').show();
    $.ajax({
        async: false,
        cache: false,
        url: EMP_TN+"/rdb/save-resume-cb-to-folder",
        dataType: 'JSON',
        data: { 'resume':resume_id, 'folder':folderId },
        type: "POST"
    }).done(function( data ) {
        $('#loading').hide();
        $('.DataGot').fadeOut('fast');
        alert(data.message);       
    });
    return false;
}

function assignResumeCBToJob(resume_id, jobId) {
    $('#loading').show();
    $.ajax({
        async: false,
        cache: false,
        url: EMP_TN+"/rdb/assign-resume-cb-to-job",
        dataType: 'JSON',
        data: { 'resume':resume_id, 'job':jobId },
        type: "POST"
    }).done(function( data ) {
        $('#loading').hide();
        $('.DataGot').fadeOut('fast');
        alert(data.message);       
    });
    return false;
}


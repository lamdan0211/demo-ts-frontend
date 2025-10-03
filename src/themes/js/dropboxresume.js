$(document).ready(function(){
	$( "#dropbox_button" ).click(function() {
		var stringValid = '.docx .doc .pdf .xls .xlsx';	
		var options = {
			linkType: 'direct',
			extensions: stringValid.split(' '),
			iframe: false,
			success: function (files) {
				if (files[0] != null) {							
                    if (!HasValidFileExtension(files[0].name)) {                       
						alert(language.msg_resume_accept_file);
                    } else if (files[0].bytes / (1024*1024) > 2) {
                        alert(language.msg_invalid_filesize);
                    } else {
                        $('#attach_file').val('');
						$('#upload_text1').html('');
						$('#upload_text2').html('');
						$('#error_attach').hide();
						$('input[name=changeResume]:radio').each(function () {		
							$(this).attr('checked', false);	
						});		
						$('#google_file').val('');
						$('#gfile_type').val('');	
						$('#gfile_title').val('');	
						$('#gfile_size').val('');	
						$('#oauth_token').val('');					
						$('#dropbox_file').val(files[0].link);							
						$('#dfile_title').val(files[0].name);						
						$('#dfile_size').val((files[0].bytes / 1024).toString().split('.')[0]);					
						$('#upload_text3').html(files[0].name+" ("+(files[0].bytes / 1024).toString().split('.')[0]+"KB)");										
                    }					
				}else{
					$('#dropbox_file').val('');						
					$('#dfile_title').val('');	
					$('#dfile_size').val('');						
					$('#upload_text3').html('');
					$('#error_attach').show();
				}
			},
			cancel: function () { }
		};
		Dropbox.choose(options);
	});
});

function HasValidFileExtension(filename) {
	var validFileExtensions = 'DOCX DOC PDF XLS XLSX';
	var extension = filename.substr(filename.lastIndexOf('.') + 1).toUpperCase();
	if (validFileExtensions.indexOf(extension) == -1) {           
		return false;
	} else return true;
}



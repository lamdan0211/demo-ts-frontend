var CLIENT_ID = googledrive_client_id;
//var CLIENT_ID = '120020883306-vr6s7g2vkh3lvpklb4b4o9fh23ug1rip.apps.googleusercontent.com';
var APP_ID = googledrive_client_app_id;
//var APP_ID = '120020883306';
var SCOPES = 'https://www.googleapis.com/auth/drive';
var oauthToken;
// Use the Google Loader script to load the google.picker script.
google.load('picker', '1');

// Called when the client library is loaded to start the auth flow.
function handleClientLoad() {
    window.setTimeout(checkAuth, 1);
}

// Check if the current user has authorized the application.
function checkAuth() {
    gapi.auth.authorize(
        { 'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true },
        handleAuthResult);
}

/**
* Called when authorization server replies.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
   // var authButton = document.getElementById('google_button');
    if (authResult && !authResult.error) {
        //authButton.style.display = 'block';
		$('#google_button').attr('display', 'block');
		oauthToken = authResult.access_token;
        if ($('#google_button').hasClass('notlogged')) {
            createPicker();
        } else {
            $('#google_button').on('click', function () {
                createPicker();
            });
        }
    } else {
        // No access token could be retrieved, show the button to start the authorization flow.
        $('#google_button').removeClass('logged');
        $('#google_button').addClass('notlogged');
        $('#google_button').on('click', function (e) {     
			gapi.auth.authorize(
                { 'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false },
                handleAuthResult);
        });
    }
}

function createPicker() {    
    var view = new google.picker.DocsView().setMode(google.picker.DocsViewMode.LIST);
    var picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .setAppId(APP_ID)
		.setOAuthToken(oauthToken)
        .addView(view)
        .setCallback(pickerCallback)
        .build();
    picker.setVisible(true);
}

function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        var request;

        gapi.client.load('drive', 'v2', function () {
            request = gapi.client.drive.files.get({
                'fileId': fileId
            });
            request.execute(function (file) {
				var arrExt = ["application/msword", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
				if(file.id != ''){									
					if(arrExt.indexOf(file.mimeType) == -1){
						jAlert(language.msg_resume_accept_file, '','error');
					}else if(file.fileSize / (1024*1024) > 2){
						jAlert(language.msg_invalid_filesize, '','error');
					}else{											
						$('#attach_file').val('');
						$('#dropbox_file').val('');
						$('#dfile_title').val('');						
						$('#dfile_size').val('');
						$('#upload_text1').html('');
						$('#upload_text3').html('');
						$('#error_attach').hide();
						$('input[name=changeResume]:radio').each(function () {		
							$(this).attr('checked', false);	
						});			
						$('#google_file').val(file.downloadUrl);	
						$('#gfile_type').val(file.mimeType);	
						$('#gfile_title').val(file.title);						
						$('#gfile_size').val(file.fileSize);
						$('#oauth_token').val(gapi.auth.getToken().access_token);
						$('#upload_text2').html(file.title+" ("+(file.fileSize / 1024).toString().split('.')[0]+"KB)");											 
					}
				}else{
					$('#google_file').val('');
					$('#gfile_type').val('');	
					$('#gfile_title').val('');	
					$('#gfile_size').val('');	
					$('#oauth_token').val('');		
					$('#upload_text2').html('');
					$('#error_attach').show();
				}							               
            });
        });
    }
}
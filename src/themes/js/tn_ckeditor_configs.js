var jsk_config_editor = {
	language: LANGUAGE
};
if ($.browser.msie  && parseInt($.browser.version, 10) === 7) {
	var emp_config_editor = {
	language: LANGUAGE,
	toolbar:[
				[ 'FontSize','TextColor','Spellchecker','Maximize','Undo','Redo','Cut','Copy','Paste','Bold','Italic','Underline'],
				['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','Outdent','Indent','NumberedList','BulletedList','Link']
			],
	fontSize_sizes : '10/10px;11/11px;12/12px;13/13px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;30/30px;32/32px;34/34px;36/36px;38/38px;40/40px;42/42px;44/44px;46/46px;48/48px;',
	};
} else {
	var emp_config_editor = {
	language: LANGUAGE,
	toolbar:[
				[ 'FontSize','TextColor','Spellchecker','Maximize','Undo','Redo','Cut','Copy','Paste','Bold','Italic','Underline'],
				['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','Outdent','Indent','NumberedList','BulletedList','Link','Image', 'Iframe']
			],
	fontSize_sizes : '10/10px;11/11px;12/12px;13/13px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;30/30px;32/32px;34/34px;36/36px;38/38px;40/40px;42/42px;44/44px;46/46px;48/48px;',
	on: {
        loaded: function( evt ) {
            var editor = evt.editor;
            editor.getCommand( 'image' ).on( 'state', function() {
                this.disable();
				$('.cke_button__image').css('display', 'none');
            } );
            editor.getCommand( 'iframe' ).on( 'state', function() {
                this.disable();
				$('.cke_button__iframe').css('display', 'none');
            } );
        }
    }
	//filebrowserBrowseUrl : TN+'/pdwfilebrowser/index.php?editor=ckeditor&owner='+OWNER,
	//filebrowserImageBrowseUrl : TN+'/pdwfilebrowser/index.php?editor=ckeditor&filter=image&owner='+OWNER,
	//filebrowserFlashBrowseUrl : TN+'/pdwfilebrowser/index.php?editor=ckeditor&filter=flash&owner='+OWNER
	};
}

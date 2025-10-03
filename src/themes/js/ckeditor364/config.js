/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	config.language = 'en';
	config.skin = 'office2003';
	config.entities_latin = false;
	config.entities_greek = false;
	config.entities = false;
	//config.disableNativeSpellChecker = true;
	//config.scayt_autoStartup = false;
	//config.forcePasteAsPlainText = true;
	//config.pasteFromWordPromptCleanup = true;
	//config.pasteFromWordNumberedHeadingToList = true;
	config.removePlugins = 'elementspath';
	config.autogrow = false;
	
	

	// config.uiColor = '#AADC6E';
	/*config.toolbar_Basic = [
		['Source', '-', 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'Undo', 'Redo', '-', 'SelectAll']
	];*/
	
	config.toolbar_Basic_j = [		
		['Bold','Italic','NumberedList','BulletedList'],		
	];
	

	// config.uiColor = '#AADC6E';
	config.toolbar_Basic = [
		['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'Undo', 'Redo']
	];	
	
	config.toolbar_advanced = [		
		['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print'],
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],		
		'/',
		['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['Link','Unlink','Anchor'],
		'/',
		['Style','Format','Font','FontSize'],
		['TextColor','BGColor'],
		['Maximize','ShowBlocks'],['Source','Preview'],
	];
};

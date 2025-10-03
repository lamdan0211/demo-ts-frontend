$(document).ready(function(){
	$(".chosen").chosen({max_selected_options: 100}).change(function(e, params) {
		var id = '#'+$(this).attr('id')+'_chosen';
		if(id == '#location_chosen'){
			console.log(params);
			var strLocation = $("#strLocation").val();
			if(params.selected){
				strLocation = strLocation+params.selected +",";
			
			}else if(params.deselected){
				strLocation = strLocation.replace(params.deselected+",","");
			}
			$("#strLocation").val(strLocation);
		}
		var labelObj = $(this).parent();
		ow = it = 0;
		var w = $(id).width() - 50;
		var k = 0;
		var e = 0;
		// Get Element Sellected
		if (params.selected == "-1")
			e = 1;
		else if ($(this).val() != null)
			e = parseInt($(this).val().length);
		else
			e = 0;
		
		// Proccess Sellect All
		if (e > 0 && params.selected != "-1") {
			
			$(this).find('option[value="-1"]').removeAttr('selected', 'selected');
			$(this).find('option[value="-1"]').attr('disabled', 'disabled');
		} else { 
			$(this).find('option').removeAttr('selected');
		}
		// Update chosen
		$(this).trigger("chosen:updatednew");
		
		// Proccess Width all element
		$(id+' li.search-choice').each(function() {
			$(this).find('span').css('width', '100%');
			if(k < e){
				ow+= $(this).width()+30; 
				it++;
			} 
			k ++;
		});
		if(w < ow){ 
			$(id + ' ul').addClass('shortags'); 
			wit = Math.round(w / it) - 30;
			$(id+' li.search-choice span').css('width', wit+'px');
		}else{
			$(id + ' ul').removeClass('shortags'); 
			$(id+' li.search-choice span').css('width', 'calc()');
		}
	});	
});
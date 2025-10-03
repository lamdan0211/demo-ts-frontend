$(document).ready(function () {
	$(".showDialog").fancybox({
		'padding': 0,
		onComplete: (function () {
			$("#fancybox-wrap").css({ 'width': ($("#fancybox-content").width() + 40) + "px", 'padding': 0 });
		})
	});
	if (!checkMobile()) {
		if (!(Controller == 'index' && Action == 'register')) {
			$(".showDialogD").fancybox({
				'padding': 0,
				onComplete: (function () {
					$("#fancybox-wrap").css({ 'width': ($("#fancybox-content").width() + 40) + "px", 'padding': 0 });
				})
			});
		}
	}


	$('a[href*=\\#]:not([href=\\#])').click(function () {
		$('#header-pre').find('li').removeClass("focus");
		$(this).parent('li').addClass("focus");
		var menuID = getAnchor($(this).attr('href'));
		$('#menu_' + menuID).parent('li').addClass("focus");
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			var intPosDiff = $('#section-header').height();
			if (!$('#section-header').hasClass('posFixed') && Layout_Template == 'P11')
				intPosDiff = intPosDiff * 2;

			// if(Layout_Template == 'P41')
			//     intPosDiff = 0;
			//var intPosDiff = 50;
			//if(!$('#section-header').hasClass('posFixed'))
			//	intPosDiff = 130;
			if (target.length) {
				$('html,body').animate({
					scrollTop: (target.offset().top - intPosDiff)
				}, 800, 'easeInOutExpo');
				if (menuID == 'label_location' || menuID == 'label_industry') {
					$('#' + menuID).trigger("click");
				}
				return false;
			}


		}
	});
	var menuClick = getAnchor(document.URL);
	$('#menu_' + menuClick).trigger('click');


	$("#header-pre li.parent").hoverIntent({
		over: show_submenu,
		timeout: 0,
		out: hide_submenu
	});
});

$(window).resize(function () {
	widthWindowChosen = $(window).width();
	if (widthWindowChosen > 1170) {
		$("html").removeClass("header-medium-screen-menu-displayed");
	}



	if (Action != 'employer') {
		if (Layout_Template == 'P11') {
			adjustHeightPremium();

		} else {
			adjustHeightPremiumDemo();
		}
	}
});

$(function () {
	if (Action != 'employer') {
		if (Layout_Template == 'P11') {
			adjustHeightPremium();
		} else {
			adjustHeightPremiumDemo();
		}
	}


	//overwrite defaut jvalidate error message
	jQuery.extend(jQuery.validator.messages, {
		required: language.msg_require
	});
	if (checkIos()) {
		if (Controller == 'jobs' && Action == 'apply') {
			$("#fromcomputer").hide();
			$("#fromdropbox").hide();
		}
	}
	if (windowsPhone()) {
		if (Controller == 'jobs' && Action == 'apply') {
			$("#fromcomputer").hide();
			$("#fromdropbox").hide();
		}
	}

	// hide #back-top first
	$("#back-top").hide();
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		jQuery('#back-top a').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
	});

});
$(function () {
	var subLayoutScroll = document.body.scrollHeight - $(window).height();
	var heightHead = $('#section-header').height();
	if (subLayoutScroll > heightHead) {
		if ($(window).scrollTop() > 0) {
			$('#section-header').addClass('posFixed');
		} else {
			$('#section-header').removeClass('posFixed');
		}
		$(window).scroll(function () {
			if ($(window).scrollTop() > 0) {
				$('#section-header').addClass('posFixed');
			} else {
				$('#section-header').removeClass('posFixed');
			}
		});
	}
});
/*$(window).load(function () {
	var lastId, topMenu = $("#header-pre"),
		topMenuHeight = topMenu.outerHeight() - 60,
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) {
				return item;
			}
		});
	menuItems.click(function (e) {
		$('#header-pre').find('li').removeClass("focus");
		$(this).parent('li').addClass("focus");
		
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: (target.offset().top - 50)
				}, 800, 'easeInOutExpo');
				return false;
			}
			
			
		}
	});
	$(window).scroll(function () {
		var fromTop = $(this).scrollTop() + topMenuHeight;
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop + 150) return this;
		});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";
		if (lastId !== id) {
			lastId = id;
			menuItems.parent().removeClass("focus").end().filter("[href=#" + id + "]").parent().addClass("focus");
		}
	});
});*/


$(function () {
	var hideHeaderMediumScreenMenu;
	return hideHeaderMediumScreenMenu = function () {
		return $("html").removeClass("header-medium-screen-menu-displayed");
	}, $("#show-menu").on("click", function (event) {
		return event.stopPropagation(), $("html").toggleClass("header-medium-screen-menu-displayed");
	}), $("body").on("click", function (event) {
		return $(event.target).is("#header-menu-mobile") || $("#header-menu-mobile").has(event.target).length > 0 ? void 0 : hideHeaderMediumScreenMenu();
	});
});


function checkMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
function show_submenu() {
	$(this).children('ul.submenu').show();
}
function hide_submenu() {
	$(this).children('ul.submenu').hide();
}

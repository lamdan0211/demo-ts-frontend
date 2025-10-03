var g_objHead;// la box chua anh khi thay doi menu
var g_objCurTab;//la item menu dang active
var g_objRoot;
/*
 * Ham thuc hien chuc nang cai dat dropdownmenu
 * Type:	object
 * Name:	TNComDropdownMenu
 * Date:	21/06/2008
 * @author:	Tri Do <tridn@von-inc.com>
 * @param strBoxMenuId la id cua phan tu chua menu
 */
function TNComDropdownMenu(strBoxMenuId,strBoxHeadId)
{	
	g_objHead= $('#'+strBoxHeadId);
	this.startList = function() 
	{
		g_objRoot = document.getElementById(strBoxMenuId);
		parseNode(g_objRoot.childNodes);
	}
	/*
	* Ham thuc hien chuc nang set cac su kien cho nodes
	* Type:	function
	* Name:	parseNode
	* Date:	21/06/2008
	* @author:	Tri Do <tridn@von-inc.com>
	* @param arrNodes la mang cac phan tu cua objRoot
	*/
	function parseNode(arrNodes) 
	{
		for (var i = 0; i < arrNodes.length; i++) 
		{
			
			if (arrNodes[i].nodeType==3 || arrNodes[i].nodeType==8) 
			{
				continue;
			}
			if (arrNodes[i].nodeName=="LI" )
			{
				if(arrNodes[i].id==""){// la node cua dropdown menu				
					$(arrNodes[i]).unbind()
					.bind('mouseenter',function()
					{
						$(this).addClass("over");	
					});
					$(arrNodes[i]).bind('mouseleave',function()
					{
						$(this).removeClass("over");
					});
				}
				else{ //la node cua menu
					if(!$(arrNodes[i]).hasClass("active"))//la node menu khong active
					{
						$(arrNodes[i]).unbind()
						.bind('mouseenter',function()
						{ 
							parent_width = $(this).width() + parseInt($(this).css('padding-left'));

							$(this).find(".subnav1").width( parent_width );

							$(this).find(".subnav1").find("li").each(function(i){
								$(this).css({'display':'block', 'width':parent_width+'px'});
								padding_left = $(this).find("a").css('padding-left');
								if(padding_left != undefined )
									$(this).find("a").css({'display':'block', 'width':(parent_width - parseInt(padding_left)) +'px', 'height':'auto'});
							  });
								
		
							$(this).addClass("active over");
							//g_objHead.attr("class",("uni_"+$(this).attr("id")));
							if($(this).prev()) 
							{
								if(!$(this).prev().hasClass("active")) $(this).prev().addClass("pre_active");
							}					
						});
						$(arrNodes[i]).bind('mouseleave',function()
						{ 
							$(this).removeClass("active over");
							if($(this).next()){
								if($(this).next().hasClass("active")) $(this).addClass("pre_active");
							}
							if($(this).prev()) 
							{
								if($(this).prev().hasClass("pre_active")) $(this).prev().removeClass("pre_active");
							};
							//g_objHead.attr("class",("uni_"+g_objCurTab.id));
							/*if($.browser.msie){
								document.getElementById("uni_content").style.position="relative";
								document.getElementById("uni_content").style.zIndex="1";
							}*/
						});
					}
					else//la node menu dang active
					{
						g_objCurTab=arrNodes[i];
						//$(g_objRoot).addClass(g_objCurTab.id);
						//g_objHead.addClass("uni_"+$(arrNodes[i]).attr("id"));
						if($(arrNodes[i]).prev()){
							$(arrNodes[i]).prev().addClass("pre_active");
						}
						$(arrNodes[i]).unbind()
						.bind('mouseenter',function()
						{ 
							/*if($.browser.msie){
								document.getElementById("uni_content").style.position="relative";
								document.getElementById("uni_content").style.zIndex="-1";
							}*/
							$(this).addClass("over");
							//g_objHead.className="uni_"+$(this).attr("id");
						});
						$(arrNodes[i]).bind('mouseleave',function()
						{ 
							$(this).removeClass("over");
							/*if($.browser.msie){
								document.getElementById("uni_content").style.position="relative";
								document.getElementById("uni_content").style.zIndex="1";
							}*/
						});
						
					}
					
				}
			}
			if (arrNodes[i].childNodes) 
			{
				parseNode(arrNodes[i].childNodes);
			}
		}
	}
}
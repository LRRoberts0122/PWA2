/*  
	Your Project Title
	Author: You
*/

(function($){
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
    $("#registerBtn").click(function(){
        $("#overlay").fadeIn({queue: false, duration: 500});
        $("#registerModal").fadeIn({queue: false, duration: 500});
        $("#registerModal").animate({'top': '20px'}, 500);
        return false;
    });

    $(".close").click(function(){
        $("#overlay").fadeOut({queue: false, duration: 500});
        $('#registerModal').fadeOut({queue: false, duration: 350});
        $("#registerModal").animate({'top': '-575px'}, 500);
    });


    /*
    ===============================================
    ========================================== TABS
    */
    $("#dashboardContentArea div:not(:nth-child(1))").hide();

    $("#menubar li").click(function(e) {
        e.preventDefault();
        $("#dashboardContentArea div").hide();

        $("#menubar .active").removeClass("active");
        $(this).addClass("active");
        var clicked = $(this).find("a:first").attr("href");

        $(clicked).fadeIn("fast");
    }).eq(1).addClass("active");

    /*
    ===============================================
    ======================================= TOOLTIP
    */
    $(".masterTooltip").hover(function(){
        //Hover over code
        var title = $(this).attr("title");
        $(this).data("tipText", title).removeAttr("title");

        $("<p class=\"tooltip\"></p>")
            .text(title)
            .insertAfter($(this))
            .fadeIn("slow");

        $(".tooltip").css({
            top: $(this).height() / 2 - $(".tooltip").height() / 2 + $(this).position().top,
            left: $(this).width() + 30
        });
    }, function() {
        // Hover out code
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltip").remove();
    });


})(jQuery); // end private scope





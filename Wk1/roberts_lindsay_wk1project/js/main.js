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
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope





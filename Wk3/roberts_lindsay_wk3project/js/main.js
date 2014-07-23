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
	======================================== MODALS
	*/
    $("#registerBtn").click(function(){
        $("#overlay").fadeIn({queue: false, duration: 500});
        $("#registerModal").fadeIn({queue: false, duration: 500});
        $("#registerModal").animate({'top': '20px'}, 500);
        return false;
    });

    $("#newProject").click(function() {
        $("#overlay").fadeIn({queue: false, duration: 500});
        $("#newProjectModal").fadeIn({queue: false, duration: 500});
        $("#newProjectModal").animate({'top': '20px'}, 500);
        return false;
    });

    $(".close").click(function(){
        $("#overlay").fadeOut({queue: false, duration: 500});

        if($("#registerModal")){
            $('#registerModal').fadeOut({queue: false, duration: 350});
            $("#registerModal").animate({'top': '-575px'}, 500);
        }

        if($("#newProjectModal")){
            $('#newProjectModal').fadeOut({queue: false, duration: 350});
            $("#newProjectModal").animate({'top': '-575px'}, 500);

            populateModal();
        }
    });


    /*
    ===============================================
    ========================================== TABS
    */
    $("#dashboardContentArea .wrapper:not(:nth-child(1))").hide();

    $("#menubar li").click(function(e) {
        e.preventDefault();
        $("#dashboardContentArea .wrapper").hide();

        $("#menubar .active").removeClass("active");
        $(this).addClass("active");
        var clicked = $(this).find("a:first").attr("href");

        $(clicked).fadeIn("fast");
    }).eq(0).addClass("active");

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
            left: $(this).width() + 30,
            zIndex: 115
        });
    }, function() {
        // Hover out code
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltip").remove();
    });


    $(".loginTooltip").focus(function(){
        //Hover over code
        var title = $(this).attr("title");
        $(this).data("tipText", title).removeAttr("title");

        $("<p class=\"userpassTooltip\"></p>")
            .text(title)
            .insertAfter($(this))
            .fadeIn("slow");

        $(".userpassTooltip").css({
            top: $(".loginTooltip").height() + 15,
            left: ($(".loginTooltip").width() - $(".userpassTooltip").width()) / 2 + $(this).position().left
        });
    });

    $(document).ready(function() {
        $(".loginTooltip").focusout(function() {
            $(this).attr("title", $(this).data("tipText"));
            $(".userpassTooltip").remove();
        });
    });
    /*
    ===============================================
    ====================================== DROPDOWN
    */



    function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('span');
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
    }

    DropDown.prototype = {
        initEvents : function() {
            var obj = this;

            obj.dd.on('click', function(event){
                $(this).toggleClass('active');
                return false;
            });

            obj.opts.on('click',function(){
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text(obj.val);

                $("#productName").val(obj.val.toString());
                $("#productNamePreview").html($("#productName").val());
                $(".wrapper-dropdown span").css({
                    color: "#444",
                    fontStyle: "normal",
                    fontWeight: 500
                });
            });
        },
        getValue : function() {
            return this.val;
        },
        getIndex : function() {
            return this.index;
        }
    };

    $(function() {

        var dd = new DropDown( $('#dd') );

        $(document).click(function() {
            // all dropdowns
            $('.wrapper-dropdown').removeClass('active');
        });

    });


    /*
    ===============================================
    =============================== PROJECT PREVIEW
    */
    $("#projectName").on("input", function(){
        $("#projectNamePreview").html($("#projectName").val());
    });


    $("#description").on("input", function(){
        var text = $("#description").val();
        text = text.replace(/\r?\n/g, '<br />');
        $("#descriptionContent").html(text);
    });

    $("#deadline").on("input", function(){
        $("#deadlinePreview").html($("#deadline").val());
    });

    $("#budget").on("input", function(){
        $("#budgetPreview").html($("#budget").val());
    });

    $("#statusPreview").html($("input:radio[name=status]:checked").val());
    setUrgencyColor();

    $("input:radio[name=status]").click(function () {
        $("#statusPreview").html($("input:radio[name=status]:checked").val());
        setUrgencyColor();
    });

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    $("#datePreview").html(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());


    function populateModal() {
        $("#projectNamePreview").html($("#projectName").val());
        var description = $("#description").val();
        description = description.replace(/\r?\n/g, '<br />');
        $("#descriptionContent").html(description);
        $("#deadlinePreview").html($("#deadline").val());
        $("#budgetPreview").html($("#budget").val());
        $("#datePreview").html(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
        $("#statusPreview").html($("input:radio[name=status]:checked").val());
        setUrgencyColor();
    }

    function setUrgencyColor() {
        if($("input:radio[name=status]:checked").val() == "Normal") {
            $("#urgency").css({
                color: "#11b945"
            });
        }else{
            $("#urgency").css({
                color: "#b92511"
            });
        }
    }

    /*
    =====================================
    =============================== LOGIN
    */

    $("#signinButton").click(function(e){
        e.preventDefault(true);
        var user = $("#user").val();
        var pass = $("#pass").val();
        console.log("Password working!");

        $.ajax({
            url: "xhr/login.php",
            type: "post",
            dataType: "json",
            data: {
                username: user,
                password: pass
            },
            success: function(response){
                console.log("Test User");
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign("dashboard.html");
                }
            }
        });

        /*
        ======================================
        =============================== LOGOUT
        */
        $("#logOut").click(function(e){
            e.preventDefault(true);
            $.get("xhr/logout.php", function(){
                window.location.assign("index.html")
            });
        });


        /*
        ========================================
        =============================== REGISTER
        */
        $(document).ready(function(){
            $("#register").on("click", function(e){
                e.preventDefault();
                alert("Hello!");
            });
        });


    });

})(jQuery); // end private scope


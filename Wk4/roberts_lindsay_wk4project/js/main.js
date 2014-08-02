/*  
	Creative Code Fish
	Author: Lindsay R.
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
    $("#registerBtn").click(function(e){
        $("#overlay").fadeIn({queue: false, duration: 500});
        $("#registerModal").fadeIn({queue: false, duration: 500});
        $("#registerModal").animate({'top': '20px'}, 500);
        e.preventDefault();
    });

    $("#newProject").click(function(e) {
        $("#overlay").fadeIn({queue: false, duration: 500});
        $("#newProjectModal").fadeIn({queue: false, duration: 500});
        $("#newProjectModal").animate({'top': '20px'}, 500);
        e.preventDefault();
    });

    $(".close").click(function(){
        $("#overlay").fadeOut({queue: false, duration: 500});

        if($("#registerModal").length > 0){
            $('#registerModal').fadeOut({queue: false, duration: 350});
            $("#registerModal").animate({'top': '-575px'}, 500);
        }

        if($("#newProjectModal").length > 0){
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

    $("#deadline").keypress(function(event){
        event.preventDefault();
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
    var dateString = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    $("#datePreview").html(dateString);


    function populateModal() {
        $("#projectNamePreview").html($("#projectName").val());
        var description = $("#description").val();
        var content = description.replace(/\r?\n/g, '<br />');
        $("#descriptionContent").html(content);
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

        $.ajax({
            url: "xhr/login.php",
            type: "post",
            dataType: "json",
            data: {
                username: user,
                password: pass
            },
            success: function(response){
                if(response.error){
                    displayError(response.error);
                }else{
                    window.location.assign("dashboard.html");
                }
            }
        });
    });


    /*
    ======================================
    ======================== DISPLAY ERROR
    */
    function displayError(err){
        if($(".error").length){
            $(".error").remove();
        }

        $("body").append(
                "<div class=\"ui-widget error\" style=\"background: url('images/ui-bg_diagonals-thick_20_e69700_40x40.png'); width: 960px; padding: 8px 0; border-radius: 2px; position: absolute; top: 90px; left: 50%; margin-left: -480px; text-align: center; z-index: 150; -webkit-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.25); -moz-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.25); box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.25); \">" +
                "<div class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em\">" +
                "<p style=\"color: #fefefe\"><i class=\"icon-warning-sign\" style=\"padding: 0 5px\"></i>" +
                "<strong>Error:</strong> " + err + "</p>" +
                "</div>" +
                "</div>");

        $("document").ready(function (){
            $(".error").effect("shake", {
                times: 3,
                distance: 20
            });
        });

        $(".error").delay(3500).fadeOut("slow");
    }


    /*
    ======================================
    =============================== LOGOUT
    */
    $("#logOut").click(function(e){
        e.preventDefault();
        $.get("xhr/logout.php", function(){
           window.location.assign("index.html");
        });
    });


    /*
    ========================================
    =============================== REGISTER
    */
    $("#register").on("click", function(e){
        e.preventDefault();

        var name = $("#name").val();
        var ret = name.split(" ");
        var fName = ret[0];
        var lName = ret[1];

        var firstname = fName,
            lastname = lName,
            username = $("#userName").val(),
            email = $("#email").val(),
            password = $("#password").val();

        $.ajax({
            url: "xhr/register.php",
            type: "post",
            dataType: "json",
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            },

            success: function(response){
                if(response.error){
                    displayError(response.error);
                }else{
                    window.location.assign("dashboard.html");
                }
            }
        });
    });




    /*
    ========================================
    ======================= DISPLAY USERNAME
    */
    var currentUser = "";

    var greetings = function() {
        $.ajax({
            url: "xhr/get_user.php",
            type: "GET",
            dataType: "json",
            success: function(response){
                if(response.error){
                    displayError(response.error);
                } else {
                    currentUser = response.user.first_name + " " + response.user.last_name;
                    $("#user").html(response.user.first_name);
                }
            }
        });
    };




    /*
    ========================================
    ======================= DISPLAY PROJECTS
    */
    var projects = function() {
        $.ajax({
            url: "xhr/get_projects.php",
            type: "GET",
            dataType: "json",
            success: function(response){
                if(response.error){
                    displayError(response.error);
                }else{
                    if(response.projects.length < 1) {
                        $("#projects").append("<p>There are no projects to display. Create one!</p>");
                    }else{
                        for(var i= 0, j=response.projects.length; i < j; i++){
                            var price = ~~(Math.random() * 999 + 100);
                            var result = response.projects[i];
                            var dueDate = result.dueDate;
                            if(dueDate == null || dueDate == "null"){
                                dueDate = "N/A";
                            }

                            $("#projects").append(
                                "<div class=\"dashboardItem\">" +
                                    "<div class=\"dbHeader\">" +
                                    "<h3>" + result.projectName + "</h3>" +
                                    "<p>created on " + dateString + "</p>" +
                                    "<div class=\"dbLinks\">" +
                                    "<p><a href=\"#\">View Project</a> | <a href=\"#\" id=\"" + result.id + "\" class=\"delProject\">Cancel Project</a></p></div></div>" +
                                    "<div class=\"dbDescription dbSection\">" +
                                    "<p><b>Description</b></p>" +
                                    "<p>" + result.projectDescription + "</p></div>" +
                                    "<div class=\"dbInfo dbSection\">" +
                                    "<div class=\"dbLeft\">" +
                                    "<p class=\"dbSection\"><b>Deadline:</b> " + dueDate + " <a href=\"#\">Change Deadline</a></p>" +
                                    "<p><b>Project Status:</b></p><p>This project's status is " + result.status + ". <a href=\"#\">Change Status</a></p></div>" +
                                    "<div class=\"dbRight\">" +
                                    "<p class=\"dbSection\"><b>Balance:</b> <span class=\"balance\">$" + price + "</span> <a href=\"#\">View Invoice</a>" +
                                    "<p><b>Payments</b></p>" +
                                    "<p>There are no payments due at this time.</p></div></div>" +
                                    "<div class=\"clear\"></div></div>"
                            );
                        }

                        $(".delProject").on("click", function(e){
                            // Put in a check here if you have time...
                            e.preventDefault();
                            $.ajax({
                                url: "xhr/delete_project.php",
                                data: {
                                    projectID: e.target.id
                                },
                                type: "POST",
                                dataType: "json",
                                success: function(resp){
                                    if(resp.error){
                                        displayError(resp.error);
                                    }else{
                                        $("#projects").html(" ");
                                        projects();
                                    }
                                }
                            });
                        });
                        $("#projects").append("<p>There are no other projects.</p>");
                    }
                }
            }
        })
    };


    /*
    ========================================
    ======================== CREATE PROJECTS
    */
    $("#newProjectBtn").on("click", function(e){
        e.preventDefault();

        var projName = $("#projectName").val() + " " + $("#productName").val(),
            projDesc = $("#description").val(),
            projDue = $("#deadline").val(),
            status = $("input[name=\"status\"]:checked").prop("value");

        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status,
                startDate: dateString
            },

            success: function(response){
                if(response.error){
                    displayError(response.error);
                }else{
                    $("#createProject").trigger("reset");
                    $("#dd span").html("Select your product...");
                    $("#dd span").removeAttr("style");
                    populateModal();
                    $("#projects").html(" ");
                    projects();
                    $('#newProjectModal').fadeOut({queue: false, duration: 350});
                    $("#newProjectModal").animate({'top': '-575px'}, 500);
                    $("#overlay").fadeOut({queue: false, duration: 500});
                }
            }
        });
    });


    /*
    =======================================
    ================================== MISC
    */
    if($("#dashboard").length){
        greetings();
        projects();
    }

    $("document").ready(function() {
        $("#projects").sortable({items: "> div"});
        $("#projects").disableSelection();

        $("#deadline").datepicker({
            onSelect: function(dateText) {
                $("#deadlinePreview").html($("#deadline").val());
            }
        });
    });
})(jQuery); // end private scope


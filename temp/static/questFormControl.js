$(document).ready(function() {
			$("#tasks_location_parent").css("display", "none");
			
			$(".is_tasks_location").click(function() {
						if ($('input[name=tasks_location]:checked').val() == "Yes") {
							$("#tasks_location_parent").slideDown("fast"); // Slide
																			// Down
																			// Effect
						} else {
							$("#tasks_location_parent").slideUp("fast"); // Slide
																		// Up
																		// Effect
						}
					});
			$("#tasks_text_parent").css("display", "none");
			$(".is_tasks_text").click(function() {
						if ($('input[name=tasks_text]:checked').val() == "Yes") {
							$("#tasks_text_parent").slideDown("fast"); // Slide
																		// Down
																		// Effect
						} else {
							$("#tasks_text_parent").slideUp("fast"); // Slide Up
																	// Effect
						}
					});
			$("#tasks_choice_parent").css("display", "none");
			$(".is_tasks_choice").click(function() {
						if ($('input[name=tasks_choice]:checked').val() == "Yes") {
							$("#tasks_choice_parent").slideDown("fast"); // Slide
																		// Down
																		// Effect
						} else {
							$("#tasks_choice_parent").slideUp("fast"); // Slide
																		// Up
																		// Effect
						}
					});
			$("#hints_parent").css("display", "none");
			$(".is_hints").click(function() {
						if ($('input[name=hints]:checked').val() == "Yes") {
							$("#hints_parent").slideDown("fast"); // Slide
																		// Down
																		// Effect
						} else {
							$("#hints_parent").slideUp("fast"); // Slide Up
							// Effect
						}
					});

		});
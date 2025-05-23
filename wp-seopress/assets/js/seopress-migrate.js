jQuery(document).ready(function ($) {
	//Select toggle
	$("#select-wizard-redirects")
		.change(function (e) {
			e.preventDefault();

			var select = $(this).val();
			if (select == "none") {
				$(
					"#select-wizard-redirects option"
				).each(function () {
					var ids_to_hide = $(this).val();
					$("#" + ids_to_hide).hide();
				});
			} else {
				$(
					"#select-wizard-redirects option:selected"
				).each(function () {
					var ids_to_show = $(this).val();
					$("#" + ids_to_show).show();
				});
				$(
					"#select-wizard-redirects option:not(:selected)"
				).each(function () {
					var ids_to_hide = $(this).val();
					$("#" + ids_to_hide).hide();
				});
			}
		})
		.trigger("change");
	
	// Initially hide all migration tools 
	$(".seopress-import-tools-wrapper .section-tool").hide();
	$(".seopress-import-tools-wrapper .section-tool.active").show();
	
	// Show the selected migration tool when a radio button is checked or focused
	$(".seopress-import-tools-wrapper input[name='select-wizard-import']").on("change focus keydown click input", function (e) {
		if (e.type === "change" || 
			(e.type === "keydown" && (e.key === "Enter" || e.key === " ")) || 
			e.type === "focus") {
			// Ensure the radio button is selected when focused
			if (e.type === "focus") {
				$(this).prop("checked", true).trigger("change");
				return; // Exit to prevent duplicate actions
			}
			$(".seopress-import-tool").removeClass("active");
			$(this).closest(".seopress-import-tool").addClass("active"); // Add active class to the closest label
			$(".seopress-import-tools-wrapper .section-tool").hide(); // Hide all tools
			const selectedTool = $(this).val();
			$("#" + selectedTool + ".section-tool").show(); // Show the selected tool
		}
	});

	// Import from SEO plugins
	const seo_plugins = [
		"yoast",
		"aio",
		"seo-framework",
		"rk",
		"squirrly",
		"seo-ultimate",
		"wp-meta-seo",
		"premium-seo-pack",
		"wpseo",
		"smart-crawl",
		"slim-seo",
		"metadata",
	];
	seo_plugins.forEach(function (item) {
		$("#seopress-" + item + "-migrate").on("click", function (e) {
			e.preventDefault();
			id = item;
			switch (e.target.id) {
				case "seopress-yoast-migrate":
					url =
						seopressAjaxMigrate.seopress_yoast_migrate
							.seopress_yoast_migration;
					action = "seopress_yoast_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_yoast_migrate
							.seopress_nonce;
					break;
				case "seopress-aio-migrate":
					url =
						seopressAjaxMigrate.seopress_aio_migrate
							.seopress_aio_migration;
					action = "seopress_aio_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_aio_migrate.seopress_nonce;
					break;
				case "seopress-seo-framework-migrate":
					url =
						seopressAjaxMigrate.seopress_seo_framework_migrate
							.seopress_seo_framework_migration;
					action = "seopress_seo_framework_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_seo_framework_migrate
							.seopress_nonce;
					break;
				case "seopress-rk-migrate":
					url =
						seopressAjaxMigrate.seopress_rk_migrate
							.seopress_rk_migration;
					action = "seopress_rk_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_rk_migrate.seopress_nonce;
					break;
				case "seopress-squirrly-migrate":
					url =
						seopressAjaxMigrate.seopress_squirrly_migrate
							.seopress_squirrly_migration;
					action = "seopress_squirrly_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_squirrly_migrate
							.seopress_nonce;
					break;
				case "seopress-seo-ultimate-migrate":
					url =
						seopressAjaxMigrate.seopress_seo_ultimate_migrate
							.seopress_seo_ultimate_migration;
					action = "seopress_seo_ultimate_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_seo_ultimate_migrate
							.seopress_nonce;
					break;
				case "seopress-wp-meta-seo-migrate":
					url =
						seopressAjaxMigrate.seopress_wp_meta_seo_migrate
							.seopress_wp_meta_seo_migration;
					action = "seopress_wp_meta_seo_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_wp_meta_seo_migrate
							.seopress_nonce;
					break;
				case "seopress-premium-seo-pack-migrate":
					url =
						seopressAjaxMigrate.seopress_premium_seo_pack_migrate
							.seopress_premium_seo_pack_migration;
					action = "seopress_premium_seo_pack_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_premium_seo_pack_migrate
							.seopress_nonce;
					break;
				case "seopress-smart-crawl-migrate":
					url =
						seopressAjaxMigrate.seopress_smart_crawl_migrate
							.seopress_smart_crawl_migration;
					action = "seopress_smart_crawl_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_smart_crawl_migrate
							.seopress_nonce;
					break;
				case "seopress-slim-seo-migrate":
					url =
						seopressAjaxMigrate.seopress_slim_seo_migrate
							.seopress_slim_seo_migration;
					action = "seopress_slim_seo_migration";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_slim_seo_migrate
							.seopress_nonce;
					break;
				case "seopress-metadata-migrate":
					url =
						seopressAjaxMigrate.seopress_metadata_csv
							.seopress_metadata_export;
					action = "seopress_metadata_export";
					_ajax_nonce =
						seopressAjaxMigrate.seopress_metadata_csv
							.seopress_nonce;
					break;
				default:
			}
			self.process_offset(0, self, url, action, _ajax_nonce, id);
		});

		process_offset = function (
			offset,
			self,
			url,
			action,
			_ajax_nonce,
			id,
			post_export,
			term_export
		) {
			i18n = seopressAjaxMigrate.i18n.migration;
			if (id == "metadata") {
				i18n = seopressAjaxMigrate.i18n.export;
				var cptData = $("#seopress-export-csv-form .post-type-checkbox:checked").serializeArray();
				var taxData = $("#seopress-export-csv-form .taxonomy-checkbox:checked").serializeArray();
			}
			$.ajax({
				method: "POST",
				url: url,
				data: {
					action: action,
					offset: offset,
					post_export: post_export,
					term_export: term_export,
					cptData: cptData,
					taxData: taxData,
					_ajax_nonce: _ajax_nonce
				},
				success: function (data) {
					if (false === data.success) {
						window.location.reload(true);
					} else if ("done" === data.data.offset) {
						$("#seopress-" + id + "-migrate").removeAttr(
							"disabled"
						);
						$(".spinner").css("visibility", "hidden");
						$("#" + id + "-migration-tool .log").css("display", "block");
						$("#" + id + "-migration-tool .log").html("<div class='seopress-notice is-success'><p>" + i18n + "</p></div>");

						if (data.data.url != "") {
							$(location).attr("href", data.data.url);
						}
					} else {
						self.process_offset(
							parseInt(data.data.offset),
							self,
							url,
							action,
							_ajax_nonce,
							id,
							data.data.post_export,
							data.data.term_export,
							data.data.cptData,
							data.data.taxData
						);
						if (data.data.total) {
							progress = (data.data.count / data.data.total * 100).toFixed(2);
							$("#" + id + "-migration-tool .log").css("display", "block");
							$("#" + id + "-migration-tool .log").html("<div class='seopress-notice'><p>" + progress + "%</p></div>");
						}
					}
				},
			});
		};
		$("#seopress-" + item + "-migrate").on("click", function () {
			$(this).attr("disabled", "disabled");
			$("#" + item + "-migration-tool .spinner").css(
				"visibility",
				"visible"
			);
			$("#" + item + "-migration-tool .spinner").css("float", "none");
			$("#" + item + "-migration-tool .log").html("");
		});
	});
});

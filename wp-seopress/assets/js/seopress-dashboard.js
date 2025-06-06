jQuery(document).ready(function ($) {
    //If no notices
    if (!$.trim($("#seopress-notifications-center").html())) {
        $('#seopress-notifications-center').remove();
    }
    const notices = [
        "notice-get-started",
        "notice-usm",
        "notice-wizard",
        "notice-amp-analytics",
        "notice-litespeed-cache",
        "notice-divide-comments",
        "notice-review",
        "notice-trailingslash",
        "notice-posts-number",
        "notice-xml-sitemaps",
        "notice-rss-use-excerpt",
        "notice-ga-ids",
        "notice-search-console",
        "notice-google-business",
        "notice-ssl",
        "notice-title-tag",
        "notice-enfold",
        "notice-themes",
        "notice-page-builders",
        "notice-ebooks",
        "notice-integrations",
        "notice-noindex",
        "notice-tasks",
        "notice-insights",
        "notice-robots-txt",
        "notice-robots-txt-valid",
        "notice-wpml-active",
    ]
    notices.forEach(function (item) {
        $('#' + item).on('click', function () {
            $('#' + item).attr('data-notice', $('#' + item).attr('data-notice') == '1' ? '0' : '1');

            $.ajax({
                method: 'POST',
                url: seopressAjaxHideNotices.seopress_hide_notices,
                data: {
                    action: 'seopress_hide_notices',
                    notice: item,
                    notice_value: $('#' + item).attr('data-notice'),
                    _ajax_nonce: seopressAjaxHideNotices.seopress_nonce,
                },
                success: function (data) {
                    $('#seopress-notice-save').css('display', 'block');
                    $('#seopress-notice-save .html').html('Notice successfully removed');
                    $('#' + item + '-alert').fadeOut();
                    $('#seopress-notice-save').delay(3500).fadeOut();
                },
            });
        });
    });

    const features = [
        "titles",
        "xml-sitemap",
        "social",
        "google-analytics",
        "instant-indexing",
        "advanced",
        "local-business",
        "woocommerce",
        "edd",
        "alerts",
        "dublin-core",
        "rich-snippets",
        "breadcrumbs",
        "inspect-url",
        "robots",
        "news",
        "404",
        "bot",
        "rewrite",
        "white-label",
        "ai",
        "universal-metabox"
    ]
    features.forEach(function (item) {
        $('#toggle-' + item).on('click', function () {
            $('#toggle-' + item).attr('data-toggle', $('#toggle-' + item).attr('data-toggle') == '1' ? '0' : '1');

            $(this).siblings('#titles-state-default').toggleClass('feature-state-off');
            $(this).siblings('#titles-state').toggleClass('feature-state-off');

            $.ajax({
                method: 'POST',
                url: seopressAjaxToggleFeatures.seopress_toggle_features,
                data: {
                    action: 'seopress_toggle_features',
                    feature: 'toggle-' + item,
                    feature_value: $('#toggle-' + item).attr('data-toggle'),
                    _ajax_nonce: seopressAjaxToggleFeatures.seopress_nonce,
                },
                success: function () {
                    window.history.pushState("", "", window.location.href + "&settings-updated=true");
                    $('#seopress-notice-save').show();
                    $('#seopress-notice-save').delay(3500).fadeOut();
                    window.history.pushState("", "", window.location.href)
                },
            });
        });
    });
    $('#seopress-activity-panel button, #seopress-notifications button').on('click', function () {
        $(this).toggleClass('is-active');
        $('#seopress-activity-panel-' + $(this).data('panel')).toggleClass('is-open');
    });
    $('#wpbody-content > form, #seopress-content').on('click', function (e) {
        if (e.target.id !== 'seopress-see-notifications') {
            $('#seopress-activity-panel').find('.is-open').toggleClass('is-open');
            $('#seopress-activity-panel').find('.is-active').toggleClass('is-active');
        }
    });
    $('.seopress-item-toggle-options').on('click', function () {
        $(this).next('.seopress-card-popover').toggleClass('is-open');
    });

    $('#seopress_news').on('click', function () {
        $('#seopress-news-panel').toggleClass('is-active');
        $('#seopress_news').attr('data-toggle', $('#seopress_news').attr('data-toggle') == '1' ? '0' : '1');
        $.ajax({
            method: 'POST',
            url: seopressAjaxDisplay.seopress_display,
            data: {
                action: 'seopress_display',
                news_center: $('#seopress_news').attr('data-toggle'),
                _ajax_nonce: seopressAjaxDisplay.seopress_nonce,
            },
        });
    });
    $('#seopress_tools').on('click', function () {
        $('#notice-insights-alert').toggleClass('is-active');
        $('#seopress_tools').attr('data-toggle', $('#seopress_tools').attr('data-toggle') == '1' ? '0' : '1');
        $.ajax({
            method: 'POST',
            url: seopressAjaxDisplay.seopress_display,
            data: {
                action: 'seopress_display',
                tools_center: $('#seopress_tools').attr('data-toggle'),
                _ajax_nonce: seopressAjaxDisplay.seopress_nonce,
            },
        });
    });
    $('#notifications_center').on('click', function () {
        $('#seopress-notifications').toggleClass('is-active');
        $('#notifications_center').attr('data-toggle', $('#notifications_center').attr('data-toggle') == '1' ? '0' : '1');
        $.ajax({
            method: 'POST',
            url: seopressAjaxDisplay.seopress_display,
            data: {
                action: 'seopress_display',
                notifications_center: $('#notifications_center').attr('data-toggle'),
                _ajax_nonce: seopressAjaxDisplay.seopress_nonce,
            },
        });
    });
    $('#notice-tasks').on('click', function () {
        $('#notice-tasks-alert').toggleClass('is-active');
        $('#notice-tasks').attr('data-toggle', $('#notice-tasks').attr('data-toggle') == '1' ? '0' : '1');
    });
    $('#notice-get-started').on('click', function () {
        $('#notice-get-started-alert').toggleClass('is-active');
        $('#notice-get-started').attr('data-toggle', $('#notice-get-started').attr('data-toggle') == '1' ? '0' : '1');
    });
    $('#notice-integrations').on('click', function () {
        $('#seopress-integration-panel').toggleClass('is-active');
        $('#notice-integrations').attr('data-toggle', $('#notice-integrations').attr('data-toggle') == '1' ? '0' : '1');
    });
    $('#notice-ebooks').on('click', function () {
        $('#seopress-ebook-panel').toggleClass('is-active');
        $('#notice-ebooks').attr('data-toggle', $('#notice-ebooks').attr('data-toggle') == '1' ? '0' : '1');
    });
});

//Dashboard - Simple view
jQuery(document).ready(function ($) {
    $('.seopress-btn-view-switch').on('click', function () {
        $('body').toggleClass('seopress-simple-view');
        $.ajax({
            method: 'POST',
            url: seopressAjaxSwitchView.seopress_switch_view,
            data: {
                action: 'seopress_switch_view',
                view: $('body').hasClass('seopress-simple-view') ? 'simple' : 'default',
                _ajax_nonce: seopressAjaxSwitchView.seopress_nonce,
            },            
        });
    });
});

//SEO Tools Tabs
jQuery(document).ready(function ($) {
    var get_hash = window.location.hash;
    var clean_hash = get_hash.split('$');

    if (typeof sessionStorage != 'undefined') {
        var seopress_admin_tab_session_storage = sessionStorage.getItem("seopress_admin_tab");

        if (clean_hash[1] == '1') { //Analytics Tab
            $('#tab_seopress_analytics-tab').addClass("nav-tab-active");
            $('#tab_seopress_analytics').addClass("active");
        } else if (clean_hash[1] == '2') { //Matomo Tab
            $('#tab_seopress_matomo-tab').addClass("nav-tab-active");
            $('#tab_seopress_matomo').addClass("active");
        } else if (clean_hash[1] == '3') { //Page Speed Tab
            $('#tab_seopress_ps-tab').addClass("nav-tab-active");
            $('#tab_seopress_ps_tools').addClass("active");
        } else if (clean_hash[1] == '4') { //GSC Tab
            $('#tab_seopress_gsc-tab').addClass("nav-tab-active");
            $('#tab_seopress_gsc').addClass("active");
        } else if (seopress_admin_tab_session_storage) {
            $('#seopress-admin-tabs').find('.nav-tab.nav-tab-active').removeClass("nav-tab-active");
            $('#seopress-admin-tabs').find('.seopress-tab.active').removeClass("active");
            $('#' + seopress_admin_tab_session_storage.split('#tab=') + '-tab').addClass("nav-tab-active");
            $('#' + seopress_admin_tab_session_storage.split('#tab=')).addClass("active");
        } else {
            //Default TAB
            $('#seopress-admin-tabs a.nav-tab').first().addClass("nav-tab-active");
            $('#seopress-admin-tabs .wrap-seopress-tab-content > div').first().addClass("active");
        }
    };
    $("#seopress-admin-tabs").find("a.nav-tab").click(function (e) {
        e.preventDefault();
        var hash = $(this).attr('href').split('#tab=')[1];

        $('#seopress-admin-tabs').find('.nav-tab.nav-tab-active').removeClass("nav-tab-active");
        $('#' + hash + '-tab').addClass("nav-tab-active");

        if (clean_hash[1] == 1) {
            sessionStorage.setItem("seopress_admin_tab", 'tab_seopress_analytics');
        } else if (clean_hash[1] == 2) {
            sessionStorage.setItem("seopress_admin_tab", 'tab_seopress_matomo');
        } else if (clean_hash[1] == 3) {
            sessionStorage.setItem("seopress_admin_tab", 'tab_seopress_ps_tools');
        } else {
            sessionStorage.setItem("seopress_admin_tab", hash);
        }

        $('#seopress-admin-tabs').find('.seopress-tab.active').removeClass("active");
        $('#' + hash).addClass("active");
    });
});

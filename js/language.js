var language = new function(){
    init();
    changeLanguage(newUserLanguage)
    updateStatic();

        /****** FUNCTION ******/

        function init()
        {
            var languageList = new Array();
            var cssStati18nCssFileName = "css/stati18n.css";
            var cssStati18nFileName = "css/stati18n";
            var defaultUserLanguage = 'en';
            $('link[rel="stylesheet"]').each(function () {
                var fileName = $(this).attr('href');
                if (fileName != cssStati18nCssFileName && fileName.indexOf(cssStati18nFileName) > -1)
                    defaultUserLanguage = fileName.slice(cssStati18nFileName.Length, -4);
            });

            var userLanguage = defaultUserLanguage;

            $('.stati18n-language-selector').each(function () {
                languageList.push(this.getAttribute('value'));
            });
            //get info about css files
            $('body').append('<div id="stati18n-infos" style="display:none;"></div>');

            var infos;
            if (stati18n.isIE()) {
                var cssElem = window.getComputedStyle(document.getElementById("stati18n-infos"));
                infos = cssElem['customContent'];
            }
            else {
                infos = $("#stati18n-infos").css("content");
            }

            infos = infos.slice(1, infos.length - 1);
            var infosTab = infos.split(" ");
            var host = infosTab[0];
            var languages = infosTab.slice(1, infosTab.length);

            $('#stati18n-infos').remove();

            //get static content
            $('body').append('<div id="stati18n-fixed-values" style="display:none;"></div>');

            if (stati18n.isIE()) {
                var cssElem = window.getComputedStyle(document.getElementById("stati18n-fixed-values"));
                infos = cssElem['customContent'];
            }
            else {
                infos = $("#stati18n-fixed-values").css("content");
            }
            infos = infos.slice(1, infos.length - 1);
            var fixedTab = infos.split(";;");

            $('#stati18n-fixed-values').remove();

            var i = languageList.indexOf(userLanguage);
            if (i > -1) {
                userLanguage = languageList[i]
            }
            else {
                userLanguage = languageList[0];
            }

            var newUserLanguage = getCookie("lang");
            if (newUserLanguage == undefined) {
                newUserLanguage = navigator.language || navigator.userLanguage;
            }
        }
        //Add static content
        function updateStatic() {
            for (var ind in fixedTab) {
                var line = fixedTab[ind];
                var lineSplit = line.split("§§");
                var currentLanguage = lineSplit[0];

                if (currentLanguage == userLanguage) {
                    var id = lineSplit[1];
                    var content = lineSplit[2];

                    if (typeof ($(".s18n-" + id).attr("value")) != 'undefined')
                        $(".s18n-" + id).attr("value", content);
                    else
                        $(".s18n-" + id).html(content);
                }
            }
        }

        //Modify language
        function changeLanguage(newLanguage) {
            // If the language is one that is already displayed
            if (userLanguage == newLanguage)
                return;
            var precUserLanguage = userLanguage
            userLanguage = newLanguage;

            var precFile = host + 'stati18n-' + precUserLanguage + '.css';
            var file = host + 'stati18n-' + userLanguage + '.css';

            if (!$("link[href='" + file + "']").length && $.inArray(userLanguage, languages) >= 0) {
                $("link[href='" + precFile + "']").remove();
                $('head').append('<link rel="stylesheet" href="' + file + '" type="text/css" />');
            }
            updateStatic();
            stati18n.createCookie("lang", userLanguage, 7);
        }

        /****** EVENTS ******/

        $('.stati18n-language-selector').click(function (e) {
            changeLanguage(this.getAttribute('value'));
        });
}();

    
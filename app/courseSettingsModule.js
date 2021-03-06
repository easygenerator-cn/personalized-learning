﻿define(['plugins/http', 'Q'], function (http, Q) {
    "use strict";

    var courseSettingsModule = {
        courseSettings: {
            logo: { url: '' },
            xApi: {
                enabled: true,
                selectedLrs: "default",
            }
        },
        initialize: initialize
    };

    return courseSettingsModule;

    function initialize() {

        var defer = Q.defer();
        $.getJSON('settings.js?_=' + new Date().getTime()).then(function (json) {
            $.extend(courseSettingsModule.courseSettings, json);
            defer.resolve(json);
        }).fail(function () {
            defer.resolve({});
        });

        return defer.promise.then(function (settings) {
            $.extend(courseSettingsModule.courseSettings, settings);
        });
    }

});
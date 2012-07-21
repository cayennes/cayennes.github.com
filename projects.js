/*jslint plusplus: true, maxlen: 72, browser: true */
/*globals $ */

var RavelryThing = {
    projects: [],

    loadData: function (data) {
        "use strict";
        this.projects = data.projects;
    },

    getHappiest: function () {
        "use strict";
        var i, j,
            happyProjects = [];
        for (i = this.projects.length - 1; i--; i >= 0) {
            if (this.projects[i].happiness === 4) {
                happyProjects.push(this.projects[i]);
            }
        }
        return happyProjects;
    }
};

$(document).ready(function () {
    "use strict";
    var i, happiest, happiestHtml,
        $happiestProjectDiv = $('#happiest');
    if ($happiestProjectDiv.length) {
        happiest = RavelryThing.getHappiest();
        happiestHtml = '';
        for (i = happiest.length - 1; i >= 0; i--) {
            happiestHtml += '<a href="' + happiest[i].url + '"><img ' +
                'src="' + happiest[i].thumbnail.src + '" ' +
                 'alt="' + happiest[i].name + '" /></a>';
        }
        $happiestProjectDiv.html(happiestHtml);
    }
});

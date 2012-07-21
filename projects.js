/*jslint plusplus: true, maxlen: 72, browser: true */
/*globals $ */

var cyRavelryThing;

// Singleton object to manage the projects
cyRavelryThing = {
    projects: [],

    loadData: function (data) {
        "use strict";
        var Project, i;
        // Project class
        Project = function (ravelryProject) {
            var key;
            for (key in ravelryProject) {
                if (ravelryProject.hasOwnProperty(key)) {
                    this[key] = ravelryProject[key];
                }
            }
        };
        Project.prototype.getLinkImgHtml = function () {
            var html = '';
            if (this.thumbnail) {
                html = '<a href="' + this.url + '">' +
                    '<img ' + 'src="' + this.thumbnail.src + '" ' +
                    'alt="' + this.name + '" /></a>';
            }
            return html;
        };

        // Load the data
        for (i = data.projects.length - 1; i >= 0; i--) {
            this.projects[i] = new Project(data.projects[i]);
        }
    },

    getProjects: function (filters) {
        "use strict";
        var i, key,
            selectedProjects = this.projects.slice(0);
        for (i = selectedProjects.length - 1; i >= 0; i--) {
            for (key in filters) {
                if (filters.hasOwnProperty(key)) {
                    if ($.inArray(
                            selectedProjects[i][key],
                            filters[key]
                        ) === -1) {
                        selectedProjects.splice(i, 1);
                        break;
                    }
                }
            }
        }
        return selectedProjects;
    },

    getGallery: function (filters) {
        "use strict";
        var i,
            html = '',
            projects = this.getProjects(filters);
        for (i = projects.length - 1; i >= 0; i--) {
            html += projects[i].getLinkImgHtml();
        }
        return html;
    }
};

// Place the projects on the page
$(document).ready(function () {
    "use strict";
    var i, filter, projects,
        $happiestProjectDiv = $('#happiest'),
        $selectedProjectDiv = $('#selected');
    if ($happiestProjectDiv.length) {
        filter = {'happiness': [4]};
        $happiestProjectDiv.html(cyRavelryThing.getGallery(filter));
    }
    if ($selectedProjectDiv.length) {
        filter = {'permalink': $.url().param('projects').split('+')};
        $selectedProjectDiv.html(cyRavelryThing.getGallery(filter));
    }
});

/*jslint plusplus: true, maxlen: 72, browser: true */
/*globals jQuery */

var cyRavelryThing;

// Singleton object to manage the projects
cyRavelryThing = {
    projects: [],

    loadData: function (data) {
        "use strict";
        this.projects = data.projects;
    },

    getProjects: function (filters) {
        "use strict";
        var i, key,
            selectedProjects = this.projects.slice(0);
        for (i = selectedProjects.length - 1; i >= 0; i--) {
            for (key in filters) {
                if (filters.hasOwnProperty(key)) {
                    if (jQuery.inArray(
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
    }
};

(function ($) {
    "use strict";
    // Functions to turn projects into elements
    function $makeProjectLinkImg(project) {
        var $link = $('<a>', {href: project.url});
        if (project.thumbnail) {
            $link.append($('<img>', {
                src: project.thumbnail.src,
                alt: project.name
            }));
        }
        return $link;
    }

    function $makeGallery(projects) {
        var i, $gallery;
        $gallery = $('<div>', {'class': 'projects'});
        for (i = projects.length - 1; i >= 0; i--) {
            $gallery.append($makeProjectLinkImg(projects[i]));
        }
        return $gallery;
    }

    // Place the projects on the page
    $(document).ready(function () {
        var $dataFilterDiv = $('div [data-filter]');
        $dataFilterDiv.each(function () {
            var filter, params, projects;
            if ($(this).data('filter') === "url") {
                filter = {};
                jQuery.each(jQuery.url().param(), function (k, v) {
                    var values, i;
                    values = v.split('+');
                    for (i = values.length - 1; i >= 0; i--) {
                        if (!isNaN(parseFloat(values[i]))) {
                            values[i] = parseFloat(values[i]);
                        }
                    }
                    filter[k] = values;
                    
                });
            } else {
                filter = $(this).data('filter');
            }
            projects = cyRavelryThing.getProjects(filter);
            $(this).replaceWith($makeGallery(projects));
        });
    });
}(jQuery));

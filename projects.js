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
        if (typeof filters === 'undefined') {
            filters = {};
        }
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
    function $makeProjectImg(project) {
        var $img;
        if (project.thumbnail) {
            $img = $('<img>', {
                src: project.thumbnail.src,
                alt: project.name
            });
            $img.data('project', project);
        }
        return $img;
    }

    function $makeProjectLinkImg(project) {
        var $link = $('<a>', {href: project.url});
        $link.append($makeProjectImg(project));
        return $link;
    }

    function $makeGallery(projects, $makeProjectHtml) {
        var i, $gallery;
        $gallery = $('<div>', {'class': 'projects'});
        for (i = projects.length - 1; i >= 0; i--) {
            $gallery.append($makeProjectHtml(projects[i]));
        }
        return $gallery;
    }

    // Place the projects on the page
    $(document).ready(function () {
        var $dataFilterDiv = $('div [data-filter]'),
            $linkSpan = $('#generated-link');
        $dataFilterDiv.each(function () {
            var filter, params, projects, $gallery;
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
            if ($(this).data('mode') === 'creator') {
                $gallery = $makeGallery(projects, $makeProjectImg);
                $gallery.delegate('img', 'click', function () {
                    var url, $link;
                    $(this).toggleClass('selected');
                    url = 'showcase.html?permalink=';
                    $('div.projects img.selected').each(function () {
                        url += $(this).data('project').permalink + '+';
                    });
                    $linkSpan.attr('href', url);
                });
            } else {
                $gallery = $makeGallery(projects, $makeProjectLinkImg);
            }
            $(this).replaceWith($gallery);
        });
    });
}(jQuery));

const sanitizeHtml = require('sanitize-html');

exports.paginationControl = (req) => {
    var pager = {};
    var pageNumber = parseInt(req.query.pn);

    if (pageNumber) {
        pager.pageNumber = pageNumber;
    } else {
        pager.pageNumber = 1;
    }

    var pageSizeLimt = parseInt(req.query.l);

    if (pageSizeLimt) {
        pager.pageSizeLimt = pageSizeLimt;
    } else {
        pager.pageSizeLimt = 20;
    }

    return {
        pageNumber: pager.pageNumber,
        pageSizeLimt: pager.pageSizeLimt
    };
}


exports.slugifyConflictEmail = (string) => {
    return string.replace(/\s+/g, '-').toLowerCase();
}


exports.removeCharFromString = (val, char) => {
    return val.replace(char, '');
}

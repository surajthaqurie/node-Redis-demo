((provideHelper) => {
    'use strict';


    const Promise = require('bluebird');
    const join = Promise.join;


    provideHelper.getPaginationDataList = (collection, queryOpts, pagerOpts, projectFields, sortOpts) => {

        return join(collection
            .find(queryOpts, projectFields)
            .skip(pagerOpts.pageSizeLimit * (pagerOpts.pageNumber - 1))
            .limit(pageOpts.pageSizeLimit)
            .sort(sortOpts).toArray(), collection.count(queryOpts),
            (dataList, count) => {
                return {
                    dataList: dataList,
                    totalItems: count,
                    currentpage: pagerOpts.page
                };
            });
    }

})(module.exports);
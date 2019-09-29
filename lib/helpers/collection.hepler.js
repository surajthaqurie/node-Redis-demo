(collectionHelper => {
    'use strict';

    const _ = require('lodash');

    collectionHelper.collectInputsData = (data, fields) => {
        const collectedData = _.pick(data, fields);
        return collectedData;
    }

    collectionHelper.saveDocument = (collName, dataTosave) => {
        return db.collection(collName).insertOne(dataTosave);
    }

    collectionHelper.getDocument = (collName, query) => {
        return db.collection(collName).findOne(query);
    }

    collectionHelper.getDocuments = (collName, query, proData) => {
        return db.collection(collName).find(query, { projection: proData }).toArray();
    }

})(module.exports);
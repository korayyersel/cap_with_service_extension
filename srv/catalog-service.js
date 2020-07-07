const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Products } = this.entities;
    const service = await cds.connect.to('NorthWind');

    const db = await cds.connect.to('db');
    const { ProductExtension } = await db.entities('qperior.serviceextension');
    const productExtension = await db.run(SELECT.from(ProductExtension));

    this.on('READ', Products, request => {
        request.query.SELECT.columns.pop();
        return service.tx(request).run(request.query);
    });

    this.after('READ', Products, async (results, req) => {
        results.forEach(product => product.AlternateName = 
            productExtension.find(productExtension => productExtension.ID === product.ID) ?
            productExtension.find(productExtension => productExtension.ID === product.ID).AlternateName : "");
    });
});
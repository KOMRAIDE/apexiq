/* =========================================================
   APEXIQ V0.1
   HELPER FUNCTIONS + BUSINESS CALCULATIONS
========================================================= */

function naira(amount) {

    return "₦" + amount.toLocaleString("en-NG", {
        maximumFractionDigits: 0
    });

}


function percentage(value) {

    return value.toFixed(1) + "%";

}


/* =========================================================
   BUSINESS CALCULATIONS
========================================================= */

function calculateBusinessMetrics() {

    let revenue = 0;
    let grossProfit = 0;
    let stockValue = 0;

    products.forEach(product => {

        const productRevenue =
            product.unitsSold * product.sellingPrice;

        const productCost =
            product.unitsSold * product.purchaseCost;

        revenue += productRevenue;

        grossProfit +=
            productRevenue - productCost;

        stockValue +=
            product.currentStock * product.purchaseCost;

    });


    const grossMargin =
        revenue > 0
            ? (grossProfit / revenue) * 100
            : 0;


    return {
        revenue,
        grossProfit,
        stockValue,
        grossMargin
    };

}


/* =========================================================
   PRODUCT INTELLIGENCE METRICS
========================================================= */

function getProductMetrics(product) {

    const unitProfit =
        product.sellingPrice - product.purchaseCost;

    const margin =
        product.sellingPrice > 0
            ? (unitProfit / product.sellingPrice) * 100
            : 0;

    const averageDailySales =
        product.unitsSold / 30;

    const daysOfStock =
        averageDailySales > 0
            ? product.currentStock / averageDailySales
            : Infinity;

    const inventoryValue =
        product.currentStock * product.purchaseCost;


    return {
        unitProfit,
        margin,
        averageDailySales,
        daysOfStock,
        inventoryValue
    };

}
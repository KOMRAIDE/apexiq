/* =========================================================
   APEXIQ V0.1
   BASELINE INTELLIGENCE
========================================================= */

function generateInsights() {
    const stockoutProducts = products.filter(product => {
        const metrics = getProductMetrics(product);
        return metrics.daysOfStock <= 7 || product.currentStock <= product.minimumStock;
    });

    const slowProducts = products.filter(product => {
        const metrics = getProductMetrics(product);
        return metrics.daysOfStock > 90 && metrics.inventoryValue > 50000;
    });

    const expensiveSuppliers = suppliers.filter(supplier => {
        return supplier.currentPrice > supplier.oldPrice;
    });

    const strongProducts = products
        .filter(product => {
            const metrics = getProductMetrics(product);
            return metrics.margin >= 35 && product.unitsSold >= 15;
        })
        .sort((a, b) => getProductMetrics(b).unitProfit - getProductMetrics(a).unitProfit);

    return {
        stockoutProducts,
        slowProducts,
        expensiveSuppliers,
        strongProducts
    };
}

function generateRecommendations() {
    const insights = generateInsights();

    const restockProducts = [...insights.stockoutProducts]
        .sort((a, b) => getProductMetrics(a).daysOfStock - getProductMetrics(b).daysOfStock);

    const productsToRestock = restockProducts.slice(0, 2);
    const slowInventory = [...insights.slowProducts]
        .sort((a, b) => getProductMetrics(b).inventoryValue - getProductMetrics(a).inventoryValue)
        .slice(0, 1);

    const supplierPriceIncrease = [...insights.expensiveSuppliers]
        .sort((a, b) => (b.currentPrice - b.oldPrice) - (a.currentPrice - a.oldPrice))
        .slice(0, 1);

    return {
        productsToRestock,
        slowInventory,
        supplierPriceIncrease
    };
}

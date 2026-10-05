/* =========================================================
   APEXIQ V0.1
   APPLICATION / UI RENDERING
========================================================= */


/* =========================================================
   RENDER KPI
========================================================= */

function renderKPIs() {

    const metrics =
        calculateBusinessMetrics();


    document.getElementById("revenue").textContent =
        naira(metrics.revenue);


    document.getElementById("grossProfit").textContent =
        naira(metrics.grossProfit);


    document.getElementById("grossMargin").textContent =
        percentage(metrics.grossMargin);


    document.getElementById("stockValue").textContent =
        naira(metrics.stockValue);

}


/* =========================================================
   APEXIQ DETAIL MODAL
   Used by Insights and Recommendations
========================================================= */

function createApexModal(title, content, buttonText = "Close") {

    const existingModal =
        document.getElementById("apexiqModal");

    if (existingModal) {
        existingModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.id =
        "apexiqModal";

    modal.className =
        "fixed inset-0 z-[9999] flex items-center justify-center p-4";


    modal.innerHTML = `

        <div
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
            id="apexiqModalOverlay">
        </div>


        <div
            class="relative w-full max-w-lg bg-white rounded-2xl
                   shadow-2xl border border-gray-100
                   overflow-hidden fade-in">

            <div class="p-5 sm:p-6 border-b border-gray-100">

                <div class="flex items-start justify-between gap-4">

                    <div>

                        <p
                            class="text-xs font-bold uppercase
                                   tracking-wider text-gray-400 mb-2">
                            ApexIQ Intelligence
                        </p>

                        <h2 class="text-xl font-bold text-gray-900">
                            ${title}
                        </h2>

                    </div>


                    <button
                        id="apexiqModalClose"
                        class="w-9 h-9 rounded-xl bg-gray-100
                               text-gray-500 hover:bg-gray-200
                               hover:text-gray-900 transition
                               flex items-center justify-center
                               text-lg">

                        ×

                    </button>

                </div>

            </div>


            <div
                class="p-5 sm:p-6 text-sm text-gray-600
                       leading-7 max-h-[60vh] overflow-y-auto">

                ${content}

            </div>


            <div
                class="p-5 sm:p-6 border-t border-gray-100
                       flex justify-end">

                <button
                    id="apexiqModalAction"
                    class="px-5 py-2.5 rounded-xl
                           bg-gray-900 text-white
                           text-sm font-semibold
                           hover:bg-gray-800 transition">

                    ${buttonText}

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    const closeModal = () => {

        const current =
            document.getElementById("apexiqModal");

        if (current) {
            current.remove();
        }

    };


    document
        .getElementById("apexiqModalClose")
        .addEventListener("click", closeModal);


    document
        .getElementById("apexiqModalAction")
        .addEventListener("click", closeModal);


    document
        .getElementById("apexiqModalOverlay")
        .addEventListener("click", closeModal);


    document.addEventListener(
        "keydown",
        function modalEscapeHandler(event) {

            if (event.key === "Escape") {

                closeModal();

                document.removeEventListener(
                    "keydown",
                    modalEscapeHandler
                );

            }

        }
    );

}


/* =========================================================
   RENDER INSIGHTS
========================================================= */

function renderInsights() {

    const container =
        document.getElementById("insightGrid");


    const insights =
        generateInsights();


    container.innerHTML =
        insights.map((insight, index) => {

            let borderClass =
                "border-gray-200";

            let iconBackground =
                "bg-gray-100";


            if (insight.type === "warning") {

                borderClass =
                    "border-yellow-200";

                iconBackground =
                    "bg-yellow-50";

            }


            if (insight.type === "danger") {

                borderClass =
                    "border-red-200";

                iconBackground =
                    "bg-red-50";

            }


            if (insight.type === "positive") {

                borderClass =
                    "border-green-200";

                iconBackground =
                    "bg-green-50";

            }


            if (insight.type === "slow") {

                borderClass =
                    "border-orange-200";

                iconBackground =
                    "bg-orange-50";

            }


            return `

                <div
                    class="card insight-card ${borderClass} p-5 fade-in"
                    style="animation-delay:${index * 80}ms">

                    <div class="flex items-start justify-between gap-4">

                        <div
                            class="w-11 h-11 rounded-xl ${iconBackground}
                                   flex items-center justify-center text-lg">

                            ${insight.icon}

                        </div>


                        <button
                            class="insight-view-button text-xs font-semibold
                                   text-gray-400 hover:text-gray-700"
                            data-insight-index="${index}">

                            View →

                        </button>

                    </div>


                    <h3 class="font-bold text-base mt-5">
                        ${insight.title}
                    </h3>


                    <p class="text-sm text-gray-500 leading-6 mt-2">
                        ${insight.description}
                    </p>

                </div>

            `;

        }).join("");


    /* =====================================================
       VIEW BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".insight-view-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            this.dataset.insightIndex
                        );


                    const insight =
                        insights[index];


                    if (!insight) {
                        return;
                    }


                    const metrics =
                        calculateBusinessMetrics();


                    const detailContent = `

                        <p>
                            ${insight.description}
                        </p>


                        <div
                            class="mt-5 grid grid-cols-2 gap-3">

                            <div
                                class="bg-gray-50 rounded-xl p-4">

                                <p
                                    class="text-xs text-gray-400">
                                    Revenue
                                </p>

                                <p
                                    class="font-bold text-gray-900 mt-1">
                                    ${naira(metrics.revenue)}
                                </p>

                            </div>


                            <div
                                class="bg-gray-50 rounded-xl p-4">

                                <p
                                    class="text-xs text-gray-400">
                                    Gross Profit
                                </p>

                                <p
                                    class="font-bold text-gray-900 mt-1">
                                    ${naira(metrics.grossProfit)}
                                </p>

                            </div>


                            <div
                                class="bg-gray-50 rounded-xl p-4">

                                <p
                                    class="text-xs text-gray-400">
                                    Gross Margin
                                </p>

                                <p
                                    class="font-bold text-gray-900 mt-1">
                                    ${percentage(metrics.grossMargin)}
                                </p>

                            </div>


                            <div
                                class="bg-gray-50 rounded-xl p-4">

                                <p
                                    class="text-xs text-gray-400">
                                    Stock Value
                                </p>

                                <p
                                    class="font-bold text-gray-900 mt-1">
                                    ${naira(metrics.stockValue)}
                                </p>

                            </div>

                        </div>


                        <div
                            class="mt-5 p-4 rounded-xl
                                   bg-gray-50 border border-gray-100">

                            <p
                                class="text-xs font-bold uppercase
                                       tracking-wide text-gray-400 mb-2">

                                ApexIQ interpretation

                            </p>

                            <p class="text-sm text-gray-600 leading-6">

                                This insight is generated from the
                                current business sample data and is
                                intended to support a purchasing,
                                inventory or profitability decision.

                            </p>

                        </div>

                    `;


                    createApexModal(
                        insight.title,
                        detailContent
                    );

                }
            );

        });

}


/* =========================================================
   RENDER RECOMMENDATIONS
========================================================= */

function renderRecommendations() {

    const container =
        document.getElementById("recommendations");


    const recommendations =
        generateRecommendations();


    container.innerHTML =
        recommendations.map((item, index) => {

            const priorityClass =
                item.priority === "HIGH"
                    ? "text-red-600 bg-red-50"
                    : "text-yellow-700 bg-yellow-50";


            return `

                <div
                    class="p-5 sm:p-6 flex flex-col sm:flex-row
                           sm:items-center gap-4 hover:bg-gray-50
                           transition">

                    <div
                        class="w-11 h-11 shrink-0 rounded-xl bg-gray-100
                               flex items-center justify-center font-bold">

                        ${item.icon}

                    </div>


                    <div class="flex-1">

                        <div
                            class="flex flex-wrap items-center gap-2">

                            <h3 class="font-bold">
                                ${item.title}
                            </h3>


                            <span
                                class="text-[10px] font-bold px-2 py-1
                                       rounded-md ${priorityClass}">

                                ${item.priority}

                            </span>

                        </div>


                        <p class="text-sm text-gray-500 mt-1">
                            ${item.description}
                        </p>

                    </div>


                    <button
                        class="recommendation-review-button
                               px-4 py-2.5 rounded-xl border
                               border-gray-200 text-sm font-semibold
                               hover:bg-white whitespace-nowrap"
                        data-recommendation-index="${index}">

                        Review

                    </button>

                </div>

            `;

        }).join("");


    /* =====================================================
       REVIEW BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".recommendation-review-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            this.dataset.recommendationIndex
                        );


                    const item =
                        recommendations[index];


                    if (!item) {
                        return;
                    }


                    const metrics =
                        calculateBusinessMetrics();


                    const restockProducts =
                        products
                            .map(product => ({

                                product,

                                metrics:
                                    getProductMetrics(product)

                            }))
                            .filter(item =>
                                item.metrics.daysOfStock <= 7
                            )
                            .sort(
                                (a, b) =>
                                    a.metrics.daysOfStock -
                                    b.metrics.daysOfStock
                            );


                    const slowProducts =
                        products
                            .map(product => ({

                                product,

                                metrics:
                                    getProductMetrics(product)

                            }))
                            .filter(item =>
                                item.metrics.daysOfStock > 90
                            )
                            .sort(
                                (a, b) =>
                                    b.metrics.inventoryValue -
                                    a.metrics.inventoryValue
                            );


                    const content = `

                        <div
                            class="p-4 rounded-xl bg-gray-50
                                   border border-gray-100">

                            <p
                                class="text-xs font-bold uppercase
                                       tracking-wide text-gray-400">

                                Recommended action

                            </p>

                            <p
                                class="font-semibold text-gray-900 mt-2">

                                ${item.title}

                            </p>

                            <p class="text-sm text-gray-600 mt-2">
                                ${item.description}
                            </p>

                        </div>


                        <div class="mt-5">

                            <p
                                class="text-xs font-bold uppercase
                                       tracking-wide text-gray-400 mb-3">

                                Current business context

                            </p>


                            <div
                                class="grid grid-cols-2 gap-3">

                                <div
                                    class="bg-gray-50 rounded-xl p-4">

                                    <p
                                        class="text-xs text-gray-400">
                                        Gross Profit
                                    </p>

                                    <p
                                        class="font-bold mt-1">
                                        ${naira(metrics.grossProfit)}
                                    </p>

                                </div>


                                <div
                                    class="bg-gray-50 rounded-xl p-4">

                                    <p
                                        class="text-xs text-gray-400">
                                        Stock Value
                                    </p>

                                    <p
                                        class="font-bold mt-1">
                                        ${naira(metrics.stockValue)}
                                    </p>

                                </div>

                            </div>

                        </div>


                        ${
                            restockProducts.length > 0
                            ? `

                                <div class="mt-5">

                                    <p
                                        class="text-xs font-bold
                                               uppercase tracking-wide
                                               text-gray-400 mb-3">

                                        Immediate stock review

                                    </p>


                                    <div class="space-y-2">

                                        ${
                                            restockProducts
                                                .slice(0, 3)
                                                .map(item => `

                                                    <div
                                                        class="flex items-center
                                                               justify-between
                                                               gap-3 p-3 rounded-xl
                                                               bg-red-50">

                                                        <span
                                                            class="font-semibold
                                                                   text-sm">

                                                            ${item.product.name}

                                                        </span>


                                                        <span
                                                            class="text-xs
                                                                   font-bold
                                                                   text-red-600">

                                                            ${Math.max(
                                                                1,
                                                                Math.round(
                                                                    item.metrics.daysOfStock
                                                                )
                                                            )} days

                                                        </span>

                                                    </div>

                                                `)
                                                .join("")

                                        }

                                    </div>

                                </div>

                            `
                            : ""
                        }


                        ${
                            slowProducts.length > 0
                            ? `

                                <div class="mt-5">

                                    <p
                                        class="text-xs font-bold
                                               uppercase tracking-wide
                                               text-gray-400 mb-3">

                                        Inventory requiring review

                                    </p>


                                    <div class="space-y-2">

                                        ${
                                            slowProducts
                                                .slice(0, 3)
                                                .map(item => `

                                                    <div
                                                        class="flex items-center
                                                               justify-between
                                                               gap-3 p-3 rounded-xl
                                                               bg-yellow-50">

                                                        <span
                                                            class="font-semibold
                                                                   text-sm">

                                                            ${item.product.name}

                                                        </span>


                                                        <span
                                                            class="text-xs
                                                                   font-bold
                                                                   text-yellow-700">

                                                            ${Math.round(
                                                                item.metrics.daysOfStock
                                                            )} days

                                                        </span>

                                                    </div>

                                                `)
                                                .join("")

                                        }

                                    </div>

                                </div>

                            `
                            : ""
                        }


                        <div
                            class="mt-5 p-4 rounded-xl
                                   border border-gray-100">

                            <p
                                class="text-xs font-bold uppercase
                                       tracking-wide text-gray-400">

                                Next step

                            </p>

                            <p
                                class="text-sm text-gray-600
                                       leading-6 mt-2">

                                Review the underlying products,
                                supplier prices and available cash
                                before making the final business decision.

                            </p>

                        </div>

                    `;


                    createApexModal(
                        item.title,
                        content,
                        "Close Review"
                    );

                }
            );

        });

}


/* =========================================================
   RENDER PRODUCT TABLE
========================================================= */

function renderProducts() {

    const table =
        document.getElementById("productTable");


    if (!table) {
        return;
    }


    table.innerHTML =
        products.map(product => {

            const metrics =
                getProductMetrics(product);


            let status =
                "Healthy";

            let statusClass =
                "text-green-700 bg-green-50";


            if (metrics.daysOfStock <= 7) {

                status =
                    "Restock";

                statusClass =
                    "text-red-700 bg-red-50";

            }

            else if (metrics.daysOfStock > 90) {

                status =
                    "Slow";

                statusClass =
                    "text-yellow-700 bg-yellow-50";

            }


            return `

                <tr class="hover:bg-gray-50">

                    <td class="px-5 py-4">

                        <div>

                            <p class="font-semibold whitespace-nowrap">
                                ${product.name}
                            </p>

                            <p class="text-xs text-gray-400 mt-0.5">
                                ${product.category}
                            </p>

                        </div>

                    </td>


                    <td class="px-5 py-4 font-medium">
                        ${product.currentStock}
                    </td>


                    <td class="px-5 py-4">
                        ${product.unitsSold}
                    </td>


                    <td class="px-5 py-4 font-medium">
                        ${percentage(metrics.margin)}
                    </td>


                    <td class="px-5 py-4">

                        ${
                            metrics.daysOfStock === Infinity
                                ? "—"
                                : Math.round(metrics.daysOfStock) + " days"
                        }

                    </td>


                    <td class="px-5 py-4">

                        <span
                            class="text-xs font-bold px-2.5 py-1.5
                                   rounded-lg ${statusClass}">

                            ${status}

                        </span>

                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================================
   RENDER SUPPLIERS
========================================================= */

function renderSuppliers() {

    const container =
        document.getElementById("supplierGrid");


    if (!container) {
        return;
    }


    container.innerHTML =
        suppliers.map(supplier => {

            const hasPriceHistory =
                Number.isFinite(supplier.oldPrice);

            const change =
                hasPriceHistory
                    ? supplier.currentPrice - supplier.oldPrice
                    : 0;


            const percentageChange =
                hasPriceHistory && supplier.oldPrice > 0
                    ? (change / supplier.oldPrice) * 100
                    : 0;


            const increased =
                hasPriceHistory && change > 0;


            return `

                <div class="card p-5">

                    <div
                        class="flex items-start justify-between gap-3">

                        <div>

                            <p class="font-bold">
                                ${supplier.name}
                            </p>

                            <p class="text-xs text-gray-500 mt-1">
                                ${supplier.product}
                            </p>

                        </div>


                        <span
                            class="text-xs font-bold px-2 py-1 rounded-lg
                                ${
                                    !hasPriceHistory
                                        ? "bg-gray-100 text-gray-600"
                                        : increased
                                            ? "bg-red-50 text-red-600"
                                            : "bg-green-50 text-green-700"
                                }">

                            ${
                                !hasPriceHistory
                                    ? "New"
                                    : increased
                                        ? "↑"
                                        : "↓"
                            }

                            ${
                                hasPriceHistory
                                    ? `${Math.abs(percentageChange).toFixed(1)}%`
                                    : ""
                            }

                        </span>

                    </div>


                    <div
                        class="grid grid-cols-2 gap-3 mt-5">

                        <div
                            class="bg-gray-50 rounded-xl p-3">

                            <p class="text-xs text-gray-400">
                                Previous
                            </p>

                            <p class="font-bold mt-1">
                                ${
                                    hasPriceHistory
                                        ? naira(supplier.oldPrice)
                                        : "Not recorded"
                                }
                            </p>

                        </div>


                        <div
                            class="bg-gray-50 rounded-xl p-3">

                            <p class="text-xs text-gray-400">
                                Current
                            </p>

                            <p class="font-bold mt-1">
                                ${naira(supplier.currentPrice)}
                            </p>

                        </div>

                    </div>


                    <p class="text-xs text-gray-500 mt-4">

                        ${
                            !hasPriceHistory
                                ? "Current purchase price recorded; no historical comparison yet."
                                : increased
                                    ? `Cost increased by ${naira(change)} per unit.`
                                    : `Cost decreased by ${naira(Math.abs(change))} per unit.`
                        }

                    </p>

                </div>

            `;

        }).join("");

}


/* =========================================================
   PERFORMANCE CHART
========================================================= */

function createChart() {

    const canvas =
        document.getElementById("performanceChart");


    if (!canvas) {
        return;
    }


    if (typeof Chart === "undefined") {

        console.error(
            "Chart.js failed to load."
        );

        return;

    }


    const ctx =
        canvas.getContext("2d");


    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets: [

                {
                    label: "Sales",

                    data: [
                        185000,
                        220000,
                        195000,
                        260000,
                        235000,
                        310000,
                        285000
                    ],

                    borderWidth: 3,

                    tension: 0.35,

                    pointRadius: 3
                },


                {
                    label: "Gross Profit",

                    data: [
                        43000,
                        52000,
                        45000,
                        61000,
                        54000,
                        72000,
                        65000
                    ],

                    borderWidth: 3,

                    tension: 0.35,

                    pointRadius: 3
                }

            ]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,


            interaction: {
                intersect: false,
                mode: "index"
            },


            plugins: {

                legend: {
                    position: "bottom",

                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }

            },


            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        callback: function(value) {

                            if (value >= 1000000) {

                                return "₦" +
                                    (value / 1000000).toFixed(1) +
                                    "m";

                            }


                            if (value >= 1000) {

                                return "₦" +
                                    (value / 1000).toFixed(0) +
                                    "k";

                            }


                            return "₦" + value;

                        }

                    },


                    grid: {
                        color: "#f1f5f9"
                    }

                },


                x: {

                    grid: {
                        display: false
                    }

                }

            }

        }

    });

}


/* =========================================================
   ASK YOUR BUSINESS
========================================================= */

function setQuestion(question) {

    const input =
        document.getElementById("businessQuestion");


    if (!input) {
        return;
    }


    input.value =
        question;


    input.focus();

}


/* =========================================================
   ASK YOUR BUSINESS — INTENT HELPERS
========================================================= */

function containsAny(text, words) {

    return words.some(word =>
        text.includes(word)
    );

}


/* =========================================================
   ASK YOUR BUSINESS
========================================================= */

function askBusiness() {

    const questionInput =
        document.getElementById("businessQuestion");


    const answerBox =
        document.getElementById("answerBox");


    const answer =
        document.getElementById("businessAnswer");


    if (!questionInput || !answerBox || !answer) {
        return;
    }


    const input =
        questionInput
            .value
            .trim()
            .toLowerCase();


    if (!input) {

        answerBox.classList.remove("hidden");

        answer.textContent =
            "Ask a question about your sales, products, inventory or suppliers.";

        return;

    }


    let response = "";


    /* =====================================================
       REORDER / RESTOCK
    ===================================================== */

    const reorderIntent =
        containsAny(input, [
            "reorder",
            "restock",
            "re-stock",
            "buy now",
            "buy next",
            "what should i buy",
            "what should we buy",
            "what do i need to buy",
            "what do we need to buy",
            "what stock should i buy",
            "what stock should we buy",
            "which stock should i buy",
            "which products should i buy",
            "what should i purchase",
            "what do i purchase",
            "purchase next"
        ]);


    if (reorderIntent) {

        const productsToRestock =
            products
                .map(product => ({

                    product,

                    metrics:
                        getProductMetrics(product)

                }))
                .filter(item =>
                    item.metrics.daysOfStock <= 7
                )
                .sort(
                    (a, b) =>
                        a.metrics.daysOfStock -
                        b.metrics.daysOfStock
                );


        if (productsToRestock.length > 0) {

            const names =
                productsToRestock
                    .slice(0, 3)
                    .map(item =>
                        `${item.product.name} (${Math.max(
                            1,
                            Math.round(
                                item.metrics.daysOfStock
                            )
                        )} days left)`
                    )
                    .join(", ");


            response =
                `The immediate restocking priorities are ${names}. These products have the shortest estimated stock coverage based on recent sales velocity. Before purchasing, the next version should also consider supplier lead time, available cash and historical demand.`;

        }

        else {

            response =
                "No immediate stockout risks were detected from the current sample data.";

        }

    }


    /* =====================================================
       SLOW PRODUCTS
    ===================================================== */

    else if (
        containsAny(input, [
            "slow",
            "slow moving",
            "slow-moving",
            "dead stock",
            "stuck stock",
            "stuck products",
            "not moving",
            "barely selling"
        ])
    ) {

        const slowProducts =
            products
                .map(product => ({

                    product,

                    metrics:
                        getProductMetrics(product)

                }))
                .filter(item =>
                    item.metrics.daysOfStock > 90
                )
                .sort(
                    (a, b) =>
                        b.metrics.inventoryValue -
                        a.metrics.inventoryValue
                );


        if (slowProducts.length > 0) {

            response =
                slowProducts
                    .slice(0, 3)
                    .map(item =>
                        `${item.product.name}: approximately ${Math.round(
                            item.metrics.daysOfStock
                        )} days of stock and ${naira(
                            item.metrics.inventoryValue
                        )} tied in inventory.`
                    )
                    .join(" ");

        }

        else {

            response =
                "The current data does not show significant slow-moving inventory.";

        }

    }


    /* =====================================================
       MOST PROFITABLE PRODUCTS
    ===================================================== */

    else if (

        containsAny(input, [
            "most profitable",
            "most profit",
            "highest profit",
            "highest gross profit",
            "best profit",
            "best profits",
            "make the most profit",
            "makes the most profit",
            "make most profit",
            "makes most profit",
            "make the most money",
            "makes the most money",
            "making the most money",
            "earn the most",
            "earns the most",
            "earning the most",
            "generate the most profit",
            "generates the most profit",
            "which products earn",
            "what products earn",
            "which product earns",
            "what product earns",
            "which products are most profitable",
            "what products are most profitable"
        ])

        ||

        (
            containsAny(input, [
                "profit",
                "profitable",
                "money",
                "earn",
                "earning",
                "revenue"
            ])

            &&

            containsAny(input, [
                "product",
                "products",
                "item",
                "items",
                "make",
                "makes",
                "earn",
                "earns",
                "generate",
                "generates",
                "highest",
                "best",
                "most"
            ])
        )

    ) {

        const profitable =
            products
                .map(product => ({

                    product,

                    metrics:
                        getProductMetrics(product)

                }))
                .sort(
                    (a, b) =>
                        (
                            b.metrics.unitProfit *
                            b.product.unitsSold
                        )
                        -
                        (
                            a.metrics.unitProfit *
                            a.product.unitsSold
                        )
                );


        response =
            profitable
                .slice(0, 3)
                .map(item =>
                    `${item.product.name} generates approximately ${naira(
                        item.metrics.unitProfit *
                        item.product.unitsSold
                    )} in gross profit from recorded units sold, with ${percentage(
                        item.metrics.margin
                    )} margin per unit.`
                )
                .join(" ");

    }


    /* =====================================================
       WHY PROFIT FELL
    ===================================================== */

    else if (

        containsAny(input, [
            "why did my profit fall",
            "why did profit fall",
            "why is my profit down",
            "why is profit down",
            "why did profit drop",
            "why has profit fallen",
            "why has my profit fallen",
            "why profit fell"
        ])

    ) {

        response =
            "The current sample indicates pressure from procurement costs and product-level margin differences. Several supplier prices have increased, while some inventory is moving slowly. The next version should compare this period against the previous period automatically to identify exactly which products and costs caused the change.";

    }


    /* =====================================================
       PROFIT / MARGIN
    ===================================================== */

    else if (

        containsAny(input, [
            "profit",
            "margin",
            "gross profit",
            "gross margin",
            "profit margin"
        ])

    ) {

        const metrics =
            calculateBusinessMetrics();


        response =
            `Current estimated gross profit is ${naira(
                metrics.grossProfit
            )}, with an overall gross margin of ${percentage(
                metrics.grossMargin
            )}. This is before operating expenses.`;

    }


    /* =====================================================
       SUPPLIER
    ===================================================== */

    else if (

        containsAny(input, [
            "supplier",
            "suppliers",
            "supplier price",
            "supplier prices",
            "vendor",
            "vendors",
            "purchase price",
            "cost price"
        ])

    ) {

        const increased =
            suppliers
                .filter(
                    supplier =>
                        Number.isFinite(supplier.oldPrice) &&
                        supplier.currentPrice >
                        supplier.oldPrice
                )
                .sort(
                    (a, b) =>
                        (
                            b.currentPrice -
                            b.oldPrice
                        )
                        -
                        (
                            a.currentPrice -
                            a.oldPrice
                        )
                );


        if (increased.length > 0) {

            const supplier =
                increased[0];


            const change =
                supplier.currentPrice -
                supplier.oldPrice;


            response =
                `${supplier.name} has the largest detected increase in the sample: ${supplier.product} moved from ${naira(
                    supplier.oldPrice
                )} to ${naira(
                    supplier.currentPrice
                )}, an increase of ${naira(
                    change
                )} per unit.`;

        }

        else {

            response =
                "No supplier price increases were detected in the current sample.";

        }

    }


    /* =====================================================
       SALES
    ===================================================== */

    else if (

        containsAny(input, [
            "sales",
            "revenue",
            "turnover",
            "how much did i sell",
            "how much did we sell"
        ])

    ) {

        const metrics =
            calculateBusinessMetrics();


        response =
            `Current recorded revenue is ${naira(
                metrics.revenue
            )}. The dashboard is using the current sample transaction data.`;

    }


    /* =====================================================
       STOCK VALUE
    ===================================================== */

    else if (

        containsAny(input, [
            "stock value",
            "inventory value",
            "how much stock",
            "how much inventory",
            "money tied",
            "cash tied"
        ])

    ) {

        const metrics =
            calculateBusinessMetrics();


        response =
            `Current estimated stock value is ${naira(
                metrics.stockValue
            )}. This represents the value currently tied up in inventory based on the sample data.`;

    }


    /* =====================================================
       FALLBACK
    ===================================================== */

    else {

        response =
            "I can currently answer questions about what to reorder, slow-moving products, product profitability, supplier prices, sales, inventory value and profit/margin. Try rephrasing your question or use one of the suggested questions.";

    }


    answerBox.classList.remove("hidden");


    answer.textContent =
        response;

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    const menu =
        document.getElementById("mobileMenu");


    if (!menu) {
        return;
    }


    menu.classList.toggle("hidden");

}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

function initializeApexIQ() {

    renderKPIs();

    renderInsights();

    renderRecommendations();

    renderProducts();

    renderSuppliers();

    createChart();


    const questionInput =
        document.getElementById("businessQuestion");


    if (questionInput) {

        questionInput.addEventListener(
            "keydown",
            function(event) {

                if (event.key === "Enter") {

                    askBusiness();

                }

            }
        );

    }

}


/* =========================================================
   START APPLICATION
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApexIQ
    );

}

else {

    initializeApexIQ();

}

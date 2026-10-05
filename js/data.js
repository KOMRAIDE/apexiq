/* =========================================================
   APEXIQ V0.1
   DEMO DATA — FROZEN BASELINE
========================================================= */

const products = [
    {id:"P001",name:"Classic Polo Shirt",category:"Shirts",sellingPrice:18500,currentStock:8,minimumStock:10,purchaseCost:10500,unitsSold:52},
    {id:"P002",name:"Premium T-Shirt",category:"Shirts",sellingPrice:12000,currentStock:42,minimumStock:12,purchaseCost:6500,unitsSold:34},
    {id:"P003",name:"Slim Fit Jeans",category:"Trousers",sellingPrice:28000,currentStock:7,minimumStock:8,purchaseCost:17000,unitsSold:38},
    {id:"P004",name:"Straight Leg Jeans",category:"Trousers",sellingPrice:26000,currentStock:31,minimumStock:8,purchaseCost:16800,unitsSold:9},
    {id:"P005",name:"Linen Shirt",category:"Shirts",sellingPrice:22000,currentStock:6,minimumStock:8,purchaseCost:13500,unitsSold:29},
    {id:"P006",name:"Casual Sneakers",category:"Shoes",sellingPrice:42000,currentStock:5,minimumStock:6,purchaseCost:26500,unitsSold:27},
    {id:"P007",name:"Leather Sandals",category:"Shoes",sellingPrice:24000,currentStock:38,minimumStock:10,purchaseCost:15000,unitsSold:8},
    {id:"P008",name:"Classic Backpack",category:"Bags",sellingPrice:30000,currentStock:24,minimumStock:8,purchaseCost:19000,unitsSold:7},
    {id:"P009",name:"Leather Belt",category:"Accessories",sellingPrice:10000,currentStock:61,minimumStock:15,purchaseCost:5200,unitsSold:17},
    {id:"P010",name:"Premium Cap",category:"Accessories",sellingPrice:8500,currentStock:73,minimumStock:15,purchaseCost:4200,unitsSold:6},
    {id:"P011",name:"Summer Dress",category:"Dresses",sellingPrice:35000,currentStock:4,minimumStock:5,purchaseCost:21000,unitsSold:23},
    {id:"P012",name:"Office Dress",category:"Dresses",sellingPrice:40000,currentStock:17,minimumStock:5,purchaseCost:25000,unitsSold:14},
    {id:"P013",name:"Crossbody Bag",category:"Bags",sellingPrice:27000,currentStock:19,minimumStock:6,purchaseCost:16000,unitsSold:11},
    {id:"P014",name:"Running Sneakers",category:"Shoes",sellingPrice:48000,currentStock:3,minimumStock:5,purchaseCost:30000,unitsSold:21},
    {id:"P015",name:"Cargo Trousers",category:"Trousers",sellingPrice:25000,currentStock:28,minimumStock:7,purchaseCost:16000,unitsSold:5},
    {id:"P016",name:"Graphic Tee",category:"Shirts",sellingPrice:14000,currentStock:47,minimumStock:12,purchaseCost:7500,unitsSold:31},
    {id:"P017",name:"Mini Handbag",category:"Bags",sellingPrice:18000,currentStock:44,minimumStock:10,purchaseCost:11000,unitsSold:4},
    {id:"P018",name:"Formal Belt",category:"Accessories",sellingPrice:12000,currentStock:36,minimumStock:10,purchaseCost:6200,unitsSold:7},
    {id:"P019",name:"Chino Trousers",category:"Trousers",sellingPrice:27000,currentStock:10,minimumStock:7,purchaseCost:17500,unitsSold:25},
    {id:"P020",name:"Premium Hoodie",category:"Shirts",sellingPrice:30000,currentStock:12,minimumStock:5,purchaseCost:18000,unitsSold:19}
];

const sales = [];
const purchases = [];

const suppliers = [
    {id:"S001",name:"Lagos Fashion Hub",product:"Classic Polo Shirt",oldPrice:9800,currentPrice:10500},
    {id:"S002",name:"Abuja Wholesale Market",product:"Slim Fit Jeans",oldPrice:15800,currentPrice:17000},
    {id:"S003",name:"StyleSource Nigeria",product:"Casual Sneakers",oldPrice:27000,currentPrice:26500},
    {id:"S004",name:"Trendline Distributors",product:"Summer Dress",oldPrice:19500,currentPrice:21000},
    {id:"S005",name:"Urban Supply Co.",product:"Premium T-Shirt",oldPrice:6700,currentPrice:6500}
];

const expenses = [];

window.products = products;
window.sales = sales;
window.purchases = purchases;
window.suppliers = suppliers;
window.expenses = expenses;

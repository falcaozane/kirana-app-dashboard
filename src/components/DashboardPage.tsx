'use client'
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { collection, getDocs, query } from 'firebase/firestore';
import { useFirebase } from '@/context/FirebaseContext';
import DashboardFilters from '@/components/DashboardFilters';

const COLORS = ['#06b6d4', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'];
const BAR_COLORS = {
  products: '#06b6d4',
  stock: '#22c55e'
};

const DashboardPage = () => {
  const { db } = useFirebase();
  const [storesData, setStoresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    store: 'all',
    category: 'all',
    stockLevel: 'all',
    priceRange: 'all',
  });
  const [filteredData, setFilteredData] = useState({
    stores: [],
    products: [],
    topProducts: [],
    lowStockProducts: [],
    totalMetrics: {
      totalStores: 0,
      totalProducts: 0,
      totalStock: 0,
      totalValue: 0
    }
  });

  // Function to apply filters
  const applyFilters = (data) => {
    let filteredProducts = [...data];

    if (filters.store && filters.store !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.storeId === filters.store
      );
    }

    if (filters.category && filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.categoryId === filters.category
      );
    }

    if (filters.stockLevel && filters.stockLevel !== 'all') {
      switch (filters.stockLevel) {
        case 'low':
          filteredProducts = filteredProducts.filter(
            product => product.stock <= 10
          );
          break;
        case 'medium':
          filteredProducts = filteredProducts.filter(
            product => product.stock > 10 && product.stock <= 50
          );
          break;
        case 'high':
          filteredProducts = filteredProducts.filter(
            product => product.stock > 50
          );
          break;
      }
    }

    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filteredProducts = filteredProducts.filter(
          product => product.productPrice >= min && product.productPrice <= max
        );
      } else {
        filteredProducts = filteredProducts.filter(
          product => product.productPrice >= min
        );
      }
    }

    return filteredProducts;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesQuery = query(collection(db, 'stores'));
        const storesSnapshot = await getDocs(storesQuery);
        const stores = [];
        let allProducts = [];
        
        for (const storeDoc of storesSnapshot.docs) {
          const storeData = storeDoc.data();
          const productsQuery = query(collection(db, `stores/${storeDoc.id}/stockproducts`));
          const productsSnapshot = await getDocs(productsQuery);
          const products = productsSnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            storeId: storeDoc.id,
            storeName: storeData.storeName
          }));
          
          allProducts = [...allProducts, ...products];
          
          stores.push({
            id: storeDoc.id,
            ...storeData,
            productCount: products.length,
            totalStock: products.reduce((sum, product) => sum + (product.stock || 0), 0),
            totalValue: products.reduce((sum, product) => sum + (product.productPrice * product.stock), 0),
            products
          });
        }
        
        setStoresData(stores);
        
        // Apply filters to the data
        const filtered = applyFilters(allProducts);

        // Update filtered store statistics
        const filteredStoreData = stores.map(store => {
          const storeProducts = filtered.filter(
            product => product.storeId === store.id
          );
          return {
            ...store,
            productCount: storeProducts.length,
            totalStock: storeProducts.reduce((sum, p) => sum + (p.stock || 0), 0),
            totalValue: storeProducts.reduce((sum, p) => sum + (p.productPrice * p.stock), 0),
          };
        });

        // Update filtered categories
        const filteredCategories = {};
        filtered.forEach(product => {
          const category = product.categoryId || 'uncategorized';
          if (!filteredCategories[category]) {
            filteredCategories[category] = [];
          }
          filteredCategories[category].push(product);
        });

        setFilteredData({
          stores: filteredStoreData,
          products: Object.entries(filteredCategories).map(([category, products]) => ({
            category,
            count: products.length,
            totalValue: products.reduce((sum, p) => sum + (p.productPrice * p.stock), 0),
            averagePrice: products.reduce((sum, p) => sum + p.productPrice, 0) / products.length
          })),
          topProducts: [...filtered]
            .sort((a, b) => (b.productPrice * b.stock) - (a.productPrice * a.stock))
            .slice(0, 5),
          lowStockProducts: filtered
            .filter(p => p.stock < 10)
            .sort((a, b) => a.stock - b.stock)
            .slice(0, 5),
          totalMetrics: {
            totalStores: stores.length,
            totalProducts: filtered.length,
            totalStock: filtered.reduce((sum, p) => sum + (p.stock || 0), 0),
            totalValue: filtered.reduce((sum, p) => sum + (p.productPrice * p.stock), 0)
          }
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [db, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      store: 'all',
      category: 'all',
      stockLevel: 'all',
      priceRange: 'all',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  const categories = [...new Set(
    storesData.flatMap(store => 
      store.products.map(product => product.categoryId)
    )
  )].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
          Analytics Dashboard
        </h1>

        <DashboardFilters
          stores={storesData}
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          {[
            { title: 'Total Stores', value: filteredData.totalMetrics.totalStores },
            { title: 'Total Products', value: filteredData.totalMetrics.totalProducts },
            { title: 'Total Stock', value: filteredData.totalMetrics.totalStock.toLocaleString() },
            { title: 'Total Inventory Value', value: `₹${filteredData.totalMetrics.totalValue.toLocaleString()}` }
          ].map((metric, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {metric.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Store Overview */}
          <Card className="lg:col-span-8 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Store Overview</CardTitle>
              <CardDescription className="text-sm">Product count and total stock by store</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[300px] sm:h-[350px] lg:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData.stores} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="storeName" 
                      tick={{ fill: '#4B5563', fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fill: '#4B5563', fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="productCount" name="Products" fill={BAR_COLORS.products} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="totalStock" name="Total Stock" fill={BAR_COLORS.stock} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
            <Card className="lg:col-span-4 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Top Products by Value</CardTitle>
                <CardDescription className="text-sm">Highest value inventory items</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="space-y-3 sm:space-y-4">
                {filteredData.topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                    <div className="flex-1 min-w-0 mr-2">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {product.productName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {product.storeName}
                        </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                        ₹{(product.productPrice * product.stock).toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                        {product.stock} units
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="lg:col-span-4 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Category Distribution</CardTitle>
                <CardDescription className="text-sm">Products by category</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="h-[250px] sm:h-[300px] lg:h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={filteredData.products}
                        dataKey="count"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius="60%"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                            <text
                            x={x}
                            y={y}
                            className="text-xs"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            >
                            {`Category ${filteredData.products[index].category}`}
                            </text>
                        );
                        }}
                    >
                        {filteredData.products.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="lg:col-span-4 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Low Stock Alert</CardTitle>
                <CardDescription className="text-sm">Products with low inventory</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="space-y-3 sm:space-y-4">
                {filteredData.lowStockProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                    <div className="flex-1 min-w-0 mr-2">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {product.productName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {product.storeName}
                        </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="font-medium text-red-600 text-sm sm:text-base">
                        {product.stock} units
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                        ₹{product.productPrice}/unit
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>

            {/* Category Value Analysis */}
            <Card className="lg:col-span-4 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Category Value Analysis</CardTitle>
                <CardDescription className="text-sm">Average price by category</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="h-[250px] sm:h-[300px] lg:h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredData.products} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                        dataKey="category" 
                        tick={{ fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area 
                        type="monotone" 
                        dataKey="averagePrice" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6" 
                        fillOpacity={0.2}
                    />
                    </AreaChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
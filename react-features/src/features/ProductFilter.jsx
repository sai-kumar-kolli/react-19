import React, { useState } from 'react';

function ProductFilter({ products }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || product.category === category;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesSearch && matchesCategory && matchesPrice;
        });

    const sortedProducts = filteredProducts
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });

    const productStats = {
        total: sortedProducts.length,
        avgPrice: sortedProducts.reduce((sum, p) => sum + p.price, 0) / sortedProducts.length || 0,
        categories: [...new Set(sortedProducts.map(p => p.category))].length
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Product Search & Filter</h2>

            {/* Search and filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                </select>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Price: ${priceRange[0]}-${priceRange[1]}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{productStats.total}</div>
                    <div className="text-sm text-gray-600">Products Found</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${productStats.avgPrice.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Avg Price</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{productStats.categories}</div>
                    <div className="text-sm text-gray-600">Categories</div>
                </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.slice(0, 6).map(product => (
                    <div key={product.id} className="border rounded-lg p-3">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-lg font-bold text-green-600">${product.price}</span>
                            <span className="text-sm">{product.rating}</span>
                        </div>
                    </div>
                ))}
            </div>

            {sortedProducts.length > 6 && (
                <p className="text-center mt-4 text-gray-600">
                    ... and {sortedProducts.length - 6} more products
                </p>
            )}
        </div>
    );
}

export default ProductFilter;

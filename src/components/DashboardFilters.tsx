// src/components/DashboardFilters.tsx
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";

// Define interfaces for the props
interface Store {
  id: string;
  storeName: string;
}

interface Filters {
  store: string;
  category: string;
  stockLevel: string;
  priceRange: string;
}

interface DashboardFiltersProps {
  stores: Store[];
  categories: string[];
  filters: Filters;
  onFilterChange: (filterType: string, value: string) => void;
  onReset: () => void;
  dateRange?: Date[];
  onDateChange?: (dates: Date[]) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ 
  stores, 
  categories,
  onFilterChange,
  filters,
  onDateChange,
  dateRange,
  onReset
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
        <Button 
          variant="ghost" 
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700"
        >
          Reset Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Store Filter */}
        <Select
          value={filters.store || "all"}
          onValueChange={(value) => onFilterChange('store', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.storeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={filters.category || "all"}
          onValueChange={(value) => onFilterChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                Category {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Stock Level Filter */}
        <Select
          value={filters.stockLevel || "all"}
          onValueChange={(value) => onFilterChange('stockLevel', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Stock Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="low">Low Stock (≤10)</SelectItem>
            <SelectItem value="medium">Medium Stock (11-50)</SelectItem>
            <SelectItem value="high">High Stock (&gt;50)</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        {/* Stock Level Filter */}
    <Select
    value={filters.stockLevel || "all"}
    onValueChange={(value) => onFilterChange('stockLevel', value)}
    >
    <SelectTrigger>
        <SelectValue placeholder="Stock Level" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="all">All Stock Levels</SelectItem>
        <SelectItem value="low">Low Stock (&le;10)</SelectItem>
        <SelectItem value="medium">Medium Stock (11-50)</SelectItem>
        <SelectItem value="high">High Stock (&gt;50)</SelectItem>
    </SelectContent>
    </Select>
      </div>
    </div>
  );
};

export default DashboardFilters;
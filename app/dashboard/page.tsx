"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts"
import { Smartphone, DollarSign, AlertTriangle, Users, TrendingUp, Package, ShoppingCart } from "lucide-react"
import Layout from "@/components/Layout"

// Mock data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    model: "A3108",
    storage: "256GB",
    color: "Natural Titanium",
    price: 1199,
    stock: 2,
    minStock: 5,
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    model: "A3101",
    storage: "128GB",
    color: "Blue Titanium",
    price: 999,
    stock: 3,
    minStock: 5,
  },
  { id: 3, name: "iPhone 15", model: "A3090", storage: "128GB", color: "Pink", price: 799, stock: 1, minStock: 5 },
  { id: 4, name: "iPhone 14", model: "A2649", storage: "128GB", color: "Midnight", price: 699, stock: 8, minStock: 5 },
]

const recentSales = [
  { id: 1, customer: "John Smith", product: "iPhone 15 Pro Max", amount: 1199, date: "2025-01-09" },
  { id: 2, customer: "Sarah Johnson", product: "iPhone 15", amount: 799, date: "2025-01-09" },
  { id: 3, customer: "Mike Davis", product: "iPhone 14", amount: 699, date: "2025-01-08" },
]

const monthlyData = [
  { month: "Jan", sales: 45000, units: 38 },
  { month: "Feb", sales: 52000, units: 44 },
  { month: "Mar", sales: 48000, units: 41 },
  { month: "Apr", sales: 61000, units: 52 },
  { month: "May", sales: 55000, units: 47 },
  { month: "Jun", sales: 67000, units: 58 },
]

const modelData = [
  { name: "iPhone 15 Pro Max", value: 35, color: "#007AFF" },
  { name: "iPhone 15 Pro", value: 28, color: "#5856D6" },
  { name: "iPhone 15", value: 22, color: "#AF52DE" },
  { name: "iPhone 14", value: 15, color: "#FF2D92" },
]

const chartConfig = {
  sales: { label: "Sales", color: "#007AFF" },
  units: { label: "Units", color: "#5856D6" },
}

export default function Dashboard() {
  const totalProducts = products.length
  const totalSalesToday = recentSales.reduce((sum, sale) => sum + sale.amount, 0)
  const lowStockProducts = products.filter((product) => product.stock <= product.minStock)
  const totalUnits = products.reduce((sum, product) => sum + product.stock, 0)

  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold apple-text-primary">Dashboard</h1>
            <p className="apple-text-secondary text-lg">Welcome back! Here's your store overview.</p>
          </div>
          <div className="text-right">
            <p className="text-sm apple-text-secondary">Last updated</p>
            <p className="font-semibold apple-text-primary">{new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mobile-grid">
          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Total Products</CardTitle>
              <Smartphone className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold apple-text-primary">{totalProducts}</div>
              <p className="text-xs apple-text-secondary flex items-center mt-1">
                <Package className="w-3 h-3 mr-1" />
                {totalUnits} units in stock
              </p>
            </CardContent>
          </Card>

          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Today's Sales</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold apple-text-primary">${totalSalesToday.toLocaleString()}</div>
              <p className="text-xs apple-text-secondary flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {recentSales.length} transactions today
              </p>
            </CardContent>
          </Card>

          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{lowStockProducts.length}</div>
              <p className="text-xs apple-text-secondary">Products need restocking</p>
            </CardContent>
          </Card>

          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Revenue This Month</CardTitle>
              <ShoppingCart className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold apple-text-primary">$67,000</div>
              <p className="text-xs apple-text-secondary flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Low Stock Products */}
          <Card className="apple-card hover-lift">
            <CardHeader>
              <CardTitle className="apple-text-primary flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Low Stock Items
              </CardTitle>
              <CardDescription className="apple-text-secondary">Products requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium apple-text-primary">{product.name}</p>
                        <p className="text-sm apple-text-secondary">
                          {product.storage} • {product.color}
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="bg-red-500 text-white">
                      {product.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales Trend */}
          <Card className="apple-card hover-lift">
            <CardHeader>
              <CardTitle className="apple-text-primary">Sales Trend</CardTitle>
              <CardDescription className="apple-text-secondary">Monthly performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        dataKey="sales"
                        type="monotone"
                        stroke="var(--color-sales)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-sales)", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Top Models */}
          <Card className="apple-card hover-lift">
            <CardHeader>
              <CardTitle className="apple-text-primary">Top Selling Models</CardTitle>
              <CardDescription className="apple-text-secondary">Sales distribution by iPhone model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name.split(" ")[1]} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {modelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sales */}
          <Card className="apple-card hover-lift">
            <CardHeader>
              <CardTitle className="apple-text-primary">Recent Sales</CardTitle>
              <CardDescription className="apple-text-secondary">Latest transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium apple-text-primary">{sale.customer}</p>
                        <p className="text-sm apple-text-secondary">{sale.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold apple-text-primary">${sale.amount}</p>
                      <p className="text-sm apple-text-secondary">{sale.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

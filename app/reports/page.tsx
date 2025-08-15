"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"
import { CalendarDays, TrendingUp, PieChartIcon, DollarSign } from 'lucide-react'
import Layout from '@/components/Layout'

// Mock data
const monthlyData = [
  { month: "Jan", sales: 2400 },
  { month: "Feb", sales: 1398 },
  { month: "Mar", sales: 9800 },
  { month: "Apr", sales: 3908 },
  { month: "May", sales: 4800 },
  { month: "Jun", sales: 3800 },
  { month: "Jul", sales:4300 },
  { month: "Aug", sales: 2400 },
]

const topProducts = [
  { name: "Brazilian Straight", value: 35, color: "#D4AF37" },
  { name: "Peruvian Body Wave", value: 25, color: "#B8941F" },
  { name: "Malaysian Curly", value: 20, color: "#9A7B0A" },
  { name: "Indian Straight", value: 15, color: "#7D6608" },
  { name: "Others", value: 5, color: "#5D4A06" },
]

const profitMargins = [
  { product: "Brazilian Straight 16 inch", cost: 80, price: 120, profit: 40, margin: "33.3%" },
  { product: "Peruvian Body Wave 18 inch", cost: 95, price: 140, profit: 45, margin: "32.1%" },
  { product: "Malaysian Curly 14 inch", cost: 110, price: 160, profit: 50, margin: "31.3%" },
  { product: "Indian Straight 20 inch", cost: 70, price: 100, profit: 30, margin: "30.0%" },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#D4AF37",
  },
}

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState('2025-01-01')
  const [dateTo, setDateTo] = useState('2025-08-31')

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold brown-text">Reports</h1>
          <p className="text-amber-700 text-lg">Analyze your business performance and trends</p>
        </div>

        {/* Date Range Filter */}
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              <CalendarDays className="h-5 w-5 gold-text" />
              Date Range Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="dateFrom" className="brown-text">From</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo" className="brown-text">To</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border-amber-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Monthly Sales Line Chart */}
          <Card className="shadow-lg border-0 hover-lift">
            <CardHeader>
              <CardTitle className="brown-text flex items-center gap-2">
                <TrendingUp className="h-5 w-5 gold-text" />
                Monthly Sales Trend
              </CardTitle>
              <CardDescription>Sales performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={monthlyData}>
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    dataKey="sales"
                    type="monotone"
                    stroke="var(--color-sales)"
                    strokeWidth={3}
                    dot={{
                      fill: "var(--color-sales)",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Selling Products Pie Chart */}
          <Card className="shadow-lg border-0 hover-lift">
            <CardHeader>
              <CardTitle className="brown-text flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 gold-text" />
                Top Selling Products
              </CardTitle>
              <CardDescription>Product performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProducts}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profit Margin Table */}
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              <DollarSign className="h-5 w-5 gold-text" />
              Profit Margin Analysis
            </CardTitle>
            <CardDescription>Cost analysis and profit margins per product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="brown-text">Product</TableHead>
                    <TableHead className="brown-text">Cost</TableHead>
                    <TableHead className="brown-text">Selling Price</TableHead>
                    <TableHead className="brown-text">Profit</TableHead>
                    <TableHead className="brown-text">Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitMargins.map((item, index) => (
                    <TableRow key={index} className="hover:bg-amber-50">
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell className="text-red-600">${item.cost}</TableCell>
                      <TableCell className="font-semibold">${item.price}</TableCell>
                      <TableCell className="text-green-600 font-semibold">${item.profit}</TableCell>
                      <TableCell>
                        <span className="gold-text font-semibold">{item.margin}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">$28,840</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">156</div>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Average Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">$185</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Top Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-orange-900">Brazilian Straight</div>
              <p className="text-xs text-orange-600">35% of total sales</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, AlertTriangle, TrendingUp, Plus, Minus, Search } from "lucide-react"
import Layout from "@/components/Layout"

// Mock inventory data
const initialInventory = [
  {
    id: 1,
    productName: "iPhone 15 Pro Max",
    sku: "IP15PM-256-NT",
    currentStock: 15,
    minStock: 5,
    maxStock: 50,
    reorderPoint: 8,
    lastRestocked: "2025-01-05",
    supplier: "Apple Inc.",
    location: "Warehouse A-1",
    status: "In Stock",
  },
  {
    id: 2,
    productName: "iPhone 15 Pro",
    sku: "IP15P-128-BT",
    currentStock: 3,
    minStock: 5,
    maxStock: 40,
    reorderPoint: 8,
    lastRestocked: "2025-01-03",
    supplier: "Apple Inc.",
    location: "Warehouse A-2",
    status: "Low Stock",
  },
  {
    id: 3,
    productName: "iPhone 15",
    sku: "IP15-128-PK",
    currentStock: 0,
    minStock: 5,
    maxStock: 35,
    reorderPoint: 8,
    lastRestocked: "2024-12-28",
    supplier: "Apple Inc.",
    location: "Warehouse B-1",
    status: "Out of Stock",
  },
  {
    id: 4,
    productName: "iPhone 14",
    sku: "IP14-128-MD",
    currentStock: 25,
    minStock: 5,
    maxStock: 45,
    reorderPoint: 8,
    lastRestocked: "2025-01-07",
    supplier: "Apple Inc.",
    location: "Warehouse B-2",
    status: "In Stock",
  },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add")
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("")
  const [adjustmentReason, setAdjustmentReason] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "status-in-stock"
      case "Low Stock":
        return "status-low-stock"
      case "Out of Stock":
        return "status-out-of-stock"
      default:
        return "bg-gray-500"
    }
  }

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100
    if (current === 0) return { level: "Empty", color: "bg-red-500" }
    if (current <= min) return { level: "Low", color: "bg-orange-500" }
    if (percentage >= 80) return { level: "High", color: "bg-green-500" }
    return { level: "Normal", color: "bg-blue-500" }
  }

  const handleStockAdjustment = () => {
    if (!selectedItem || !adjustmentQuantity) return

    const quantity = Number.parseInt(adjustmentQuantity)
    const newStock =
      adjustmentType === "add"
        ? selectedItem.currentStock + quantity
        : Math.max(0, selectedItem.currentStock - quantity)

    const newStatus = newStock === 0 ? "Out of Stock" : newStock <= selectedItem.minStock ? "Low Stock" : "In Stock"

    setInventory(
      inventory.map((item) =>
        item.id === selectedItem.id ? { ...item, currentStock: newStock, status: newStatus } : item,
      ),
    )

    setIsAdjustModalOpen(false)
    setSelectedItem(null)
    setAdjustmentQuantity("")
    setAdjustmentReason("")
  }

  const openAdjustModal = (item: any, type: "add" | "remove") => {
    setSelectedItem(item)
    setAdjustmentType(type)
    setIsAdjustModalOpen(true)
  }

  const filteredInventory = inventory.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalItems = inventory.length
  const lowStockItems = inventory.filter((item) => item.status === "Low Stock").length
  const outOfStockItems = inventory.filter((item) => item.status === "Out of Stock").length
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * 800, 0) // Assuming avg price of $800

  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold apple-text-primary">Inventory Management</h1>
            <p className="apple-text-secondary text-lg">Monitor and manage your iPhone stock levels</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mobile-grid">
          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Total Items</CardTitle>
              <Package className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold apple-text-primary">{totalItems}</div>
              <p className="text-xs apple-text-secondary">Product variants</p>
            </CardContent>
          </Card>

          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{lowStockItems}</div>
              <p className="text-xs apple-text-secondary">Need restocking</p>
            </CardContent>
          </Card>

          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Out of Stock</CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{outOfStockItems}</div>
              <p className="text-xs apple-text-secondary">Urgent reorder</p>
            </CardContent>
          </Card>

          <Card className="apple-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium apple-text-secondary">Inventory Value</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold apple-text-primary">${totalValue.toLocaleString()}</div>
              <p className="text-xs apple-text-secondary">Estimated value</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 apple-text-secondary" />
              <Input
                placeholder="Search inventory by product name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Inventory Cards - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredInventory.map((item) => {
            const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock)
            return (
              <Card key={item.id} className="apple-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold apple-text-primary">{item.productName}</h3>
                      <p className="text-sm apple-text-secondary">{item.sku}</p>
                    </div>
                    <Badge className={`${getStatusColor(item.status)} text-white`}>{item.status}</Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm apple-text-secondary">Current Stock</span>
                      <span className="font-semibold apple-text-primary">{item.currentStock} units</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${stockLevel.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="apple-text-secondary">Min Stock</p>
                        <p className="font-medium apple-text-primary">{item.minStock}</p>
                      </div>
                      <div>
                        <p className="apple-text-secondary">Max Stock</p>
                        <p className="font-medium apple-text-primary">{item.maxStock}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                      onClick={() => openAdjustModal(item, "add")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Stock
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={() => openAdjustModal(item, "remove")}
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Inventory Table - Desktop */}
        <Card className="apple-card hover-lift hidden md:block">
          <CardHeader>
            <CardTitle className="apple-text-primary flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              Inventory Overview ({filteredInventory.length} items)
            </CardTitle>
            <CardDescription className="apple-text-secondary">
              Real-time inventory tracking and stock management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-primary">Product</TableHead>
                    <TableHead className="apple-text-primary">Current Stock</TableHead>
                    <TableHead className="apple-text-primary">Stock Level</TableHead>
                    <TableHead className="apple-text-primary">Min/Max</TableHead>
                    <TableHead className="apple-text-primary">Last Restocked</TableHead>
                    <TableHead className="apple-text-primary">Status</TableHead>
                    <TableHead className="apple-text-primary">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => {
                    const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock)
                    return (
                      <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell>
                          <div>
                            <p className="font-medium apple-text-primary">{item.productName}</p>
                            <p className="text-sm apple-text-secondary">{item.sku}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold apple-text-primary">{item.currentStock}</span>
                            <span className="text-sm apple-text-secondary">units</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`${stockLevel.color} h-2 rounded-full transition-all duration-300`}
                                style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <Badge variant="outline" className={`${stockLevel.color} text-white border-0`}>
                              {stockLevel.level}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="apple-text-primary">
                          {item.minStock} / {item.maxStock}
                        </TableCell>
                        <TableCell className="apple-text-primary">{item.lastRestocked}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(item.status)} text-white`}>{item.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                              onClick={() => openAdjustModal(item, "add")}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                              onClick={() => openAdjustModal(item, "remove")}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Stock Adjustment Modal */}
        <Dialog open={isAdjustModalOpen} onOpenChange={setIsAdjustModalOpen}>
          <DialogContent className="sm:max-w-[425px] apple-card">
            <DialogHeader>
              <DialogTitle className="apple-text-primary">
                {adjustmentType === "add" ? "Add Stock" : "Remove Stock"}
              </DialogTitle>
              <DialogDescription className="apple-text-secondary">
                {adjustmentType === "add" ? "Add inventory to " : "Remove inventory from "}
                {selectedItem?.productName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="apple-text-primary">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={adjustmentQuantity}
                  onChange={(e) => setAdjustmentQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="rounded-xl"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason" className="apple-text-primary">
                  Reason
                </Label>
                <Select onValueChange={setAdjustmentReason}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {adjustmentType === "add" ? (
                      <>
                        <SelectItem value="restock">New Stock Arrival</SelectItem>
                        <SelectItem value="return">Customer Return</SelectItem>
                        <SelectItem value="found">Found Inventory</SelectItem>
                        <SelectItem value="correction">Stock Correction</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="damage">Damaged</SelectItem>
                        <SelectItem value="theft">Theft/Loss</SelectItem>
                        <SelectItem value="return">Return to Supplier</SelectItem>
                        <SelectItem value="correction">Stock Correction</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              {selectedItem && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm apple-text-secondary mb-2">Current Stock: {selectedItem.currentStock} units</p>
                  {adjustmentQuantity && (
                    <p className="text-sm font-medium apple-text-primary">
                      New Stock:{" "}
                      {adjustmentType === "add"
                        ? selectedItem.currentStock + Number.parseInt(adjustmentQuantity || "0")
                        : Math.max(0, selectedItem.currentStock - Number.parseInt(adjustmentQuantity || "0"))}{" "}
                      units
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleStockAdjustment}
                className={adjustmentType === "add" ? "apple-button" : "bg-red-500 hover:bg-red-600 text-white"}
                disabled={!adjustmentQuantity || !adjustmentReason}
              >
                {adjustmentType === "add" ? "Add Stock" : "Remove Stock"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

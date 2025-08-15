"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Smartphone, Search, Filter } from "lucide-react"
import Layout from "@/components/Layout"

// Mock data
const initialProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    model: "A3108",
    storage: "256GB",
    color: "Natural Titanium",
    price: 1199,
    stock: 15,
    minStock: 5,
    category: "Pro Max",
    sku: "IP15PM-256-NT",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    model: "A3101",
    storage: "128GB",
    color: "Blue Titanium",
    price: 999,
    stock: 12,
    minStock: 5,
    category: "Pro",
    sku: "IP15P-128-BT",
  },
  {
    id: 3,
    name: "iPhone 15",
    model: "A3090",
    storage: "128GB",
    color: "Pink",
    price: 799,
    stock: 8,
    minStock: 5,
    category: "Standard",
    sku: "IP15-128-PK",
  },
  {
    id: 4,
    name: "iPhone 14",
    model: "A2649",
    storage: "128GB",
    color: "Midnight",
    price: 699,
    stock: 20,
    minStock: 5,
    category: "Standard",
    sku: "IP14-128-MD",
  },
]

const colors = [
  "Natural Titanium",
  "Blue Titanium",
  "White Titanium",
  "Black Titanium",
  "Pink",
  "Yellow",
  "Green",
  "Blue",
  "Black",
  "White",
  "Purple",
  "Red",
  "Midnight",
  "Starlight",
  "Product Red",
  "Deep Purple",
  "Space Gray",
  "Silver",
  "Gold",
]

const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"]
const categories = ["Standard", "Plus", "Pro", "Pro Max"]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [newProduct, setNewProduct] = useState({
    name: "",
    model: "",
    storage: "",
    color: "",
    price: "",
    stock: "",
    minStock: "5",
    category: "",
    sku: "",
  })

  const handleAddProduct = () => {
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      model: newProduct.model,
      storage: newProduct.storage,
      color: newProduct.color,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      minStock: Number.parseInt(newProduct.minStock),
      category: newProduct.category,
      sku: newProduct.sku,
    }
    setProducts([...products, product])
    setNewProduct({
      name: "",
      model: "",
      storage: "",
      color: "",
      price: "",
      stock: "",
      minStock: "5",
      category: "",
      sku: "",
    })
    setIsAddModalOpen(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { status: "Out of Stock", color: "bg-red-500" }
    if (stock <= minStock) return { status: "Low Stock", color: "bg-orange-500" }
    return { status: "In Stock", color: "bg-green-500" }
  }

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      "Natural Titanium": "color-silver",
      "Blue Titanium": "color-blue",
      "White Titanium": "color-starlight",
      "Black Titanium": "color-midnight",
      Pink: "color-pink",
      Yellow: "color-yellow",
      Green: "color-green",
      Blue: "color-blue",
      Black: "color-midnight",
      White: "color-starlight",
      Purple: "color-purple",
      Red: "color-product-red",
      Midnight: "color-midnight",
      Starlight: "color-starlight",
      "Product Red": "color-product-red",
      "Deep Purple": "color-deep-purple",
      "Space Gray": "color-space-gray",
      Silver: "color-silver",
      Gold: "color-gold",
    }
    return colorMap[color] || "color-silver"
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold apple-text-primary">Products</h1>
            <p className="apple-text-secondary text-lg">Manage your iPhone inventory</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="apple-button">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 apple-text-secondary" />
                <Input
                  placeholder="Search products, models, or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 apple-text-secondary" />
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40 h-10 rounded-xl">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock, product.minStock)
            return (
              <Card key={product.id} className="apple-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 ${getColorClass(product.color)} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold apple-text-primary">{product.name}</h3>
                        <p className="text-sm apple-text-secondary">{product.model}</p>
                      </div>
                    </div>
                    <Badge className={`${stockStatus.color} text-white`}>{stockStatus.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs apple-text-secondary">Storage</p>
                      <p className="font-medium apple-text-primary">{product.storage}</p>
                    </div>
                    <div>
                      <p className="text-xs apple-text-secondary">Color</p>
                      <p className="font-medium apple-text-primary">{product.color}</p>
                    </div>
                    <div>
                      <p className="text-xs apple-text-secondary">Price</p>
                      <p className="font-semibold apple-text-primary">${product.price}</p>
                    </div>
                    <div>
                      <p className="text-xs apple-text-secondary">Stock</p>
                      <p className="font-medium apple-text-primary">{product.stock} units</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Products Table - Desktop */}
        <Card className="apple-card hover-lift hidden md:block">
          <CardHeader>
            <CardTitle className="apple-text-primary flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-500" />
              Product Inventory ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="apple-text-primary">Product</TableHead>
                    <TableHead className="apple-text-primary">Model</TableHead>
                    <TableHead className="apple-text-primary">Storage</TableHead>
                    <TableHead className="apple-text-primary">Color</TableHead>
                    <TableHead className="apple-text-primary">Price</TableHead>
                    <TableHead className="apple-text-primary">Stock</TableHead>
                    <TableHead className="apple-text-primary">Status</TableHead>
                    <TableHead className="apple-text-primary">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock, product.minStock)
                    return (
                      <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 ${getColorClass(product.color)} rounded-lg flex items-center justify-center`}
                            >
                              <Smartphone className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium apple-text-primary">{product.name}</p>
                              <p className="text-sm apple-text-secondary">{product.sku}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="apple-text-primary">{product.model}</TableCell>
                        <TableCell className="apple-text-primary">{product.storage}</TableCell>
                        <TableCell className="apple-text-primary">{product.color}</TableCell>
                        <TableCell className="font-semibold apple-text-primary">${product.price}</TableCell>
                        <TableCell className="apple-text-primary">{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={`${stockStatus.color} text-white`}>{stockStatus.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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

        {/* Add Product Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[600px] apple-card">
            <DialogHeader>
              <DialogTitle className="apple-text-primary text-xl">Add New iPhone</DialogTitle>
              <DialogDescription className="apple-text-secondary">
                Add a new iPhone model to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="apple-text-primary">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="iPhone 15 Pro Max"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="apple-text-primary">
                    Model Number
                  </Label>
                  <Input
                    id="model"
                    value={newProduct.model}
                    onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
                    placeholder="A3108"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storage" className="apple-text-primary">
                    Storage
                  </Label>
                  <Select onValueChange={(value) => setNewProduct({ ...newProduct, storage: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select storage" />
                    </SelectTrigger>
                    <SelectContent>
                      {storageOptions.map((storage) => (
                        <SelectItem key={storage} value={storage}>
                          {storage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color" className="apple-text-primary">
                    Color
                  </Label>
                  <Select onValueChange={(value) => setNewProduct({ ...newProduct, color: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="apple-text-primary">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="999"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock" className="apple-text-primary">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="10"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock" className="apple-text-primary">
                    Min Stock
                  </Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newProduct.minStock}
                    onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="apple-text-primary">
                    Category
                  </Label>
                  <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku" className="apple-text-primary">
                    SKU
                  </Label>
                  <Input
                    id="sku"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    placeholder="IP15PM-256-NT"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAddProduct}
                className="apple-button"
                disabled={!newProduct.name || !newProduct.price || !newProduct.stock}
              >
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

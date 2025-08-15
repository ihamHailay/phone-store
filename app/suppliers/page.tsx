"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Truck, Send, Building } from 'lucide-react'
import Layout from '@/components/Layout'

// Mock data
const initialSuppliers = [
  { id: 1, name: "Glam Hair Co", contact: "glam@example.com", phone: "555-0101", totalSupplied: 200, lastDelivery: "2025-07-25" },
  { id: 2, name: "Hair Luxe Supplies", contact: "luxe@example.com", phone: "555-0102", totalSupplied: 150, lastDelivery: "2025-07-20" },
  { id: 3, name: "Premium Hair Ltd", contact: "premium@example.com", phone: "555-0103", totalSupplied: 300, lastDelivery: "2025-07-30" },
  { id: 4, name: "Elite Hair Distributors", contact: "elite@example.com", phone: "555-0104", totalSupplied: 75, lastDelivery: "2025-07-10" }
]

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    phone: ''
  })

  const handleAddSupplier = () => {
    const supplier = {
      id: suppliers.length + 1,
      name: newSupplier.name,
      contact: newSupplier.contact,
      phone: newSupplier.phone,
      totalSupplied: 0,
      lastDelivery: "Never"
    }
    setSuppliers([...suppliers, supplier])
    setNewSupplier({ name: '', contact: '', phone: '' })
    setIsAddModalOpen(false)
  }

  const sendRestockRequest = (supplierName: string) => {
    // Mock action
    alert(`Restock request sent to ${supplierName}!`)
  }

  const getDeliveryStatus = (lastDelivery: string) => {
    if (lastDelivery === "Never") return { status: "New", color: "bg-blue-100 text-blue-800" }
    
    const deliveryDate = new Date(lastDelivery)
    const today = new Date()
    const daysDiff = Math.floor((today.getTime() - deliveryDate.getTime()) / (1000 * 3600 * 24))
    
    if (daysDiff <= 7) return { status: "Recent", color: "bg-green-100 text-green-800" }
    if (daysDiff <= 30) return { status: "Active", color: "bg-yellow-100 text-yellow-800" }
    return { status: "Overdue", color: "bg-red-100 text-red-800" }
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold brown-text">Suppliers</h1>
            <p className="text-amber-700 text-lg">Manage your supplier relationships and inventory sources</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gold-gradient hover:opacity-90 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] fade-in">
              <DialogHeader>
                <DialogTitle className="brown-text text-xl">Add New Supplier</DialogTitle>
                <DialogDescription>
                  Add a new supplier to your database.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right brown-text">Name</Label>
                  <Input
                    id="name"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right brown-text">Email</Label>
                  <Input
                    id="contact"
                    type="email"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right brown-text">Phone</Label>
                  <Input
                    id="phone"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleAddSupplier}
                  className="gold-gradient hover:opacity-90 text-white"
                >
                  Add Supplier
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              <Building className="h-5 w-5 gold-text" />
              Supplier Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="brown-text">Name</TableHead>
                    <TableHead className="brown-text">Contact</TableHead>
                    <TableHead className="brown-text">Phone</TableHead>
                    <TableHead className="brown-text">Total Supplied</TableHead>
                    <TableHead className="brown-text">Last Delivery</TableHead>
                    <TableHead className="brown-text">Status</TableHead>
                    <TableHead className="brown-text">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => {
                    const deliveryStatus = getDeliveryStatus(supplier.lastDelivery)
                    return (
                      <TableRow key={supplier.id} className="hover:bg-amber-50">
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{supplier.contact}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell className="font-semibold">{supplier.totalSupplied}</TableCell>
                        <TableCell>{supplier.lastDelivery}</TableCell>
                        <TableCell>
                          <Badge className={deliveryStatus.color}>
                            {deliveryStatus.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-amber-600 border-amber-200 hover:bg-amber-50"
                            onClick={() => sendRestockRequest(supplier.name)}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Restock
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

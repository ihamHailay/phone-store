"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Eye, Star } from 'lucide-react'
import Layout from '@/components/Layout'

// Mock data
const initialCustomers = [
  { id: 1, name: "Jane Doe", phone: "123-456-7890", email: "jane@example.com", totalPurchases: 4, loyaltyPoints: 80 },
  { id: 2, name: "Mary Smith", phone: "987-654-3210", email: "mary@example.com", totalPurchases: 2, loyaltyPoints: 30 },
  { id: 3, name: "Sarah Johnson", phone: "555-123-4567", email: "sarah@example.com", totalPurchases: 6, loyaltyPoints: 120 },
  { id: 4, name: "Emily Brown", phone: "444-987-6543", email: "emily@example.com", totalPurchases: 1, loyaltyPoints: 15 }
]

const purchaseHistory = {
  1: [
    { date: "2025-08-01", product: "Brazilian Straight 16 inch", amount: 240 },
    { date: "2025-07-15", product: "Peruvian Body Wave 18 inch", amount: 140 },
  ],
  2: [
    { date: "2025-08-02", product: "Peruvian Body Wave 18 inch", amount: 140 },
  ]
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const handleAddCustomer = () => {
    const customer = {
      id: customers.length + 1,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      totalPurchases: 0,
      loyaltyPoints: 0
    }
    setCustomers([...customers, customer])
    setNewCustomer({ name: '', phone: '', email: '' })
    setIsAddModalOpen(false)
  }

  const viewHistory = (customerId: number) => {
    setSelectedCustomer(customerId)
    setIsHistoryModalOpen(true)
  }

  const getLoyaltyTier = (points: number) => {
    if (points >= 100) return { tier: "Gold", color: "gold-gradient text-white" }
    if (points >= 50) return { tier: "Silver", color: "bg-gray-200 text-gray-800" }
    return { tier: "Bronze", color: "bg-amber-100 text-amber-800" }
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold brown-text">Customers</h1>
            <p className="text-amber-700 text-lg">Manage your customer relationships</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gold-gradient hover:opacity-90 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] fade-in">
              <DialogHeader>
                <DialogTitle className="brown-text text-xl">Add New Customer</DialogTitle>
                <DialogDescription>
                  Add a new customer to your database.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right brown-text">Name</Label>
                  <Input
                    id="name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right brown-text">Phone</Label>
                  <Input
                    id="phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right brown-text">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleAddCustomer}
                  className="gold-gradient hover:opacity-90 text-white"
                >
                  Add Customer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              <Users className="h-5 w-5 gold-text" />
              Customer Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="brown-text">Name</TableHead>
                    <TableHead className="brown-text">Phone</TableHead>
                    <TableHead className="brown-text">Email</TableHead>
                    <TableHead className="brown-text">Total Purchases</TableHead>
                    <TableHead className="brown-text">Loyalty Points</TableHead>
                    <TableHead className="brown-text">Tier</TableHead>
                    <TableHead className="brown-text">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => {
                    const loyaltyTier = getLoyaltyTier(customer.loyaltyPoints)
                    return (
                      <TableRow key={customer.id} className="hover:bg-amber-50">
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell className="text-sm text-gray-600">{customer.email}</TableCell>
                        <TableCell className="font-semibold">{customer.totalPurchases}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 gold-text" />
                            <span className="font-medium">{customer.loyaltyPoints}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={loyaltyTier.color}>
                            {loyaltyTier.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-amber-600 border-amber-200 hover:bg-amber-50"
                            onClick={() => viewHistory(customer.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            History
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

        {/* Purchase History Modal */}
        <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
          <DialogContent className="sm:max-w-[600px] fade-in">
            <DialogHeader>
              <DialogTitle className="brown-text text-xl">Purchase History</DialogTitle>
              <DialogDescription>
                {selectedCustomer && `Purchase history for ${customers.find(c => c.id === selectedCustomer)?.name}`}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedCustomer && purchaseHistory[selectedCustomer as keyof typeof purchaseHistory] ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="brown-text">Date</TableHead>
                      <TableHead className="brown-text">Product</TableHead>
                      <TableHead className="brown-text">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseHistory[selectedCustomer as keyof typeof purchaseHistory].map((purchase, index) => (
                      <TableRow key={index}>
                        <TableCell>{purchase.date}</TableCell>
                        <TableCell>{purchase.product}</TableCell>
                        <TableCell className="font-semibold gold-text">${purchase.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-gray-500 py-8">No purchase history available</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

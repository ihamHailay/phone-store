"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, SettingsIcon, Users, Moon, Sun, Shield } from 'lucide-react'
import Layout from '@/components/Layout'

// Mock data
const initialUsers = [
  { id: 1, name: "John Admin", email: "admin@hairluxe.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Cashier", email: "jane@hairluxe.com", role: "Cashier", status: "Active" },
  { id: 3, name: "Mike Stock", email: "mike@hairluxe.com", role: "Stock Manager", status: "Inactive" },
]

export default function SettingsPage() {
  const [users, setUsers] = useState(initialUsers)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: ''
  })

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active"
    }
    setUsers([...users, user])
    setNewUser({ name: '', email: '', role: '' })
    setIsAddUserModalOpen(false)
  }

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    ))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "gold-gradient text-white"
      case "Cashier": return "bg-blue-100 text-blue-800"
      case "Stock Manager": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800"
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold brown-text">Settings</h1>
          <p className="text-amber-700 text-lg">Manage system settings and user accounts</p>
        </div>

        {/* Theme Settings */}
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              {darkMode ? <Moon className="h-5 w-5 gold-text" /> : <Sun className="h-5 w-5 gold-text" />}
              Theme Settings
            </CardTitle>
            <CardDescription>Customize the appearance of your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="brown-text font-medium">Dark Mode</Label>
                <p className="text-sm text-gray-600">Switch between light and dark themes</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-amber-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="brown-text flex items-center gap-2">
                <Shield className="h-5 w-5 gold-text" />
                User Management
              </CardTitle>
              <CardDescription>Manage user accounts and roles</CardDescription>
            </div>
            <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
              <DialogTrigger asChild>
                <Button className="gold-gradient hover:opacity-90 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] fade-in">
                <DialogHeader>
                  <DialogTitle className="brown-text text-xl">Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with specific role permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right brown-text">Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right brown-text">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right brown-text">Role</Label>
                    <Select onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Cashier">Cashier</SelectItem>
                        <SelectItem value="Stock Manager">Stock Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleAddUser}
                    className="gold-gradient hover:opacity-90 text-white"
                  >
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="brown-text">Name</TableHead>
                    <TableHead className="brown-text">Email</TableHead>
                    <TableHead className="brown-text">Role</TableHead>
                    <TableHead className="brown-text">Status</TableHead>
                    <TableHead className="brown-text">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-amber-50">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-amber-600 border-amber-200 hover:bg-amber-50"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions */}
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              <Users className="h-5 w-5 gold-text" />
              Role Permissions
            </CardTitle>
            <CardDescription>Overview of role-based access permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="font-semibold brown-text">Admin</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Full system access</li>
                  <li>• User management</li>
                  <li>• Financial reports</li>
                  <li>• System settings</li>
                  <li>• All CRUD operations</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold brown-text">Cashier</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Process sales</li>
                  <li>• View products</li>
                  <li>• Customer management</li>
                  <li>• Basic reports</li>
                  <li>• No system settings</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold brown-text">Stock Manager</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Inventory management</li>
                  <li>• Supplier relations</li>
                  <li>• Stock reports</li>
                  <li>• Product updates</li>
                  <li>• Restock requests</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

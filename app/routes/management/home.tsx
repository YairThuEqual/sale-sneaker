import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ShoppingCart, DollarSign, Package, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { managementHomeShow } from "~/lib/client/management-product-clients";
import type { ManagementHome } from "~/lib/model/management-orders/Mangement-order";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Link } from "react-router";

export function meta () {
    return [
        { title: "My Sneaker | Dashboard"}
    ]
}

export const handle = {
    title: "Dashboard"
}
export default function ManagementHome() {

  const [home, setHome] = useState<ManagementHome>()

  useEffect(() => {
    async function load() {
      const result = await managementHomeShow() 
      setHome(result)
      console.log(result)
    }
    load()
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sneaker Store Admin Dashboard</h1>
        {/* <Button>View Reports</Button> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Today Orders</CardTitle>
            <ShoppingCart className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{home?.orderCounts}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Today Sales</CardTitle>
            <DollarSign className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold break-words">
              {home?.saleCounts.toLocaleString()} MMK
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Total Sneakers</CardTitle>
            <Package className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{home?.productCounts}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Low Stock</CardTitle>
            <AlertTriangle className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">{home?.lowProductCounts}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {home?.orders.length === 0 
            ? "Order is not have" : 
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {home?.orders.map(o => 
                <TableRow>
                  <TableCell>{o.name}</TableCell>
                  <TableCell>{o.total.toLocaleString()} MMK</TableCell>
                  <TableCell
                    className={
                      o.status.toLowerCase() === "pending"
                        ? "text-yellow-500"
                        : o.status.toLowerCase() === "confirmed"
                        ? "text-green-500"
                        : ""
                    }
                  >
                    {o.status}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          }
        </CardContent>
      </Card>

      {/* Low Stock Preview */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Low Stock Sneakers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {home?.products.map(p => 
            <div className="flex items-center justify-between">
              <span>{p.name}</span>
              <Button size="sm" variant="outline">
                <Link to={`/management/product/${p.id}/color`}>Restock</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

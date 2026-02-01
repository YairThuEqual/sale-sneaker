import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";
import AppFormInput from "~/components/custom/app-form-input";
import AppFormSelect from "~/components/custom/app-form-select";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ManagementOrderList, ManagementOrderSearch } from "~/lib/client/management-product-clients";
import { searchOrderSchema, type searchOrderForm } from "~/lib/model/management-orders/Management-order-search";
import type { ManagementOrders } from "~/lib/model/management-orders/Mangement-order";

type SelectOption = {
  label: string;
  value: string; 
};


const orderStatusOptions: SelectOption[] = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Delivered", value: "delivered" },
];



export default function List () {

    const [orders, setOrders] = useState<ManagementOrders[]>([])

    useEffect(() => {
        async function load(){
            const data = await ManagementOrderList()
            setOrders(data)
        }
        load()
    }, [])

    const form = useForm<searchOrderForm>({
        resolver: zodResolver(searchOrderSchema),
        defaultValues: {
            email: "",
            status: "all",
            dateFrom: "",
            dateTo: ""
        }
    })

    const onSubmit = async (form: searchOrderForm) => {
        const result = await ManagementOrderSearch(form)
        setOrders(result)
    };



    return (
        <div>
            <div className="w-fit my-3">
                <FormProvider  {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
                        <AppFormInput control={form.control} label="Email" path="email" placeholder="example@gmail.com" />
                        <AppFormSelect control={form.control} label="Status" path="status" option={orderStatusOptions} valueType="string" />
                        <AppFormInput control={form.control} label="Date From" path="dateFrom" type="date" /> 
                        <AppFormInput control={form.control} label="Date To" path="dateTo" type="date" />
                        <Button type="submit">
                            <Search/> Search
                        </Button>
                    </form>
                </FormProvider>
            </div>
            <div>
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[14%]">Name</TableHead>
                        <TableHead className="w-[15%]">Email</TableHead>
                        <TableHead className="w-[11%]">Phone</TableHead>
                        <TableHead className="w-[22%]">Address</TableHead>
                        <TableHead className="w-[10%]">Status</TableHead>
                        <TableHead className="w-[14%] text-end">Total</TableHead>
                        <TableHead className="w-[12%]">OrderAt</TableHead>
                        <TableHead className="w-[6%]"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {orders.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="truncate">{item.name}</TableCell>
                            <TableCell className="truncate">{item.email}</TableCell>
                            <TableCell className="whitespace-nowrap">{item.phone}</TableCell>
                            <TableCell className="truncate">{item.address}</TableCell>
                            <TableCell className="whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 rounded-2xl text-white text-sm
                                    ${
                                      item.status.toLowerCase() === "pending"
                                        ? "bg-yellow-500"
                                        : item.status.toLowerCase() === "confirmed"
                                        ? "bg-green-600"
                                        : item.status.toLowerCase() === "delivered"
                                        ? "bg-red-600"
                                        : "bg-gray-400"
                                    }
                                  `}
                                >
                                  {item.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-end whitespace-nowrap">
                            {Number(item.total).toLocaleString()} MMK
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-sm">
                            {item.orderAt}
                            </TableCell>
                            <TableCell className="text-center">
                            <Link to={`${item.id}`}>
                                <ArrowRight />
                            </Link>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}
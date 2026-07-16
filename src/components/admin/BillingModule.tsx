import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Car, MessageSquare, Receipt, BarChart3, UserRound } from "lucide-react";
import CustomersManager from "./CustomersManager";
import TariffManager from "./TariffManager";
import EnquiryManager from "./EnquiryManager";
import BillingManager from "./BillingManager";
import RevenueDashboard from "./RevenueDashboard";
import DriverBillsManager, { type DriverBillPrefill } from "./DriverBillsManager";
import type { Bill } from "@/hooks/useBills";

const billToDriverPrefill = (b: Bill): DriverBillPrefill => {
  const bx = b as unknown as {
    bill_category?: string; trip_type?: string; customer_phone?: string;
    customer_address?: string; pickup?: string; drop_location?: string; department?: string;
  };
  return {
    source_bill_id: b.id,
    bill_no: b.bill_no ?? "",
    bill_date: b.bill_date ?? new Date().toISOString().slice(0, 10),
    bill_category: bx.bill_category ?? "",
    trip_type: bx.trip_type ?? "full_day",
    customer_name: b.customer_name ?? "",
    department: bx.department ?? "",
    driver_name: "",
    customer_phone: bx.customer_phone ?? "",
    customer_address: bx.customer_address ?? "",
    pickup: bx.pickup ?? "",
    drop: bx.drop_location ?? "",
    place: b.place ?? "",
    vehicle_type: b.vehicle_type ?? "",
    vehicle_number: b.vehicle_number ?? "",
    start_date: b.start_date ?? "",
    end_date: b.end_date ?? "",
    start_time: b.start_time ?? "",
    end_time: b.end_time ?? "",
    start_km: b.start_km?.toString() ?? "",
    end_km: b.end_km?.toString() ?? "",
    extra_km_source: b.extra_km?.toString() ?? "",
    remarks: b.remarks ?? "",
  };
};

const BillingModule = () => {
  const [tab, setTab] = useState("billing");
  const [driverPrefill, setDriverPrefill] = useState<DriverBillPrefill | null>(null);

  return (
    <div className="space-y-4">
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Customers
          </TabsTrigger>
          <TabsTrigger value="tariff" className="flex items-center gap-2">
            <Car className="h-4 w-4" /> Tariff
          </TabsTrigger>
          <TabsTrigger value="enquiry" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Enquiry
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" /> Billing
          </TabsTrigger>
          <TabsTrigger value="driver_bills" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" /> Driver Bills
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Revenue
          </TabsTrigger>
        </TabsList>
        <TabsContent value="customers"><CustomersManager /></TabsContent>
        <TabsContent value="tariff"><TariffManager /></TabsContent>
        <TabsContent value="enquiry"><EnquiryManager /></TabsContent>
        <TabsContent value="billing">
          <BillingManager
            onCreateDriverBill={(b) => {
              setDriverPrefill(billToDriverPrefill(b));
              setTab("driver_bills");
            }}
          />
        </TabsContent>
        <TabsContent value="driver_bills">
          <DriverBillsManager
            prefill={driverPrefill}
            onConsumePrefill={() => setDriverPrefill(null)}
          />
        </TabsContent>
        <TabsContent value="revenue"><RevenueDashboard /></TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingModule;
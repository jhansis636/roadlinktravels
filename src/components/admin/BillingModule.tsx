import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Car, MessageSquare, Receipt, BarChart3 } from "lucide-react";
import CustomersManager from "./CustomersManager";
import TariffManager from "./TariffManager";
import EnquiryManager from "./EnquiryManager";
import BillingManager from "./BillingManager";
import RevenueDashboard from "./RevenueDashboard";

const BillingModule = () => (
  <div className="space-y-4">
    <Tabs defaultValue="billing" className="space-y-4">
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
        <TabsTrigger value="revenue" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" /> Revenue
        </TabsTrigger>
      </TabsList>
      <TabsContent value="customers"><CustomersManager /></TabsContent>
      <TabsContent value="tariff"><TariffManager /></TabsContent>
      <TabsContent value="enquiry"><EnquiryManager /></TabsContent>
      <TabsContent value="billing"><BillingManager /></TabsContent>
      <TabsContent value="revenue"><RevenueDashboard /></TabsContent>
    </Tabs>
  </div>
);

export default BillingModule;
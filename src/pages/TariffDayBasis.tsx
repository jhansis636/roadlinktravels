import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TermsSection } from "@/components/TermsSection";

const tariffData = [
  { vehicle: "Swift", rentPerDay: 2600, freeKmPerDay: "100 km", fareAfterFree: 12, driverBata: 400, total: 3000 },
  { vehicle: "Etios", rentPerDay: 2600, freeKmPerDay: "100 km", fareAfterFree: 12, driverBata: 400, total: 3000 },
  { vehicle: "Ciaz or Amaze", rentPerDay: 3000, freeKmPerDay: "100 km", fareAfterFree: 13, driverBata: 400, total: 3400 },
  { vehicle: "Ertiga", rentPerDay: 3200, freeKmPerDay: "100 km", fareAfterFree: 14, driverBata: 400, total: 3600 },
  { vehicle: "Innova", rentPerDay: 3400, freeKmPerDay: "100 km", fareAfterFree: 16, driverBata: 400, total: 3800 },
  { vehicle: "Crysta", rentPerDay: 4600, freeKmPerDay: "100 km", fareAfterFree: 17, driverBata: 400, total: 5000 },
  { vehicle: "Hycross", rentPerDay: 5100, freeKmPerDay: "100 km", fareAfterFree: 18, driverBata: 400, total: 5500 },
  { vehicle: "Audi (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "Benz (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "BMW (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "Jaguar (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "Tempo Traveller", rentPerDay: 5000, freeKmPerDay: "100 km", fareAfterFree: 20, driverBata: 400, total: 5400 },
  { vehicle: "Urbania", rentPerDay: 6500, freeKmPerDay: "100 km", fareAfterFree: 30, driverBata: 500, total: 7000 },
  { vehicle: "Coach Van", rentPerDay: 5500, freeKmPerDay: "100 km", fareAfterFree: 40, driverBata: 500, total: 6000 },
  { vehicle: "Bus", rentPerDay: "Call for details", freeKmPerDay: "Call for details", fareAfterFree: "Call for details", driverBata: "Call for details", total: "Call for details", isContact: true },
];

const TariffDayBasis = () => {
  const handleBook = (vehicle: string) => {
    const msg = encodeURIComponent(`Hi, I want to book a ${vehicle} (Outstation - Day Basis)`);
    window.open(`https://wa.me/918248199154?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Outstation Tariff — Day Basis</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Transparent pricing for outstation trips charged per day with included free kilometres.</p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/10">
                <TableHead className="font-bold text-primary">Vehicle</TableHead>
                <TableHead className="font-bold text-primary text-center">Rent/Day</TableHead>
                <TableHead className="font-bold text-primary text-center">Free Km/Day</TableHead>
                <TableHead className="font-bold text-primary text-center">Fare/Km After Free</TableHead>
                <TableHead className="font-bold text-primary text-center">Driver Bata</TableHead>
                <TableHead className="font-bold text-primary text-center">Total</TableHead>
                <TableHead className="font-bold text-primary text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tariffData.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-semibold text-foreground whitespace-nowrap">{row.vehicle}</TableCell>
                  <TableCell className="text-center text-foreground">{typeof row.rentPerDay === "number" ? `₹${row.rentPerDay}` : row.rentPerDay}</TableCell>
                  <TableCell className="text-center text-foreground">{row.freeKmPerDay}</TableCell>
                  <TableCell className="text-center text-foreground">{typeof row.fareAfterFree === "number" ? `₹${row.fareAfterFree}` : row.fareAfterFree}</TableCell>
                  <TableCell className="text-center text-foreground">{typeof row.driverBata === "number" ? `₹${row.driverBata}` : row.driverBata}</TableCell>
                  <TableCell className="text-center font-bold text-foreground">{typeof row.total === "number" ? `₹${row.total}` : row.total}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant={row.isContact ? "outline" : "default"} className="text-xs" onClick={() => handleBook(row.vehicle)}>
                      {row.isContact ? "Contact Us" : "Book Now"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TariffDayBasis;

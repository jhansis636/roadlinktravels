import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TermsSection } from "@/components/TermsSection";

const tariffData = [
  { vehicle: "Swift", minKmPerDay: 300, farePerKm: 13, driverBata: 400, amount: 4300 },
  { vehicle: "Etios", minKmPerDay: 300, farePerKm: 13, driverBata: 400, amount: 4300 },
  { vehicle: "Ciaz or Amaze", minKmPerDay: 300, farePerKm: 14, driverBata: 400, amount: 4600 },
  { vehicle: "Ertiga", minKmPerDay: 350, farePerKm: 17, driverBata: 400, amount: 5500 },  
  { vehicle: "Innova", minKmPerDay: 350, farePerKm: 18, driverBata: 500, amount: 6800 },
  { vehicle: "Crysta", minKmPerDay: 400, farePerKm: 20, driverBata: 500, amount: 8500 },
  { vehicle: "Hycross", minKmPerDay: 400, farePerKm: 22, driverBata: 500, amount: 9300 },
  { vehicle: "Audi (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "Benz (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "BMW (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "Jaguar (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "Tempo Traveller", minKmPerDay: 400, farePerKm: 30, driverBata: 600, amount: 12600 },
  { vehicle: "Urbania", minKmPerDay: 400, farePerKm: 38, driverBata: 600, amount: 15800 },
  { vehicle: "Coach Van", minKmPerDay: 400, farePerKm: 45, driverBata: 800, amount: 18800 },
  { vehicle: "Bus", minKmPerDay: 400, farePerKm: "Call for details", driverBata: "Call for details", amount: "Call for details", isContact: true },
];

const TariffKmBasis = () => {
  const handleBook = (vehicle: string) => {
    const msg = encodeURIComponent(`Hi, I want to book a ${vehicle} (Outstation - Km Basis)`);
    window.open(`https://wa.me/918248199154?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Outstation Tariff — Kilometre Basis</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Pay per kilometre pricing for outstation trips with minimum daily kilometre requirements.</p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/10">
                <TableHead className="font-bold text-primary">Vehicle</TableHead>
                <TableHead className="font-bold text-primary text-center">Min Km/Day</TableHead>
                <TableHead className="font-bold text-primary text-center">Fare/Km (₹)</TableHead>
                <TableHead className="font-bold text-primary text-center">Driver Bata/Day</TableHead>
                <TableHead className="font-bold text-primary text-center">Amount (₹)</TableHead>
                <TableHead className="font-bold text-primary text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tariffData.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-semibold text-foreground whitespace-nowrap">{row.vehicle}</TableCell>
                  <TableCell className="text-center text-foreground">{row.minKmPerDay}</TableCell>
                  <TableCell className="text-center text-foreground">{typeof row.farePerKm === "number" ? `₹${row.farePerKm}` : row.farePerKm}</TableCell>
                  <TableCell className="text-center text-foreground">{typeof row.driverBata === "number" ? `₹${row.driverBata}` : row.driverBata}</TableCell>
                  <TableCell className="text-center font-bold text-foreground">{typeof row.amount === "number" ? `₹${row.amount}` : row.amount}</TableCell>
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

export default TariffKmBasis;

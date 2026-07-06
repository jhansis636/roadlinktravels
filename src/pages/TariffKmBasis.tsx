import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TermsSection } from "@/components/TermsSection";
import SEO from "@/components/SEO";
import { kmBasisTariff as tariffData } from "@/data/tariff";

const TariffKmBasis = () => {
  const handleBook = (vehicle: string) => {
    const msg = encodeURIComponent(`Hi, I want to book a ${vehicle} (Outstation - Km Basis)`);
    window.open(`https://wa.me/918248199154?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <SEO
        title="Outstation Taxi Tariff Km Basis Coimbatore | Per Kilometre Cab Rates"
        description="Per-kilometre outstation taxi tariff from Coimbatore — Swift, Etios, Ertiga, Innova, Crysta, Hycross, Tempo Traveller, Urbania, Coach Van and luxury sedan rates with driver bata."
        path="/tariff/km-basis"
        keywords="Coimbatore taxi km basis, outstation taxi per km Coimbatore, Coimbatore car rental, Innova rental Coimbatore"
      />
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
        <TermsSection />
      </div>
    </div>
  );
};

export default TariffKmBasis;

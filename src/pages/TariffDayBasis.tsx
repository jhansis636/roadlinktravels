import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TermsSection } from "@/components/TermsSection";
import SEO from "@/components/SEO";
import { dayBasisTariff as tariffData } from "@/data/tariff";

const TariffDayBasis = () => {
  const handleBook = (vehicle: string) => {
    const msg = encodeURIComponent(`Hi, I want to book a ${vehicle} (Outstation - Day Basis)`);
    window.open(`https://wa.me/918248199154?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <SEO
        title="Outstation Taxi Tariff Day Basis Coimbatore | Innova, Crysta, Tempo Traveller Fares"
        description="Transparent day-basis outstation taxi tariff from Coimbatore for Swift, Etios, Ertiga, Innova, Crysta, Hycross, Tempo Traveller, Urbania and luxury sedans (Audi, Benz, BMW, Jaguar). 100 free km/day."
        path="/tariff/day-basis"
        keywords="outstation taxi Coimbatore, Coimbatore taxi tariff day basis, Innova rental Coimbatore, Tempo Traveller Coimbatore, luxury sedan rental Coimbatore"
      />
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
        <TermsSection />
      </div>
    </div>
  );
};

export default TariffDayBasis;

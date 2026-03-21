import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileText, Download, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import signatureImg from "@/assets/signature.jpg";
import logoImg from "@/assets/logo.png";

const generateQuotationNumber = () => {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RL-${y}${m}${d}-${rand}`;
};

const QuotationManager = () => {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    to: "",
    pickup: "",
    drop: "",
    days: "",
    price: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleGenerate = async () => {
    if (!form.to || !form.pickup || !form.drop || !form.days || !form.price) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setGenerating(true);
    try {
      const doc = new jsPDF("p", "mm", "a4");
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentW = pageW - margin * 2;
      const today = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const quotationNo = generateQuotationNumber();

      let y = 15;

      // Logo
      try {
        const logo = await loadImage(logoImg);
        const logoH = 18;
        const logoW = (logo.width / logo.height) * logoH;
        doc.addImage(logo, "PNG", margin, y, logoW, logoH);
        y += logoH + 4;
      } catch {
        y += 5;
      }

      // Header line
      doc.setDrawColor(30, 58, 138);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageW - margin, y);
      y += 8;

      // From line
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(30, 58, 138);
      doc.text("From – Roadlink Tours and Travels", margin, y);
      y += 10;

      // Quotation title
      doc.setFontSize(20);
      doc.setTextColor(30, 58, 138);
      doc.text("QUOTATION", pageW / 2, y, { align: "center" });
      y += 12;

      // Date & Quotation No
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${today}`, margin, y);
      doc.text(`Quotation No: ${quotationNo}`, pageW - margin, y, { align: "right" });
      y += 10;

      // Separator
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageW - margin, y);
      y += 10;

      // To
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      doc.text("To:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(form.to, margin + 40, y);
      y += 10;

      // Details table
      const details = [
        ["Pickup Location", form.pickup],
        ["Drop Location", form.drop],
        ["Number of Days", form.days],
        ["Price", `Rs. ${form.price}`],
      ];

      // Table header
      doc.setFillColor(30, 58, 138);
      doc.rect(margin, y, contentW, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text("Description", margin + 5, y + 7);
      doc.text("Details", margin + contentW / 2 + 5, y + 7);
      y += 10;

      // Table rows
      details.forEach((row, i) => {
        const rowH = 10;
        if (i % 2 === 0) {
          doc.setFillColor(245, 247, 250);
          doc.rect(margin, y, contentW, rowH, "F");
        }
        doc.setDrawColor(220, 220, 220);
        doc.line(margin, y + rowH, pageW - margin, y + rowH);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(row[0], margin + 5, y + 7);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
        doc.text(row[1], margin + contentW / 2 + 5, y + 7);
        y += rowH;
      });

      y += 12;

      // Custom message
      if (form.message.trim()) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(30, 58, 138);
        doc.text("Message:", margin, y);
        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(form.message, contentW);
        doc.text(lines, margin, y);
        y += lines.length * 5 + 8;
      }

      // Terms
      y += 5;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageW - margin, y);
      y += 8;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text("* Prices are subject to change based on season and availability.", margin, y);
      y += 5;
      doc.text("* GST and tolls may apply additionally.", margin, y);

      // Signature section
      y += 15;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      doc.text("Sincerely,", margin, y);
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("For ROAD LINK Tours & Travels", margin, y);
      y += 5;

      try {
        const sig = await loadImage(signatureImg);
        const sigH = 22;
        const sigW = (sig.width / sig.height) * sigH;
        doc.addImage(sig, "JPEG", margin, y, sigW, sigH);
        y += sigH + 3;
      } catch {
        y += 10;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Proprietor", margin, y);

      // Footer line
      const pageH = doc.internal.pageSize.getHeight();
      doc.setDrawColor(30, 58, 138);
      doc.setLineWidth(0.8);
      doc.line(margin, pageH - 15, pageW - margin, pageH - 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text("Roadlink Tours and Travels | www.roadlinktravels.com", pageW / 2, pageH - 10, { align: "center" });

      doc.save(`Quotation_${quotationNo}.pdf`);
      toast({ title: "Quotation PDF generated successfully!" });
      setOpen(false);
      setForm({ to: "", pickup: "", drop: "", days: "", price: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to generate PDF.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quotations</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Send Quotation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Quotation</DialogTitle>
              <DialogDescription>
                Fill in the details to generate a professional quotation PDF.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="q-to">To (Customer Name / Recipient) *</Label>
                <Input
                  id="q-to"
                  placeholder="Customer name"
                  value={form.to}
                  onChange={(e) => handleChange("to", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="q-pickup">Pickup Location *</Label>
                <Input
                  id="q-pickup"
                  placeholder="Pickup location"
                  value={form.pickup}
                  onChange={(e) => handleChange("pickup", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="q-drop">Drop Location *</Label>
                <Input
                  id="q-drop"
                  placeholder="Drop location"
                  value={form.drop}
                  onChange={(e) => handleChange("drop", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q-days">Number of Days *</Label>
                  <Input
                    id="q-days"
                    type="number"
                    min="1"
                    placeholder="e.g. 3"
                    value={form.days}
                    onChange={(e) => handleChange("days", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="q-price">Price (₹) *</Label>
                  <Input
                    id="q-price"
                    type="number"
                    min="0"
                    placeholder="e.g. 15000"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="q-msg">Custom Message</Label>
                <Textarea
                  id="q-msg"
                  placeholder="Any additional details for the customer..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2">
                {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Generate PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
        <p>Click "Send Quotation" to create and download a professional quotation PDF for your customers.</p>
      </div>
    </div>
  );
};

export default QuotationManager;

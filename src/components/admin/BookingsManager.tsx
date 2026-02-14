import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RefreshCw, Loader2, Calendar, Users, CheckCircle, Clock, BarChart3, FileDown, ArrowLeft } from "lucide-react";
import { format, isToday, isThisMonth, isThisYear, parseISO } from "date-fns";
import BookingStatistics from "./BookingStatistics";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type BookingStatus = "new" | "confirmed" | "completed";
type FilterType = "all" | "today" | "month" | "year";

interface Booking {
  id: string;
  customer_name: string;
  phone_number: string;
  email: string | null;
  pickup_location: string;
  destination: string;
  booking_date: string;
  status: BookingStatus;
  created_at: string;
}

const BookingsManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const { toast } = useToast();

  const fetchBookings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch bookings", variant: "destructive" });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const filteredBookings = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter((b) => {
      const date = parseISO(b.created_at);
      if (filter === "today") return isToday(date);
      if (filter === "month") return isThisMonth(date);
      if (filter === "year") return isThisYear(date);
      return true;
    });
  }, [bookings, filter]);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    setUpdatingId(id);
    const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update booking status", variant: "destructive" });
    } else {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
      toast({ title: "Status Updated", description: `Booking marked as ${newStatus}` });
    }
    setUpdatingId(null);
  };

  const deleteBooking = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete booking", variant: "destructive" });
    } else {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast({ title: "Booking Deleted", description: "The booking has been removed" });
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const filterLabel = filter === "all" ? "All Bookings" : filter === "today" ? "Today's Bookings" : filter === "month" ? "This Month's Bookings" : "This Year's Bookings";
    doc.setFontSize(16);
    doc.text(`Roadlink Tours - ${filterLabel}`, 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated: ${format(new Date(), "dd MMM yyyy, HH:mm")}`, 14, 22);

    autoTable(doc, {
      startY: 28,
      head: [["#", "Customer", "Phone", "Pickup", "Destination", "Date", "Status"]],
      body: filteredBookings.map((b, i) => [
        i + 1,
        b.customer_name,
        b.phone_number,
        b.pickup_location,
        b.destination,
        format(parseISO(b.booking_date), "dd MMM yyyy HH:mm"),
        b.status,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`bookings-${filter}-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    toast({ title: "PDF Exported", description: "Booking report downloaded successfully" });
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "new": return <Badge variant="default">New</Badge>;
      case "confirmed": return <Badge className="bg-secondary text-secondary-foreground">Confirmed</Badge>;
      case "completed": return <Badge variant="outline" className="border-primary text-primary">Completed</Badge>;
    }
  };

  const totalBookings = bookings.length;
  const newBookings = bookings.filter((b) => b.status === "new").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (showStats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Booking Statistics</h2>
          <Button variant="outline" size="sm" onClick={() => setShowStats(false)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Bookings
          </Button>
        </div>
        <BookingStatistics bookings={bookings} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setShowStats(true)}>
            <BarChart3 className="h-4 w-4 mr-1" /> Booking Statistics
          </Button>
          <Button variant="outline" size="sm" onClick={fetchBookings}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{totalBookings}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-primary">{newBookings}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-secondary">{confirmedBookings}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-primary">{completedBookings}</div></CardContent>
        </Card>
      </div>

      {/* Filter & Export Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          {(["all", "today", "month", "year"] as FilterType[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "today" ? "Today" : f === "month" ? "This Month" : "This Year"}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={exportPDF} disabled={filteredBookings.length === 0}>
          <FileDown className="h-4 w-4 mr-1" /> Export as PDF
        </Button>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="pt-6">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No bookings found for the selected filter.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-xs">{booking.id.slice(0, 8)}</TableCell>
                      <TableCell className="font-medium">{booking.customer_name}</TableCell>
                      <TableCell>{booking.phone_number}</TableCell>
                      <TableCell>{booking.pickup_location}</TableCell>
                      <TableCell>{booking.destination}</TableCell>
                      <TableCell>{format(new Date(booking.booking_date), "MMM dd, yyyy HH:mm")}</TableCell>
                      <TableCell>
                        <Select
                          value={booking.status}
                          onValueChange={(value: BookingStatus) => updateStatus(booking.id, value)}
                          disabled={updatingId === booking.id}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue>{getStatusBadge(booking.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the booking from {booking.customer_name}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteBooking(booking.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsManager;

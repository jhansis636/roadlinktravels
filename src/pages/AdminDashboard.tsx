import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Trash2, RefreshCw, Loader2, Calendar, Users, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

type BookingStatus = "new" | "confirmed" | "completed";

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

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    } else if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have admin privileges.",
        variant: "destructive",
      });
      signOut();
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate, toast, signOut]);

  const fetchBookings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchBookings();
    }
  }, [user, isAdmin]);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    } else {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      toast({
        title: "Status Updated",
        description: `Booking marked as ${newStatus}`,
      });
    }
    setUpdatingId(null);
  };

  const deleteBooking = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive",
      });
    } else {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast({
        title: "Booking Deleted",
        description: "The booking has been removed",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "new":
        return <Badge variant="default">New</Badge>;
      case "confirmed":
        return <Badge className="bg-secondary text-secondary-foreground">Confirmed</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-primary text-primary">Completed</Badge>;
    }
  };

  // Statistics
  const totalBookings = bookings.length;
  const newBookings = bookings.filter((b) => b.status === "new").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <span className="font-semibold text-lg">Kavya Tours Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchBookings}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{newBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{confirmedBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{completedBookings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No bookings yet. Bookings will appear here when customers submit them.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Pickup</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-xs">
                          {booking.id.slice(0, 8)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {booking.customer_name}
                        </TableCell>
                        <TableCell>{booking.phone_number}</TableCell>
                        <TableCell>{booking.email || "-"}</TableCell>
                        <TableCell>{booking.pickup_location}</TableCell>
                        <TableCell>{booking.destination}</TableCell>
                        <TableCell>
                          {format(new Date(booking.booking_date), "MMM dd, yyyy HH:mm")}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(value: BookingStatus) =>
                              updateStatus(booking.id, value)
                            }
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
      </main>
    </div>
  );
};

export default AdminDashboard;

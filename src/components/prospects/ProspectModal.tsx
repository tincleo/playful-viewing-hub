import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, ClipboardList, DollarSign, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import ProspectForm from "./ProspectForm";

interface ProspectModalProps {
  prospect: any;
  open: boolean;
  onClose: () => void;
}

export default function ProspectModal({ prospect, open, onClose }: ProspectModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (!prospect) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("prospects")
        .delete()
        .eq("id", prospect.id);

      if (error) throw error;

      toast({ title: "Prospect deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error deleting prospect",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isEditing) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Prospect</DialogTitle>
          </DialogHeader>
          <ProspectForm
            initialData={prospect}
            onSuccess={() => {
              setIsEditing(false);
              toast({ title: "Prospect updated successfully" });
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <DialogTitle className="text-2xl font-bold">
                {prospect.name || "Unnamed Prospect"}
              </DialogTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(prospect.status)}>
                {prospect.status}
              </Badge>
              <Badge className={getPriorityColor(prospect.priority)}>
                {prospect.priority} priority
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{prospect.phone}</span>
                </div>
                {prospect.location && (
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>{prospect.location.name}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>{format(new Date(prospect.datetime), "PPpp")}</span>
                </div>
                {prospect.price && (
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3" />
                    <span>${prospect.price}</span>
                  </div>
                )}
              </div>

              {prospect.services && prospect.services.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 mb-2">
                    <ClipboardList className="h-5 w-5 mr-3" />
                    <span className="font-medium">Services</span>
                  </div>
                  <div className="space-y-2">
                    {prospect.services.map((service: any) => (
                      <div key={service.id} className="bg-gray-50 p-3 rounded-md">
                        <div className="font-medium">{service.type}</div>
                        {service.details && (
                          <div className="text-sm text-gray-600 mt-1">
                            {Object.entries(service.details).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span>{" "}
                                {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {prospect.notes && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {prospect.notes}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              prospect and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

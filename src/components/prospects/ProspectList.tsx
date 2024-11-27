import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone } from "lucide-react";
import { format } from "date-fns";

interface ProspectListProps {
  prospects: any[];
}

export default function ProspectList({ prospects }: ProspectListProps) {
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

  return (
    <div className="space-y-4">
      {prospects.map((prospect) => (
        <Card key={prospect.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {prospect.name || "Unnamed Prospect"}
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {prospect.phone}
                  </div>
                  {prospect.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {prospect.location.name}
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(prospect.datetime), "PPp")}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={getStatusColor(prospect.status)}>
                  {prospect.status}
                </Badge>
                <Badge className={getPriorityColor(prospect.priority)}>
                  {prospect.priority} priority
                </Badge>
              </div>
            </div>
            {prospect.services && prospect.services.length > 0 && (
              <div className="mt-4">
                <div className="flex gap-2">
                  {prospect.services.map((service: any) => (
                    <Badge key={service.id} variant="outline">
                      {service.type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
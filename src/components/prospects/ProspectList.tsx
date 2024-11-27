import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone } from "lucide-react";
import { format } from "date-fns";
import ProspectModal from "./ProspectModal";

interface ProspectListProps {
  prospects: any[];
}

export default function ProspectList({ prospects }: ProspectListProps) {
  const [selectedProspect, setSelectedProspect] = useState<any>(null);

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {prospects.map((prospect) => (
          <Card 
            key={prospect.id} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
            onClick={() => setSelectedProspect(prospect)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {prospect.name || "Unnamed Prospect"}
                  </h3>
                  <Badge className={getStatusColor(prospect.status)}>
                    {prospect.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
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

                <div className="flex justify-between items-center pt-2">
                  <Badge className={getPriorityColor(prospect.priority)}>
                    {prospect.priority} priority
                  </Badge>
                  {prospect.services && prospect.services.length > 0 && (
                    <Badge variant="outline">
                      {prospect.services.length} service{prospect.services.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProspectModal
        prospect={selectedProspect}
        open={!!selectedProspect}
        onClose={() => setSelectedProspect(null)}
      />
    </>
  );
}
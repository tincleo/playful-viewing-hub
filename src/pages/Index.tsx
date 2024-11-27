import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MapPin, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProspectList from "@/components/prospects/ProspectList";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: prospects, isLoading } = useQuery({
    queryKey: ["prospects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prospects")
        .select(`
          *,
          location:locations(id, name),
          services(id, type, details)
        `)
        .order('datetime', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching prospects",
          description: error.message,
        });
        throw error;
      }
      return data;
    },
  });

  return (
    <div className="container mx-auto py-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-purple-800">Alpha Cleaning</CardTitle>
            <p className="text-gray-500">Prospect Management</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/locations")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Locations
            </Button>
            <Button
              onClick={() => navigate("/prospects/new")}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4" />
              New Prospect
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <ProspectList prospects={prospects || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
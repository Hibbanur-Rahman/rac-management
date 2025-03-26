import React, { useState,useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  BookOpenText, 
  Building2, 
  UserCheck, 
  Tag ,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SupervisorService from "@/services/supervisorService";

const CoordinatorCard = ({ coordinator }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate long text
  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };

  return (
    <div className="perspective-1000 transform transition-all duration-500 hover:scale-105">
      <Card 
        className={`
          w-full max-w-sm mx-auto 
          border-2 border-opacity-20 
          shadow-xl 
          overflow-hidden 
          transition-all 
          duration-500
          py-0
          ${isExpanded ? 'h-auto' : 'h-[420px]'}
        `}
      >
        {/* Header with Profile Indicator */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {coordinator.salutation} {coordinator.name}
              </h2>
              <p className="text-sm opacity-80 mt-1">
                {coordinator.designation || 'coordinator'}
              </p>
            </div>
            {coordinator.isCoordinator && (
              <div 
                className="
                  absolute top-4 right-4 
                  bg-green-500 text-white 
                  px-2 py-1 rounded-full 
                  text-xs font-semibold
                  animate-pulse
                "
              >
                Coordinator
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-6 space-y-4">
          {/* Key Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Building2 className="text-blue-500 w-5 h-5" />
              <span className="text-sm">
                {truncate(coordinator.department, 30)} | {truncate(coordinator.university, 30)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-red-500 w-5 h-5" />
              <a 
                href={`mailto:${coordinator.email}`} 
                className="text-sm hover:text-blue-600 transition"
              >
                {coordinator.email}
              </a>
            </div>

            {coordinator.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="text-green-500 w-5 h-5" />
                <a 
                  href={`tel:${coordinator.phone}`} 
                  className="text-sm hover:text-blue-600 transition"
                >
                  {coordinator.phone}
                </a>
              </div>
            )}

            {coordinator.specialization && (
              <div className="flex items-center space-x-3">
                <BookOpenText className="text-purple-500 w-5 h-5" />
                <span className="text-sm">
                  {truncate(coordinator.specialization, 40)}
                </span>
              </div>
            )}
          </div>

          {/* Expandable Section */}
          <div 
            className={`
              overflow-hidden 
              transition-all 
              duration-500 
              ${isExpanded ? 'max-h-96' : 'max-h-0'}
            `}
          >
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center space-x-3">
                  <Tag className="text-indigo-500 w-5 h-5" />
                  <span className="text-sm">
                    Role: {coordinator.role || 'Not Specified'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <UserCheck className="text-teal-500 w-5 h-5" />
                  <span className="text-sm">
                    Joined: {new Date(coordinator.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              w-full 
              mt-4 
              py-2 
              text-sm 
              bg-gray-100 
              hover:bg-gray-200 
              text-gray-700 
              rounded-lg 
              transition
            "
          >
            {isExpanded ? 'Show Less' : 'View More Details'}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

const CoordinatorList = () => {
  const [coordinatorList, setCoordinatorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCoordinator = async () => {
    try {
      setIsLoading(true);
      const response = await SupervisorService.GetCoordinator();
      if (response.status === 200) {
        setCoordinatorList(response?.data?.data || []);
        toast.success("Coordinators retrieved successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to get coordinators");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch coordinators on component mount
  useEffect(() => {
    handleGetCoordinator();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserCheck className="w-8 h-8" />
          Coordinators
        </h1>
        <Button 
          variant="outline" 
          onClick={handleGetCoordinator}
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh List
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">Loading coordinators...</p>
        </div>
      ) : coordinatorList.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No coordinators found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coordinatorList.map((coordinator) => (
            <CoordinatorCard 
              key={coordinator._id} 
              coordinator={coordinator} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoordinatorList;
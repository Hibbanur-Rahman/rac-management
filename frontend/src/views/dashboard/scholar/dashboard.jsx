import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const ScholarDashboard = () => {
  // Mock data - replace with actual data from your backend
  const scholarProfile = {
    name: "John Doe",
    researchTopic: "Artificial Intelligence in Healthcare",
    supervisor: "Dr. Jane Smith",
    department: "Computer Science",
    researchProgress: 65
  };

  const upcomingMeetings = [
    {
      date: "April 15, 2024",
      time: "2:00 PM",
      type: "RAC Meeting",
      status: "Upcoming"
    },
    {
      date: "April 22, 2024",
      time: "10:00 AM", 
      type: "Progress Review",
      status: "Scheduled"
    }
  ];

  const recentDocuments = [
    {
      name: "Research Proposal",
      uploadDate: "March 20, 2024",
      status: "Approved"
    },
    {
      name: "Quarterly Progress Report",
      uploadDate: "March 25, 2024", 
      status: "Under Review"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-3xl border shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Scholar Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2" /> Scholar Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{scholarProfile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Research Topic</p>
                <p className="font-semibold">{scholarProfile.researchTopic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Supervisor</p>
                <p className="font-semibold">{scholarProfile.supervisor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-semibold">{scholarProfile.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Research Progress</p>
                <Progress value={scholarProfile.researchProgress} className="mt-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {scholarProfile.researchProgress}% Completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" /> Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingMeetings.map((meeting, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center border-b py-3 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{meeting.type}</p>
                  <p className="text-sm text-gray-500">
                    {meeting.date} at {meeting.time}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Recent Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentDocuments.map((doc, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center border-b py-3 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded on {doc.uploadDate}
                  </p>
                </div>
                <div className="flex items-center">
                  {doc.status === "Approved" ? (
                    <CheckCircle2 className="text-green-500 mr-2" />
                  ) : (
                    <span className="text-yellow-500 mr-2">⏳</span>
                  )}
                  <span className={`
                    text-sm font-medium 
                    ${doc.status === "Approved" ? "text-green-600" : "text-yellow-600"}
                  `}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full">
                Upload Document
              </Button>
              <Button variant="outline" className="w-full">
                Request Meeting
              </Button>
              <Button variant="secondary" className="w-full">
                View Progress Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScholarDashboard;
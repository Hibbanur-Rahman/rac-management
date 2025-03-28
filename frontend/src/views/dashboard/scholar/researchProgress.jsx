import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Upload, 
  Eye, 
  Info 
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

const ResearchProgress = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual backend data
  const researchDetails = {
    topic: "Machine Learning Applications in Healthcare Diagnostics",
    supervisor: "Dr. Emily Rodriguez",
    startDate: "September 15, 2023",
    expectedCompletionDate: "August 30, 2025"
  };

  const progressMilestones = [
    {
      title: "Literature Review",
      status: "Completed",
      completedDate: "December 2023",
      progress: 100
    },
    {
      title: "Research Methodology",
      status: "In Progress",
      completedDate: "March 2024",
      progress: 75
    },
    {
      title: "Data Collection",
      status: "Pending",
      completedDate: null,
      progress: 30
    },
    {
      title: "Initial Analysis",
      status: "Not Started",
      completedDate: null,
      progress: 0
    }
  ];

  const researchDocuments = [
    {
      name: "Research Proposal",
      type: "Proposal",
      uploadDate: "October 20, 2023",
      status: "Approved"
    },
    {
      name: "Literature Review Report",
      type: "Report",
      uploadDate: "January 15, 2024",
      status: "Reviewed"
    }
  ];

  const renderProgressColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-3xl border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Research Progress</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Upload Document
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Upload new research documents
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Research Overview Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Research Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Research Topic</p>
                <p className="font-semibold">{researchDetails.topic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Supervisor</p>
                <p className="font-semibold">{researchDetails.supervisor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Research Start Date</p>
                <p className="font-semibold">{researchDetails.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expected Completion</p>
                <p className="font-semibold">{researchDetails.expectedCompletionDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" /> Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Progress value={60} className="w-full mb-4" />
            <p className="text-xl font-bold">60% Completed</p>
            <p className="text-sm text-gray-500 mt-2">
              On track to meet research timeline
            </p>
          </CardContent>
        </Card>

        {/* Research Milestones */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" /> Research Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressMilestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <span 
                        className={`text-xs text-white px-2 py-1 rounded ${renderProgressColor(milestone.status)}`}
                      >
                        {milestone.status}
                      </span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                    <p className="text-sm text-gray-500 mt-1">
                      {milestone.completedDate ? `Completed on ${milestone.completedDate}` : 'Not yet completed'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Documents */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Research Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {researchDocuments.map((doc, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                      <p className="text-xs text-gray-400">
                        Uploaded: {doc.uploadDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            View Document
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {doc.status === "Approved" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle className="text-green-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              Document Approved
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchProgress;
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, FileIcon, MessageSquareIcon, UserIcon } from "lucide-react";

const Dashboard = () => {
  // Sample data - in a real app this would come from your API/backend
  const [scholars] = useState([
    { id: 1, name: "Jane Smith", rollNumber: "RS2301", researchTopic: "AI in Healthcare", progress: 65, nextMeeting: "2025-04-15" },
    { id: 2, name: "John Doe", rollNumber: "RS2302", researchTopic: "Blockchain Security", progress: 40, nextMeeting: "2025-04-10" },
    { id: 3, name: "Aisha Khan", rollNumber: "RS2303", researchTopic: "ML for Climate Modeling", progress: 80, nextMeeting: "2025-04-20" },
  ]);

  const [upcomingMeetings] = useState([
    { id: 1, scholarName: "Jane Smith", date: "2025-04-15", time: "10:00 AM", agenda: "Progress Review" },
    { id: 2, scholarName: "John Doe", date: "2025-04-10", time: "2:00 PM", agenda: "Methodology Discussion" },
    { id: 3, scholarName: "Aisha Khan", date: "2025-04-20", time: "11:30 AM", agenda: "Results Analysis" },
  ]);

  const [pendingDocuments] = useState([
    { id: 1, scholarName: "Jane Smith", title: "Quarterly Progress Report", dueDate: "2025-04-18" },
    { id: 2, scholarName: "John Doe", title: "Research Proposal Review", dueDate: "2025-04-12" },
  ]);

  // Function to render progress bar
  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supervisor Dashboard</h1>
          <p className="text-gray-500">Welcome to the RAC Management System</p>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
            <AvatarFallback>SP</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Dr. Sarah Parker</p>
            <p className="text-xs text-gray-500">Senior Supervisor</p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scholars</CardTitle>
            <UserIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scholars.length}</div>
            <p className="text-xs text-gray-500">Under your supervision</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
            <p className="text-xs text-gray-500">Scheduled this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDocuments.length}</div>
            <p className="text-xs text-gray-500">Pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="scholars" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
          <TabsTrigger value="scholars">My Scholars</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        {/* Scholars Tab */}
        <TabsContent value="scholars">
          <Card>
            <CardHeader>
              <CardTitle>Scholars Under Supervision</CardTitle>
              <CardDescription>
                Monitor research progress and manage your scholars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scholar Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Research Topic</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scholars.map((scholar) => (
                    <TableRow key={scholar.id}>
                      <TableCell className="font-medium">{scholar.name}</TableCell>
                      <TableCell>{scholar.rollNumber}</TableCell>
                      <TableCell>{scholar.researchTopic}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ProgressBar progress={scholar.progress} />
                          <span className="text-xs">{scholar.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">
                            <MessageSquareIcon className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Meetings Tab */}
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>
                Schedule and manage meetings with your scholars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scholar</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Agenda</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingMeetings.map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium">{meeting.scholarName}</TableCell>
                      <TableCell>{meeting.date}</TableCell>
                      <TableCell>{meeting.time}</TableCell>
                      <TableCell>{meeting.agenda}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm" variant="outline">Notes</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button>
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Schedule New Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents Pending Review</CardTitle>
              <CardDescription>
                Review and provide feedback on scholar documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scholar</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.scholarName}</TableCell>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>{doc.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Provide Feedback</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button>
                  <FileIcon className="h-4 w-4 mr-1" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
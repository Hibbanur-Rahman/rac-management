import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  Plus, 
  Check, 
  X, 
  FileText,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

const MeetingManagement = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data - replace with actual backend data
  const upcomingMeetings = [
    {
      id: 1,
      title: "Quarterly Research Progress Review",
      date: "April 15, 2024",
      time: "2:00 PM - 3:30 PM",
      type: "RAC Meeting",
      location: "Virtual Meeting",
      status: "confirmed",
      participants: [
        { name: "Dr. Emily Rodriguez", role: "Supervisor" },
        { name: "Research Coordinator", role: "Coordinator" }
      ]
    },
    {
      id: 2,
      title: "Methodology Discussion",
      date: "April 22, 2024",
      time: "10:00 AM - 11:30 AM",
      type: "Research Consultation",
      location: "Computer Science Department, Room 305",
      status: "pending",
      participants: [
        { name: "Dr. Michael Chen", role: "Co-Supervisor" }
      ]
    }
  ];

  const pastMeetings = [
    {
      id: 3,
      title: "Research Proposal Review",
      date: "January 20, 2024",
      time: "3:00 PM - 4:30 PM",
      type: "Initial Review",
      location: "Virtual Meeting",
      status: "completed",
      minutes: "Research proposal approved with minor revisions."
    }
  ];

  const renderMeetingStatus = (status) => {
    switch(status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-500">Pending</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const renderMeetingTypeIcon = (type) => {
    switch(type) {
      case 'RAC Meeting':
        return <Users className="text-purple-500 h-5 w-5" />;
      case 'Research Consultation':
        return <FileText className="text-blue-500 h-5 w-5" />;
      case 'Initial Review':
        return <Check className="text-green-500 h-5 w-5" />;
      default:
        return <Calendar className="text-gray-500 h-5 w-5" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-3xl border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Meeting Management
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">Title</label>
                <Input 
                  id="title" 
                  placeholder="Meeting Title" 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right">Date</label>
                <Input 
                  id="date" 
                  type="date" 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="time" className="text-right">Time</label>
                <Input 
                  id="time" 
                  type="time" 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">Type</label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Meeting Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rac">RAC Meeting</SelectItem>
                    <SelectItem value="consultation">Research Consultation</SelectItem>
                    <SelectItem value="review">Progress Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">Location</label>
                <Input 
                  id="location" 
                  placeholder="Meeting Location or Video Call Link" 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">Description</label>
                <Textarea 
                  id="description" 
                  placeholder="Meeting agenda or additional details" 
                  className="col-span-3" 
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Schedule Meeting</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Meetings Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            <Calendar className="mr-2 h-4 w-4" /> Upcoming Meetings
          </TabsTrigger>
          <TabsTrigger value="past">
            <Clock className="mr-2 h-4 w-4" /> Past Meetings
          </TabsTrigger>
        </TabsList>
        
        {/* Upcoming Meetings */}
        <TabsContent value="upcoming">
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {renderMeetingTypeIcon(meeting.type)}
                      {meeting.title}
                    </CardTitle>
                    {renderMeetingStatus(meeting.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <div>
                        {meeting.participants.map((participant, index) => (
                          <div key={index} className="text-sm">
                            {participant.name} 
                            <span className="text-xs text-gray-500 ml-2">
                              ({participant.role})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <Button size="sm">
                      <Check className="mr-2 h-4 w-4" /> Confirm
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Past Meetings */}
        <TabsContent value="past">
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {pastMeetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {renderMeetingTypeIcon(meeting.type)}
                      {meeting.title}
                    </CardTitle>
                    {renderMeetingStatus(meeting.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Meeting Minutes</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{meeting.minutes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeetingManagement;
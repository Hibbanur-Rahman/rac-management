import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  MessageCircle, 
  Calendar, 
  FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const CommunicationSection = () => {
  const [newMessage, setNewMessage] = useState('');

  // Mock data (replace with actual backend data)
  const messages = [
    {
      id: 1,
      sender: 'Dr. Smith',
      role: 'Supervisor',
      content: 'Please update your research proposal draft by next week.',
      timestamp: '2 hours ago',
      type: 'task'
    },
    {
      id: 2,
      sender: 'Research Committee',
      role: 'Advisory Board',
      content: 'Quarterly review meeting scheduled for April 15th.',
      timestamp: 'Yesterday',
      type: 'meeting'
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Quarterly Research Review',
      date: 'April 15, 2024',
      time: '2:00 PM',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Methodology Discussion',
      date: 'April 22, 2024',
      time: '10:00 AM',
      status: 'Pending'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Implement message sending logic
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Messages Column */}
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <CardTitle>Communication</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            New Message
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className="bg-gray-100 p-4 rounded-lg mb-4 hover:bg-gray-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{message.sender}</span>
                      <Badge 
                        variant={message.type === 'task' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {message.type === 'task' ? 'Action Required' : 'Information'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mt-2">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4 flex space-x-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Meetings Column */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <Calendar className="w-6 h-6 text-green-600" />
          <CardTitle>Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {upcomingMeetings.map((meeting) => (
              <div 
                key={meeting.id} 
                className="bg-gray-100 p-4 rounded-lg mb-4 hover:bg-gray-200 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{meeting.title}</h3>
                    <p className="text-sm text-gray-600">
                      {meeting.date} at {meeting.time}
                    </p>
                  </div>
                  <Badge 
                    variant={meeting.status === 'Upcoming' ? 'default' : 'outline'}
                  >
                    {meeting.status}
                  </Badge>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSection;
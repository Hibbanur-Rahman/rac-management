import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  UserCog,
  FileText,
  Calendar,
  ClipboardList,
  Award,
  BookOpen,
} from 'lucide-react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state)=>state?.auth);
  

  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Scholars',
      value: '42',
      description: 'Active research scholars',
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: 'Supervisors',
      value: '15',
      description: 'Registered supervisors',
      icon: <UserCog className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: 'RAC Reports',
      value: '128',
      description: 'Total reports submitted',
      icon: <FileText className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: 'Upcoming Meetings',
      value: '7',
      description: 'Scheduled in next 30 days',
      icon: <Calendar className="h-6 w-6 text-muted-foreground" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'report',
      title: 'RAC Report Submitted',
      scholar: 'Arun Kumar',
      date: '2 hours ago',
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Meeting Scheduled',
      scholar: 'Priya Singh',
      date: '5 hours ago',
    },
    {
      id: 3,
      type: 'document',
      title: 'Thesis Draft Uploaded',
      scholar: 'Rahul Sharma',
      date: '1 day ago',
    },
    {
      id: 4,
      type: 'recommendation',
      title: 'Recommendation Added',
      scholar: 'Neha Patel',
      date: '2 days ago',
    },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'RAC Meeting',
      scholar: 'Arun Kumar',
      date: 'Tomorrow, 10:00 AM',
    },
    {
      id: 2,
      title: 'Progress Review',
      scholar: 'Priya Singh',
      date: 'May 15, 2:30 PM',
    },
    {
      id: 3,
      title: 'Thesis Defense',
      scholar: 'Rahul Sharma',
      date: 'May 20, 11:00 AM',
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: 'Review RAC Report',
      scholar: 'Arun Kumar',
      deadline: 'May 12, 2025',
    },
    {
      id: 2,
      title: 'Approve Research Proposal',
      scholar: 'Neha Patel',
      deadline: 'May 15, 2025',
    },
    {
      id: 3,
      title: 'Provide Feedback on Draft',
      scholar: 'Rahul Sharma',
      deadline: 'May 18, 2025',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'User'}! Here's an overview of the Research Advisory Committee system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="meetings">Upcoming Meetings</TabsTrigger>
          <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest activities in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="rounded-full p-2 bg-muted">
                      {activity.type === 'report' && <FileText className="h-4 w-4" />}
                      {activity.type === 'meeting' && <Calendar className="h-4 w-4" />}
                      {activity.type === 'document' && <BookOpen className="h-4 w-4" />}
                      {activity.type === 'recommendation' && <ClipboardList className="h-4 w-4" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Scholar: {activity.scholar} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Scheduled meetings and presentations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-start space-x-4">
                    <div className="rounded-full p-2 bg-muted">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Scholar: {meeting.scholar} • {meeting.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-4">
                    <div className="rounded-full p-2 bg-muted">
                      <ClipboardList className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Scholar: {task.scholar} • Due: {task.deadline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest thesis and report submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Thesis Draft</p>
                    <p className="text-xs text-muted-foreground">Rahul Sharma • 1 day ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Progress Report</p>
                    <p className="text-xs text-muted-foreground">Priya Singh • 3 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Research Proposal</p>
                    <p className="text-xs text-muted-foreground">Neha Patel • 5 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">RAC Meeting Submission Deadline</p>
                  <p className="text-xs text-muted-foreground">May 15, 2025</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Thesis Submission Deadline</p>
                  <p className="text-xs text-muted-foreground">June 30, 2025</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Annual Progress Review</p>
                  <p className="text-xs text-muted-foreground">July 15, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  FileText, 
  Upload, 
  Eye, 
  Download, 
  Trash2, 
  Filter, 
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual backend data
  const documentTypes = [
    { value: 'proposal', label: 'Research Proposal' },
    { value: 'progress-report', label: 'Progress Report' },
    { value: 'literature-review', label: 'Literature Review' },
    { value: 'methodology', label: 'Research Methodology' }
  ];

  const documentsData = [
    {
      id: 1,
      name: "Research Proposal",
      type: "proposal",
      uploadDate: "October 20, 2023",
      status: "approved",
      version: "1.2",
      size: "2.5 MB"
    },
    {
      id: 2,
      name: "Quarterly Progress Report",
      type: "progress-report",
      uploadDate: "January 15, 2024",
      status: "under-review",
      version: "1.0",
      size: "3.2 MB"
    },
    {
      id: 3,
      name: "Literature Review",
      type: "literature-review",
      uploadDate: "December 5, 2023",
      status: "draft",
      version: "0.9",
      size: "1.8 MB"
    }
  ];

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case 'under-review':
        return <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">Under Review</Badge>;
      case 'draft':
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Draft</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const renderStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <CheckCircle2 className="text-green-500 h-5 w-5" />;
      case 'under-review':
        return <Clock className="text-yellow-500 h-5 w-5" />;
      case 'draft':
        return <AlertTriangle className="text-blue-500 h-5 w-5" />;
      default:
        return null;
    }
  };

  const filteredDocuments = documentsData.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || doc.status === filterStatus)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-3xl border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Document Management
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" /> Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Document Type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input type="file" />
              <Button className="w-full">Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4 flex space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search documents..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select 
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Document Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2" /> Documents List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {renderStatusIcon(doc.status)}
                    {doc.name}
                  </TableCell>
                  <TableCell>
                    {documentTypes.find(type => type.value === doc.type)?.label}
                  </TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    {renderStatusBadge(doc.status)}
                  </TableCell>
                  <TableCell>{doc.version}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className='border-red-600'>
                        <Trash2 className="h-4 w-4 text-red-600"  />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredDocuments.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No documents found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManagement;
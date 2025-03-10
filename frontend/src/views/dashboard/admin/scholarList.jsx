import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { Upload } from "lucide-react";
import { formatDateTime } from "@/utils/dateFormater";
import ScholarService from "@/services/scholarService";

const StatusBadge = ({ status }) => {
  const statusClasses = {
    InActive: "text-yellow-800 bg-[#ffd08978]",
    Active: "text-green-900 bg-green-100",
    cancelled: "text-red-900 bg-red-100",
  };

  return (
    <div
      className={`flex items-center justify-center py-2 px-4 w-[130px] rounded-full ${
        statusClasses[status] || ""
      }`}
    >
      {status}
    </div>
  );
};

const ActionButtons = ({ data }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  return (
    <div className="flex gap-2 items-center py-3">
      <Dialog asChild onOpenChange={setDialogVisible} open={dialogVisible}>
        <DialogTrigger>
          <div className="cursor-pointer p-3 bg-[#dce4f9] text-[#2563eb] rounded-full">
            <FiEye size={18} />
          </div>
        </DialogTrigger>
        <DialogContent
          className="max-w-[700px] max-h-[600px] h-[600px] overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        ></DialogContent>
      </Dialog>
    </div>
  );
};

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="flex gap-2 items-center">
    <input
      id="search"
      type="text"
      placeholder="Filter by name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="p-2 border rounded-lg focus:outline-none focus:border-blue-800"
    />
  </div>
);

const convertArrayToCSV = (array) => {
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  let csv = keys.join(columnDelimiter) + lineDelimiter;
  array.forEach((item) => {
    csv += keys.map((key) => item[key]).join(columnDelimiter) + lineDelimiter;
  });

  return csv;
};

const downloadCSV = (array) => {
  const csv = convertArrayToCSV(array);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "export.csv");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ScholarList = () => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [loader, setLoader] = useState(false);

  const filteredItems = data?.filter((item) =>
    item?.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const subHeaderComponent = useMemo(
    () => (
      <div className="flex justify-between w-full mb-5">
        <button
          onClick={() => downloadCSV(filteredItems)}
          className="text-base flex items-center px-6 py-2 gap-[5px] border border-blue-600 text-gray-600 rounded-lg"
        >
          <Upload className="text-gray-600 " size={20} />
          <p>Export</p>
        </button>
        <div className="flex gap-[10px]">
          <FilterComponent
            filterText={filterText}
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
          />
        </div>
      </div>
    ),
    [filterText, resetPaginationToggle]
  );

  const columns = [
    {
      name: "Scholar Name",
      sortable: true,
      selector: (row) => row?.name,
      cell: (row) => <p>{row?.name}</p>,
    },
    {
      name: "Scholar Email",
      sortable: true,
      selector: (row) => row?.email,
      cell: (row) => <p>{row?.email}</p>,
    },
    {
      name: "Mode",
      sortable: true,
      selector: (row) => row?.fullTime,
      cell: (row) => <p>{row?.fullTime ? "Full Time" : "Distance" || "--"}</p>,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => <StatusBadge status={row?.status} />,
    },
    {
      name: "Action",
      cell: (row) => <ActionButtons data={row} />,
    },
  ];

  //handle get scholars
  const handleGetScholars = async () => {
    setLoader(true);
    try {
      const response = await ScholarService.getAllScholar();
      if (response?.status === 200) {
        setData(response?.data?.data || []);
      }
    } catch (error) {
      console.log("Error while getting Scholars:", error);
      toast.error(error?.data?.message || "Failed to get Scholars!");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleGetScholars();
  }, []);
  return (
    <div className="w-full px-4 pb-8 ">
      <div className="bg-white w-full p-3 rounded-2xl shadow-xl">
        <h1 className="my-4 text-xl font-medium">Scholars List</h1>
        <div className="border rounded-2xl overflow-hidden shadow-sm p-3">
          {loader ? (
            <div className="w-full flex justify-center items-center h-[400px]">
              <ColorRing
                visible={true}
                height="70"
                width="70"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#000", "#000", "#000", "#000", "#000"]}
              />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              selectableRows
              dense
              subHeader
              subHeaderComponent={subHeaderComponent}
              paginationResetDefaultPage={resetPaginationToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarList;

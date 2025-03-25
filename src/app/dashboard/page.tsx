"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ChartAreaInteractive } from "@/components/dashboard/chat-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { toast } from "sonner";

import initialData from "./data.json";

// CSV Upload Component
function CsvUploader({ onDataUpdate }: { onDataUpdate: (data: any[]) => void }) {
  // CSV sample data template
  const generateSampleCSV = () => {
    const headers = ["id", "header", "type", "status", "target", "limit", "reviewer"];
    const sampleData = [
      [1, "Sample Section 1", "Narrative", "In Process", "10", "15", "John Doe"],
      [2, "Sample Section 2", "Technical content", "Done", "20", "25", "Jane Smith"]
    ];
    
    // Convert to CSV format
    const csvContent = [
      headers.join(","),
      ...sampleData.map(row => row.join(","))
    ].join("\n");
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sample_dashboard_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    // Check file extension explicitly
    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file");
      console.error("File is not a CSV:", file.name);
      return;
    }

    // Show loading toast
    const toastId = toast.loading("Parsing CSV file...");
    console.log("File selected:", file.name, "size:", file.size, "type:", file.type);
    
    // Verify Papa is available
    console.log("Papa object:", Papa ? "Available" : "Not Available");

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true, // Skip empty lines
      complete: (results) => {
        console.log("Parse complete, results:", results);
        console.log("Data rows:", results.data.length);
        
        // Dismiss the loading toast
        toast.dismiss(toastId);
        
        if (results.errors && results.errors.length > 0) {
          toast.error("Error parsing CSV file");
          console.error("CSV parse errors:", results.errors);
          return;
        }
        
        if (!results.data || results.data.length === 0) {
          toast.error("CSV file is empty or contains no valid data");
          console.error("Empty CSV data");
          return;
        }
        
        // Check if at least the first row has the expected columns
        const firstRow = results.data[0];
        if (!firstRow || typeof firstRow !== 'object') {
          toast.error("CSV data is not in the expected format");
          console.error("Invalid first row:", firstRow);
          return;
        }
        
        const expectedColumns = ['id', 'header', 'type', 'status', 'target', 'limit', 'reviewer'];
        const hasRequiredColumns = expectedColumns.some(col => Object.keys(firstRow).includes(col));
        
        if (!hasRequiredColumns) {
          toast.error("CSV file doesn't contain required columns. Please use the sample file as a template.");
          console.error("Missing required columns. Found:", Object.keys(firstRow));
          return;
        }

        try {
          // Filter out empty rows and rows without an id or header
          const validData = results.data
            .filter((row: any) => row && typeof row === 'object')
            .filter((row: any) => {
              // At minimum, we need an id or header to identify the row
              return Object.keys(row).length > 0 && (row.id || row.header);
            });
          
          console.log("Valid data rows after filtering:", validData.length);
          
          if (validData.length === 0) {
            toast.error("No valid data found in CSV. Each row must have at least an ID or header.");
            return;
          }
          
          // Format data to match schema expected by DataTable
          const formattedData = validData.map((row: any, index: number) => {
            const formatted = {
              id: row.id || index + 1,
              header: row.header || `Item ${index + 1}`,
              type: row.type || "Narrative",
              status: row.status || "In Process",
              target: row.target?.toString() || "0",
              limit: row.limit?.toString() || "0",
              reviewer: row.reviewer || "Assign reviewer"
            };
            return formatted;
          });

          console.log("Final formatted data:", formattedData);
          onDataUpdate(formattedData);
          toast.success(`Successfully loaded ${formattedData.length} rows`);
        } catch (error) {
          toast.error(`Error processing CSV data: ${error instanceof Error ? error.message : 'Unknown error'}`);
          console.error("CSV processing error:", error);
        }
      },
      error: (error) => {
        toast.dismiss(toastId);
        toast.error(`Failed to parse CSV file: ${error.message}`);
        console.error("Papa parse error:", error);
      }
    });

    // Reset the input so the same file can be uploaded again
    event.target.value = "";
  };

  return (
    <div className="flex flex-col mb-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="csv-upload" className="cursor-pointer">
            <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
              <Upload size={16} />
              <span>Upload CSV</span>
            </div>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <div className="ml-3 text-sm text-muted-foreground">
            CSV headers should match: id, header, type, status, target, limit, reviewer
          </div>
        </div>
        <button 
          onClick={generateSampleCSV}
          className="text-sm text-primary hover:underline"
        >
          Download Sample CSV
        </button>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Having trouble? Make sure your CSV has the correct headers and is properly formatted.
      </div>
    </div>
  );
}

export default function Page() {
  // Use state with a key to force re-render when data changes
  const [tableData, setTableData] = useState<any[]>([]);
  const [dataVersion, setDataVersion] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Initialize data on client side only
  useEffect(() => {
    setIsClient(true);
    setTableData(initialData);
    console.log("Initialized table data with", initialData.length, "rows");
  }, []);

  // Function to update data and increment version
  const updateTableData = (newData: any[]) => {
    console.log("updateTableData called with", newData.length, "rows");
    setTableData(newData);
    setDataVersion(prev => prev + 1);
  };

  // Log data changes
  useEffect(() => {
    if (!isClient) return;
    console.log("Table data updated, new version:", dataVersion);
    console.log("Current table data length:", tableData?.length || 0);
  }, [tableData, dataVersion, isClient]);

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* <AppSidebar /> */}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <CsvUploader onDataUpdate={updateTableData} />
              {/* Force re-render with key */}
              <DataTable key={`data-table-${dataVersion}`} data={tableData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

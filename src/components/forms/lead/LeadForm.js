import { Button, message, Steps } from "antd";
import React, { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import EmploymentDetails from "./EmploymentDetails";
import ResidentialDetails from "./ResidentialDetails";
import VehicleDetails from "./VehicleDetails";
import Thanks from "./Thanks";

const { Step } = Steps;

const steps = [
  {
    title: "Customer Details",
    content: "CustomerDetails",
  },
  {
    title: "Asset Information",
    content: "VehicleDetails",
  },
  {
    title: "Employement Details",
    content: "EmploymentDetails",
  },
  {
    title: "Residence Details",
    content: "ResidentialDetails",
  },
  {
    title: "Complete",
    content: "Thanks",
  },
];

const LeadForm = (props) => {
  const [current, setCurrent] = useState(0);
  const [leadId, setLeadId] = useState(false);
  const [leadData, mergeLeadData] = useState({});
  const [loading, setLoading] = useState(false);
  const [customerInitialData, setCustomerInitialData] = useState({});
  const [vehicleInitialData, setVehicleInitialData] = useState({});
  const [employmentInitialData, setEmploymentInitialData] = useState({});
  const [residentialInitialData, setResidentialInitialData] = useState({});

  const next = () => {
    setCurrent(current + 1);
  };
  const setLeadData = (leadValues) => {
    mergeLeadData({ ...leadData, ...leadValues });
    next();
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const ComponentName = steps[current].content;
  const saveLeadData = async (fieldsValue) => {};
  return (
    <>
      <div className="steps-content">
        {ComponentName == "CustomerDetails" && (
          <CustomerDetails
            leadId={leadId}
            setLeadId={setLeadId}
            setLeadData={setLeadData}
            next={next}
            prev={prev}
            setCustomerInitialData={setCustomerInitialData}
            customerInitialData={customerInitialData}
          />
        )}
        {ComponentName == "VehicleDetails" && (
          <VehicleDetails
            leadId={leadId}
            setLeadId={setLeadId}
            setLeadData={setLeadData}
            next={next}
            prev={prev}
            setVehicleInitialData={setVehicleInitialData}
            vehicleInitialData={vehicleInitialData}
          />
        )}

        {ComponentName == "EmploymentDetails" && (
          <EmploymentDetails
            leadId={leadId}
            setLeadId={setLeadId}
            setLeadData={setLeadData}
            next={next}
            prev={prev}
            setEmploymentInitialData={setEmploymentInitialData}
            employmentInitialData={employmentInitialData}
          />
        )}
        {ComponentName == "ResidentialDetails" && (
          <ResidentialDetails
            leadId={leadId}
            setLeadId={setLeadId}
            saveLeadData={saveLeadData}
            next={next}
            prev={prev}
            setResidentialInitialData={setResidentialInitialData}
            residentialInitialData={residentialInitialData}
          />
        )}
        {ComponentName == "Thanks" && <Thanks />}
      </div>
    </>
  );
};

export default LeadForm;

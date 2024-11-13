import { DashboardIcon, SupplierIcon } from "./icons";

export const newNavigationItems = [
  {
    title: "Dashboard",
    link: "",
    icon: DashboardIcon,
    children: 0,
  },
  {
    title: "Suppliers",
    link: "suppliers",
    icon: SupplierIcon,
    children: 0,
  },
];

export const subPathLinks = {
  "Manage Customers": "/customers",
  "GRN Summary Report": "/reports",
  "Stock Card": "/stock-card",
  "Stock Report": "/stock-report",
  "Stock Statement": "/stock-statement",
  "Transfer Note": "/transfernotereport",
  Jobs: "/jobs",
  "Manage Jobs": "/manage-jobs",
  "Vendor Report": "/vendorreport",
  "Age Composition Report": "/age-composition",
  "Supplier Item Report": "/item-report",
  "Add Stocks to Production": "/production/add-stocks",
};

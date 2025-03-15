import React, { useState, Fragment } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TimelineIcon from "@mui/icons-material/Timeline";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  message: string;
}
const transactions: Transaction[] = [
  {
    id: 1,
    name: "Ordered Food",
    date: "20th May 2022",
    amount: -150.5,
    type: "debit",
    message: "Charges applied on credit card",
  },
  {
    id: 2,
    name: "Ticket Refund",
    date: "20th May 2022",
    amount: 50.5,
    type: "credit",
    message: "Amount credited on debit card",
  },
  {
    id: 3,
    name: "Interest credited",
    date: "20th May 2022",
    amount: 5.5,
    type: "credit",
    message: "Charges applied on credit card",
  },
  {
    id: 4,
    name: "Electricity bill paid",
    date: "20th May 2022",
    amount: -1050.5,
    type: "debit",
    message: "Charges applied on credit card",
  },
  {
    id: 5,
    name: "Interest credited",
    date: "20th May 2022",
    amount: 5.5,
    type: "credit",
    message: "Charges applied on credit card",
  },
];
const TransactionList: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Paper
      className="bg-gray-50 rounded-lg"
      style={{ backgroundColor: "#e8e8e8" }}
    >
      <Box
        className="flex justify-between items-center cursor-pointer p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <Box className="flex items-center gap-2 text-sky-500">
          <TimelineIcon fontSize="small" />
          <Typography className="font-medium">Today's Transactions</Typography>
        </Box>
        <IconButton size="small">
          {expanded ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box className="bg-white">
          {transactions.map((transaction, index) => (
            <Fragment key={transaction.id}>
              <Box className="p-4 flex justify-between items-center">
                <Box className="flex items-center gap-3">
                  <Box className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                    {transaction.type === "debit" ? (
                      <UploadIcon fontSize="small" className="text-sky-500" />
                    ) : (
                      <DownloadIcon fontSize="small" className="text-sky-500" />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">
                      {transaction.name}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {transaction.date}
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{ color: "#0EA5E9" }}
                      className={
                        transaction.type === "debit" ? "block" : "block"
                      }
                    >
                      {transaction.message}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="subtitle2"
                  style={{
                    color: transaction.amount < 0 ? "#EF4444" : "#22C55E",
                  }}
                >
                  {transaction.amount < 0
                    ? `- $ ${Math.abs(transaction.amount).toFixed(2)}`
                    : `+ $ ${transaction.amount.toFixed(2)}`}
                </Typography>
              </Box>
              {index < transactions.length - 1 && <Divider />}
            </Fragment>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};
export default TransactionList;

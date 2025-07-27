import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store.wallet);
  const { withdrawal } = useSelector((store) => store.withdrawal);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="p-5 sm:p-8 lg:p-20">
      <h1 className="text-left text-xl sm:text-2xl lg:text-3xl font-bold pb-5">
        Withdrawal
      </h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left py-3">Date</TableHead>
            <TableHead className="text-left">Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(withdrawal?.history || []).map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100 even:bg-gray-50">
              <TableCell className="text-left">
                <p>{item.date?.toString() || "N/A"}</p>
              </TableCell>
              <TableCell className="text-left">Bank</TableCell>
              <TableCell className="text-right">${item.amount}</TableCell>
              <TableCell className="text-right">{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;

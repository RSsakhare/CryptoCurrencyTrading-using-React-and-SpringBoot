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
import { getAllOrdersForUser } from "@/State/Order/Action";
import { calculateProfitLoss } from "@/Utils/calculateProfitLoss";

const Activity = () => {
  const dispatch = useDispatch()
  const {order} = useSelector(store => store.order);
    
  useEffect(() => {
    dispatch(getAllOrdersForUser({jwt:localStorage.getItem('jwt')}));
  },[])
  return (
    <div className="p-5 sm:p-8 lg:p-20">
      <h1 className="text-left text-xl sm:text-2xl lg:text-3xl font-bold pb-5">
        Activity
      </h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left py-3">Date & Time</TableHead>
            <TableHead className="text-left">Trading Pair</TableHead>
            <TableHead className="text-right">Buy Price</TableHead>
            <TableHead className="text-right">Sell Price</TableHead>
            <TableHead className="text-right">Order Type</TableHead>
            <TableHead className="text-right">Profit/Loss</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order?.orders?.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100 even:bg-gray-50">
              <TableCell className="text-left">
                <p>2024/05/31</p>
                <p className="text-gray-400 text-sm">12:39:32</p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={item?.orderItem?.coin?.image}
                      alt="Bitcoin"
                    />
                  </Avatar>
                  <span className="font-medium">{item?.orderItem?.coin?.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">${item?.orderItem?.buyPrice}</TableCell>
              <TableCell className="text-right">{item?.orderItem?.sellPrice}</TableCell>
              <TableCell className="text-right">{item?.orderType}</TableCell>
              <TableCell className="text-right text-green-600">{calculateProfitLoss(item)}</TableCell>
              <TableCell className="text-right">${item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;

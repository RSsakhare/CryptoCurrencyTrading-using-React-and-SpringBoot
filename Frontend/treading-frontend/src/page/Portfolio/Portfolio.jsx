import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserAssets } from "@/State/Asset/Action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Portfolio = () => {
  const dispatch = useDispatch()
  const {asset} = useSelector(store => store.asset)

  useEffect(() =>{
    dispatch(getUserAssets(localStorage.getItem("jwt")))
  },[])
  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <h1 className="text-left text-xl sm:text-2xl lg:text-3xl font-bold pb-5">
        Portfolio
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left py-3">Asset</TableHead>
            <TableHead className="text-left">Price</TableHead>
            <TableHead className="text-right">Unit</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Change%</TableHead>
            <TableHead className="text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asset?.userAssets?.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100 even:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={item.coin.image}
                      alt="Bitcoin"
                    />
                  </Avatar>
                  <span className="font-medium">{item.coin.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-left">{item.coin.symbol.toUpperCase()}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">{item.coin.price_change_24h}</TableCell>
              <TableCell className="text-right">{item.coin.price_change_percentage_24h}</TableCell>
              <TableCell className="text-right">$ {item.coin.total_volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;

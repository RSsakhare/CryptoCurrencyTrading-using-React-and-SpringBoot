import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const AssetTable = ({ coin = [], category }) => {
  const navigate = useNavigate();
  const scrollHeight = category === "all" ? "h-[77.3vh]" : "h-[82vh]";

  return (
    <ScrollArea className={scrollHeight}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-[100px]">Coin</TableHead>
            <TableHead className="text-left">Symbol</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">24H</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coin.length > 0 ? (
            coin.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-100 even:bg-gray-50">
                <TableCell onClick={() => navigate(`/market/${item.id}`)}>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={item.image} alt={item.name} />
                    </Avatar>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.symbol}</TableCell>
                <TableCell className="text-right">{item.total_volume}</TableCell>
                <TableCell className="text-right">{item.market_cap}</TableCell>
                <TableCell className="text-right">{item.price_change_percentage_24h}</TableCell>
                <TableCell className="text-right">${item.current_price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No assets available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default AssetTable;

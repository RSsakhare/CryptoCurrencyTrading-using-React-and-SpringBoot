import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { existInWatchlist } from "@/Utils/existInWatchlist";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Watchlist = () => {
  const dispatch = useDispatch()
  const {watchlist} = useSelector(store => store.watchlist)

    const handleRemoveToWatchlist = (value) => {
        dispatch(addItemToWatchlist({coinId:value,jwt:localStorage.getItem("jwt")}));
        console.log(value);
    };

    useEffect(()=>{
      dispatch(getUserWatchlist())
    })

  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <h1 className="text-left text-xl sm:text-3xl lg:text-3xl font-bold pb-5">
        Watchlist
      </h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left py-5">Coin</TableHead>
            <TableHead className="text-left">SYMBOL</TableHead>
            <TableHead className="text-right">VOLUME</TableHead>
            <TableHead className="text-right">MARKET CAP</TableHead>
            <TableHead className="text-right">24H</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
            <TableHead className="text-right text-red-600">REMOVE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist?.items?.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100 even:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={item.image}
                      alt="coin"
                    />
                  </Avatar>
                  <span className="font-medium">{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-left">{item.symbol}</TableCell>
              <TableCell className="text-right">{item.totalVolume}</TableCell>
              <TableCell className="text-right">{item.market_cap}</TableCell>
              <TableCell className="text-right">{item.price_change_percentage_24h}</TableCell>
              <TableCell className="text-right">${item.current_price}</TableCell>
              <TableCell className="text-right">
                    <Button 
                    variant="ghost" 
                    onClick={() => handleRemoveToWatchlist(item.id)} 
                    size="icon" 
                    className="h-10 w-10"
                    >
                      <BookmarkFilledIcon className="w-6 h-6"/>
                    </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;

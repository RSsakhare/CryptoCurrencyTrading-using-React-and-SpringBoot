// StockDetails.jsx
import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { existInWatchlist } from "@/Utils/existInWatchlist";

const StockDetails = () => {
  const { coinDetails: coinInfo, loading, error } = useSelector(
    (state) => state.coin,
    shallowEqual
  );

  const { watchlist } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (id && jwt) {
      dispatch(fetchCoinDetails({ coinId: id, jwt }));
      dispatch(getUserWatchlist(localStorage.getItem("jwt")));
    }
  }, [id, dispatch]);

  const handleAddToWatchlist = () => {
    dispatch(
      addItemToWatchlist({
        coinId: coinInfo?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  if (loading) {
    return <p className="p-5 text-lg text-gray-500">Loading coin details...</p>;
  }

  if (error || !coinInfo) {
    return (
      <div className="p-5 text-red-600">
        <p>Failed to load coin details.</p>
        <p>{error?.message || "Please try again later."}</p>
      </div>
    );
  }

  return (
    <div className="p-5 mt-5">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage
              src={coinInfo?.image?.large}
              alt={`${coinInfo?.name} logo`}
            />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p>{coinInfo?.symbol?.toUpperCase()}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coinInfo?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${coinInfo?.market_data?.current_price?.usd?.toLocaleString()}
              </p>
              <p className="text-red-600">
                <span>
                  {coinInfo?.market_data?.market_cap_change_24h?.toLocaleString()}
                </span>
                <span>
                  (
                  {coinInfo?.market_data?.market_cap_change_percentage_24h?.toFixed(2)}
                  %)
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleAddToWatchlist} variant="outline">
            {existInWatchlist(watchlist?.items, coinInfo) ? (
              <BookmarkFilledIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-slate-900 text-white">
                Tread
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How much do you want to spend?</DialogTitle>
                <DialogDescription>
                  Enter the amount you'd like to invest in this coin.
                </DialogDescription>
              </DialogHeader>
              <TreadingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-14">
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;

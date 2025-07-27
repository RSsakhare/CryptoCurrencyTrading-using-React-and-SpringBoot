import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";
import AssetTable from "@/page/Home/AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isBotRelease, setIsBotRelease] = useState(false);

  // ✅ Select only the coin slice
  const coin = useSelector((state) => state.coin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category === "top50") {
      dispatch(getTop50CoinList());
    }
  }, [category, dispatch]);

  useEffect(() => {
    dispatch(getCoinList(1));
  }, [dispatch]);

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);
  const handleCategoryChange = (value) => setCategory(value);
  const handleChange = (e) => setInputValue(e.target.value);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Search:", inputValue);
      setInputValue("");
    }
  };

  // ✅ Safely select coinId for StockChart
  const selectedCoinId = (category === "all" ? coin.coinList : coin.top50)?.[0]?.id;

  return (
    <div className="relative">
      <div className="lg:flex">
        {/* Left Panel */}
        <div className="lg:w-[50%] lg:border-r">
          <div className="p-3 flex items-center gap-4 flex-wrap">
            {["all", "top50", "topGainers", "topLosers"].map((label) => (
              <Button
                key={label}
                onClick={() => handleCategoryChange(label)}
                variant={category === label ? "default" : "outline"}
                className="rounded-full hover:bg-black hover:text-white"
              >
                {label === "all" ? "All" : label.replace(/([A-Z])/g, " $1")}
              </Button>
            ))}
          </div>
          <div className="scroll-wrapper">
            <AssetTable coin={category === "all" ? coin.coinList : coin.top50} category={category} />
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#"/>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#"/>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:block lg:w-[50%] p-5">
          {selectedCoinId ? (
            <StockChart coinId={selectedCoinId} />
          ) : (
            <p className="text-gray-500">No coin data available</p>
          )}
          <div className="flex gap-5 items-center mt-5">
            <Avatar>
              <AvatarImage src="https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628" />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p>ETH</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Ethereum</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">5464</p>
                <p className="text-red-600">
                  <span>-1319049822.578</span>
                  <span> (-0.29803%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Bot Section */}
      {isBotRelease && (
        <section className="absolute bottom-5 right-5 z-40 flex flex-col items-end gap-2">
          <div className="rounded-md w-[25rem] h-[70vh] bg-slate-900 flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-500 px-6 h-[12%]">
              <p className="text-white">Chat Bot</p>
              <Button onClick={handleBotRelease} variant="ghost" size="icon">
                <Cross1Icon className="text-white" />
              </Button>
            </div>

            <div className="h-[76%] overflow-y-auto px-5 py-2 scroll-container">
              <div className="self-start pb-5">
                <div className="bg-slate-800 text-white rounded-md py-2 px-3 w-fit">
                  <p>Hi, Raam Arora</p>
                  <p>You can ask crypto-related questions</p>
                  <p>like price, market cap, etc...</p>
                </div>
              </div>
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className={`pb-5 ${i % 2 === 0 ? "self-start" : "self-end"}`}>
                  <div className="bg-slate-800 text-white rounded-md py-2 px-3 w-fit">
                    <p>{i % 2 === 0 ? "Prompt: Who are you?" : "Answer: Hi, Raam Arora"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[12%]">
              <Input
                className="w-full h-full text-white bg-slate-800 border-none"
                placeholder="Write prompt..."
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </section>
      )}

      {/* Chat Trigger */}
      <div className="absolute bottom-5 right-5">
        <Button
          onClick={handleBotRelease}
          variant="outline"
          className="w-[10rem] h-[3rem] flex gap-2 items-center bg-gray-100 hover:bg-gray-200"
        >
          <MessageCircle size={30} className="fill-[#1e293b] stroke-none hover:fill-[#1a1a1a]" />
          <span className="text-2xl">Chat Bot</span>
        </Button>
      </div>
    </div>
  );
};

export default Home;

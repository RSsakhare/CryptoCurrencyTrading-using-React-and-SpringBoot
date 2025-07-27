package com.trading.service;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trading.modal.Coin;
import com.trading.repository.CoinRepository;

@Service
public class CoinServiceImpl implements CoinService {

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private final RestTemplate restTemplate = new RestTemplate();
    private final Map<String, String> marketChartCache = new ConcurrentHashMap<>();

    @Override
    public List<Coin> getCoinList(int page) throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=" + page;
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(new HttpHeaders()), String.class);
            return objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {});
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception("Error fetching coin list: " + e.getMessage());
        }
    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception {
        String cacheKey = coinId + "_" + days;
        if (marketChartCache.containsKey(cacheKey)) {
            return marketChartCache.get(cacheKey);
        }

        String url = "https://api.coingecko.com/api/v3/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + days;
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(new HttpHeaders()), String.class);
            marketChartCache.put(cacheKey, response.getBody());
            return response.getBody();
        } catch (HttpClientErrorException.TooManyRequests e) {
            throw new Exception("Rate limit exceeded. Please try again later.");
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception("Error fetching market chart: " + e.getMessage());
        }
    }

    @Override
    public String getCoinDetails(String coinId) throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(new HttpHeaders()), String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Coin coin = new Coin();
            coin.setId(getText(jsonNode, "id"));
            coin.setName(getText(jsonNode, "name"));
            coin.setSymbol(getText(jsonNode, "symbol"));
            coin.setImage(getText(jsonNode.path("image"), "large"));

            JsonNode marketData = jsonNode.path("market_data");

            coin.setCurrentPrice(getDouble(marketData.path("current_price"), "usd"));
            coin.setMarketCap(getLong(marketData.path("market_cap"), "usd"));
            coin.setMarketCapRank(getInt(marketData, "market_cap_rank"));
            coin.setTotalVolume(getLong(marketData.path("total_volume"), "usd"));
            coin.setHigh24h(getLong(marketData.path("high_24h"), "usd"));
            coin.setLow24h(getDouble(marketData.path("low_24h"), "usd"));
            coin.setPriceChange24h(getDouble(marketData.path("price_change_24h"), "usd"));
            coin.setPriceChangePercentage24h(getDouble(marketData.path("price_change_percentage_24h"), "usd"));
            coin.setMarketCapChange24h(getLong(marketData, "market_cap_change_24h"));
            coin.setMarketCapChangePercentage24h(getLong(marketData, "market_cap_change_percentage_24h"));
            coin.setTotalSupply(getLong(marketData.path("total_supply"), "usd"));

            coinRepository.save(coin);
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception("Error fetching coin details: " + e.getMessage());
        }
    }

    @Override
    public Coin findById(String coinId) throws Exception {
        return coinRepository.findById(coinId).orElseGet(() -> {
            try {
                getCoinDetails(coinId); // This saves the coin to the repository
                return coinRepository.findById(coinId)
                    .orElseThrow(() -> new Exception("Coin still not found after fetch"));
            } catch (Exception e) {
                throw new RuntimeException("Failed to fetch coin from CoinGecko: " + e.getMessage());
            }
        });
    }

    @Override
    public String searchCoin(String keyword) throws Exception {
        String url = "https://api.coingecko.com/api/v3/search?query=" + keyword;
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(new HttpHeaders()), String.class);
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception("Error searching coin: " + e.getMessage());
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRank() throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(new HttpHeaders()), String.class);
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception("Error fetching top 50 coins: " + e.getMessage());
        }
    }

    @Override
    public String getTreadingCoins() throws Exception {
        String url = "https://api.coingecko.com/api/v3/search/trending";
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(new HttpHeaders()), String.class);
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception("Error fetching trending coins: " + e.getMessage());
        }
    }

    // ✅ Helper methods for null-safe parsing
    private String getText(JsonNode node, String field) {
        return node.has(field) && !node.get(field).isNull() ? node.get(field).asText() : "";
    }

    private double getDouble(JsonNode node, String field) {
        return node.has(field) && !node.get(field).isNull() ? node.get(field).asDouble() : 0.0;
    }

    private long getLong(JsonNode node, String field) {
        return node.has(field) && !node.get(field).isNull() ? node.get(field).asLong() : 0L;
    }

    private int getInt(JsonNode node, String field) {
        return node.has(field) && !node.get(field).isNull() ? node.get(field).asInt() : 0;
    }
}

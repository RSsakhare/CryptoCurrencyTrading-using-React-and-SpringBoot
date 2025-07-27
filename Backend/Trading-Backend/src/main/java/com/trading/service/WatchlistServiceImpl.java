package com.trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.exception.WatchlistNotFoundException;
import com.trading.modal.Coin;
import com.trading.modal.User;
import com.trading.modal.Watchlist;
import com.trading.repository.WatchlistRepository;

@Service
public class WatchlistServiceImpl implements WatchlistService{

	@Autowired
	private WatchlistRepository watchlistRepository;

	@Override
	public Watchlist findUserWatchlist(Long userId) {
	    Watchlist watchlist = watchlistRepository.findByUserId(userId);
	    if (watchlist == null) {
	        throw new WatchlistNotFoundException("Watchlist not found for user ID: " + userId);
	    }
	    return watchlist;
	}


    @Override
    public Watchlist createWatchlist(User user) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);
        return watchlistRepository.save(watchlist);
    }

    @Override
    public Watchlist findById(Long id) {
        return watchlistRepository.findById(id)
            .orElseThrow(() -> new WatchlistNotFoundException("Watchlist not found for ID: " + id));
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        Watchlist watchlist = watchlistRepository.findByUserId(user.getId());

        if (watchlist == null) {
            watchlist = createWatchlist(user);
        }

        if (watchlist.getCoins().contains(coin)) {
            watchlist.getCoins().remove(coin);
        } else {
            watchlist.getCoins().add(coin);
        }

        watchlistRepository.save(watchlist);
        return coin;
    }

	


}

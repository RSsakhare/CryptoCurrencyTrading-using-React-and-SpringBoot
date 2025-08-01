package com.trading.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.modal.Asset;
import com.trading.modal.Coin;
import com.trading.modal.User;
import com.trading.repository.AssetRepository;

@Service
public class AssetServiceImpl implements AssetService{

	@Autowired
	private AssetRepository assetRepository;
	
	
	
	@Override
	public Asset createAsset(User user, Coin coin, double quantity) {
		Asset asset = new Asset();
		asset.setUser(user);
		asset.setCoin(coin);
		asset.setQuantity(quantity);
		asset.setBuyPrice(coin.getCurrentPrice());
		
		return assetRepository.save(asset);
	}

	@Override
	public Asset getAssetById(Long assetId) throws Exception {
		
		return assetRepository.findById(assetId)
				.orElseThrow(()-> new Exception("asset not found"));
	}

	@Override
	public Asset getAssetByUserIdAndId(Long userId, Long assetId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Asset> getUserAssets(Long userId) {
		// TODO Auto-generated method stub
		return assetRepository.findByUserId(userId);
	}

	@Override
	public Asset updateAsset(Long assetId, double quantity) throws Exception {
		
		Asset oldAsset = getAssetById(assetId);
		oldAsset.setQuantity(quantity+oldAsset.getQuantity());
		return assetRepository.save(oldAsset);
	}

	@Override
	public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {
		// TODO Auto-generated method stub
		return assetRepository.findByUserIdAndCoinId(userId, coinId);
	}

	@Override
	public void deleteAsset(Long assetId) {
		// TODO Auto-generated method stub
		assetRepository.deleteById(assetId);
	}

}

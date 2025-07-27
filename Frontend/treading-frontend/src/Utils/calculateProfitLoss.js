export const calculateProfitLoss = (order) => {
    if(order && order.orderItem?.buyPrice && order.orderItem?.sellPrice) {
        return order.orderItem?.sellPrice-order.orderItem?.buyPrice
    }
    return "-"
} 
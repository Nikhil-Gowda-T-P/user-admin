def maxProfit(self, prices: List[int]) -> int:
        
        buy=prices[0]
        profit=0
        maxp=0
        for price in prices:
            if buy>price:
                buy=price
            else:
                profit=price-buy
                maxp=max(profit,maxp)
        return maxp

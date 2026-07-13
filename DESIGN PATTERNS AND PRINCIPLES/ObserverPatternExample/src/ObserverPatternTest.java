public class ObserverPatternTest {
    public static void main(String[] args) {
        StockMarket appleStock = new StockMarket("AAPL", 150.00);

        Observer mobileApp = new MobileApp("MobileApp");
        Observer webApp = new WebApp("WebApp");

        appleStock.registerObserver(mobileApp);
        appleStock.registerObserver(webApp);

        System.out.println("Price change 1:");
        appleStock.setPrice(155.00);

        System.out.println("\nPrice change 2:");
        appleStock.setPrice(160.00);
    }
}

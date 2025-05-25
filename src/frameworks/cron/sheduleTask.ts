import cron from "node-cron";
import OfferController  from "../../adapters/controllers/offer.controller";
import OfferDependencies from "../dependancies/offer.dependencies";

const offerExecution=new OfferController(OfferDependencies)

cron.schedule("1 0 * * *", async () => {
  console.log("Running cron job: Process Expired Offers");
  await offerExecution.execute();
});
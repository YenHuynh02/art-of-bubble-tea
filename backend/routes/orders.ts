/**
 * file order.ts contains the route for generating a random drink order.
 */
import { Request, Response, Router } from "express";
import { generateRandomDrink } from "../controllers/logic";

const ordersRouter = Router();


// 3. Kien
// 
// Kien chỉnh sửa lại file orders.ts để sử dụng generateRandomDrink() method từ logic.ts.
//
ordersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const orderResult = await generateRandomDrink();
    res.status(200).json(orderResult);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send("Server error");
  }
});

export default ordersRouter;

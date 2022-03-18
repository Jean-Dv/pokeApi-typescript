import { Router, Request, Response } from 'express';

export const teamsRouter = Router();

teamsRouter.route('/')
.get((req: Request, res: Response) => {
	res.status(200).send();
})

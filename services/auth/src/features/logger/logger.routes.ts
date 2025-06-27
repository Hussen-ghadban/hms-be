import { Request,Response,NextFunction } from 'express';
import { Router } from 'express';
import { loggerService } from './logger.service';
const router = Router();

router.post('/log-action', (req:Request,res:Response,next:NextFunction) => {
    const { userId,hotelId, service, action, resourceType, status } = req.body;

    if (!userId || !hotelId || !service || !action || !status) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }



    loggerService.logAction({
        userId,
        hotelId,
        service,
        action,
        resourceType: resourceType || undefined,
        status,
    })

    // Here you would typically save this log to a database or external logging service
    console.log(`Action logged: ${action} by user ${userId} in hotel ${hotelId} for service ${service} with status ${status}`);

    res.status(200).json({ message: 'Action logged successfully' });
});


export default router;
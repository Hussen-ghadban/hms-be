import { Request, Response, NextFunction } from 'express';

export const actionLogger = (action: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        logCompletedAction(req, res, action)
        next();
    };
};


async function logCompletedAction(req: Request, res: Response, action: string) {
    // Only log successful actions (2xx status codes)
    if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:4000';
        const serviceName = process.env.SERVICE_NAME || 'unknown';

        console.log(`Logging action: ${action} for user ${req.user.id} in hotel ${req.user.hotelId}`);
        
        try {
            // await fetch(`${authServiceUrl}/logger/log-action`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         userId: req.user.id,
            //         hotelId: req.user.hotelId,
            //         service: serviceName,
            //         action: action,
            //         resourceType: extractResourceType(req.path),
            //         status: 'SUCCESS',
            //     })
            // });
        } catch (error) {
            console.error('Failed to log action:', error);
        }
    }
}
function extractResourceType(path: string): string | undefined {
    const segments = path.split('/').filter(s => s);
    if (segments.length === 0) return undefined;
    
    const resourceName = segments[0];
    // Convert rooms -> Room, amenities -> Amenity
    return resourceName.charAt(0).toUpperCase() + resourceName.slice(1, -1);
}

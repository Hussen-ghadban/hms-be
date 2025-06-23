import { Request, Response, NextFunction } from 'express';
import { AppActions, AppSubjects, defineAbilitiesForUser } from '../utils/ability';

export interface Permission {
    subject: string;
    action: string;
}

export interface IntrospectResponse {
    perms?: Permission[];
}


export const requirePermissions = (permissions: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ error: 'NO_TOKEN' });
                return;
            }

            const token = authHeader.split(' ')[1];

            const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:4000';
            const introspectUrl = `${authServiceUrl}/introspect`;

            const response = await fetch(introspectUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token })
            });

            if (!response.ok) {
                res.status(401).json({ error: 'INTROSPECTION_FAILED' });
                return;
            }
            const requiredPermissions: Permission[] = permissions.map(permString => {
                const [subject, action] = permString.split('.');
                if (!subject || !action) {
                    throw new Error(`Invalid permission format: ${permString}. Expected format: 'object:action'`);
                }
                return { subject, action };
            });

            const introspectData: IntrospectResponse = await response.json();

            const userPermissions = introspectData.perms || [];

            const ability = await defineAbilitiesForUser(userPermissions);

            const deniedPermissions: string[] = [];

            for (const permission of requiredPermissions) {
                if (!ability.can(permission.action as AppActions, permission.subject as AppSubjects)) {
                    deniedPermissions.push(`${permission.subject}.${permission.action}`);
                }
            }

            // If any permissions are denied, return error
            if (deniedPermissions.length > 0) {
                res.status(403).json({
                    error: 'INSUFFICIENT_PERMISSIONS',
                    required: permissions,
                    denied: deniedPermissions,
                    available: userPermissions.map(p => `${p.subject}.${p.action}`)
                });
                return;
            }

            next();
        } catch (error) {
            console.error('Permission check error:', error);
            res.status(500).json({ error: 'PERMISSION_CHECK_ERROR' });
            return;
        }
    };
};
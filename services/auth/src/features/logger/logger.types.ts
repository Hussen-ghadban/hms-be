export interface SessionData {
    userId: string;
    hotelId: string;
    token: string;
    isActive?: boolean;
    loginTime?: Date;
    logoutTime?: Date;
}

export interface ActionLogEntry {
    userId: string;
    hotelId: string;
    service: string;
    action: string;
    resourceType?: string;
    status: 'SUCCESS' | 'FAILED' | 'DENIED';
    errorMessage?: string;
}

export interface BusinessContext {
    service: string;
    method: string;
    endpoint: string;
    action?: string;
    requestData?: any;
}

export interface SessionWithUser {
    id: string;
    userId: string;
    hotelId: string;
    token: string;
    isActive: boolean;
    loginTime: Date;
    logoutTime: Date | null;
    user: {
        id: string;
        email: string;
        role: {
            name: string;
            permissions: Array<{
                subject: string;
                action: string;
            }>;
        };
    };
}

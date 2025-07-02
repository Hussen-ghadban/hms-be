import express from 'express';

import { validateRequest } from '../../middleware/validation';
import { addExchangeRateSchema, exchangeRateIdSchema, updateExchangeRateSchema } from './exchange.validation';
import { addExchangeRate, deleteExchangeRate, getExchangeRate, getExchangeRates, updateExchangeRate } from './exchange.controller';
import { requirePermissions } from '../../middleware/requirePermissions';
import { actionLogger } from '../../middleware/logger';

const router=express.Router();
router.post('/add',
    
     requirePermissions(["Exchange.create"]),
    validateRequest({ body: addExchangeRateSchema }),
    addExchangeRate,
    actionLogger("add Exchange")
);
router.get('/get',
    
     requirePermissions(["Guest.read"]),
    getExchangeRates,
    actionLogger("get Exchanges")
);
router.get('/get/:id',
    
     requirePermissions(["Guest.read"]),
    validateRequest({ params: exchangeRateIdSchema }),
    getExchangeRate,
    actionLogger("get Exchange")
);
router.put('/update/:id',
    
     requirePermissions(["Guest.update"]),
    validateRequest({
        params: exchangeRateIdSchema,
        body: updateExchangeRateSchema
    }),
    updateExchangeRate,
    actionLogger("update Exchange")
);
router.delete('/delete/:id',
    
     requirePermissions(["Guest.delete"]),
    validateRequest({ params: exchangeRateIdSchema }),
    deleteExchangeRate,
    actionLogger("delete Exchange")
);
export default router;
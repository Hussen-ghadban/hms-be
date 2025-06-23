import express from 'express';

import { validateRequest } from '../../middleware/validation';
import { addExchangeRateSchema, exchangeRateIdSchema, updateExchangeRateSchema } from './exchange.validation';
import { addExchangeRate, deleteExchangeRate, getExchangeRate, getExchangeRates, updateExchangeRate } from './exchange.controller';
import { requirePermissions } from '../../middleware/requirePermissions';

const router=express.Router();
router.post('/add',
    
     requirePermissions(["Exchange.create"]),
    validateRequest({ body: addExchangeRateSchema }),
    addExchangeRate
);
router.get('/get',
    
     requirePermissions(["Guest.read"]),
    getExchangeRates
);
router.get('/get/:id',
    
     requirePermissions(["Guest.read"]),
    validateRequest({ params: exchangeRateIdSchema }),
    getExchangeRate
);
router.put('/update/:id',
    
     requirePermissions(["Guest.update"]),
    validateRequest({
        params: exchangeRateIdSchema,
        body: updateExchangeRateSchema
    }),
    updateExchangeRate
);
router.delete('/delete/:id',
    
     requirePermissions(["Guest.delete"]),
    validateRequest({ params: exchangeRateIdSchema }),
    deleteExchangeRate
);
export default router;
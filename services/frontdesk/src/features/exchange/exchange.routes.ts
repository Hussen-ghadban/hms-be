import express from 'express';

import { validateRequest } from '../../middleware/validation';
import { addExchangeRateSchema, convertCurrencySchema, exchangeRateIdSchema, updateExchangeRateSchema } from './exchange.validation';
import { addExchangeRate, convertCurrency, deleteExchangeRate, getCurrencies, getExchangeRate, getExchangeRates, updateExchangeRate } from './exchange.controller';
import { requirePermissions } from '../../middleware/requirePermissions';
import { actionLogger } from '../../middleware/logger';
import { paginateResults } from '../../middleware/pagination.middleware';

const router=express.Router();
router.post('/add',
    
     requirePermissions(["Exchange.create"]),
    validateRequest({ body: addExchangeRateSchema }),
    addExchangeRate,
    actionLogger("add Exchange")
);
router.post(
  "/convert",
  requirePermissions(["Exchange.read"]),
  validateRequest(convertCurrencySchema),
  convertCurrency,
  actionLogger("convert currency")
);
router.get('/get',
    
     requirePermissions(["Guest.read"]),
     paginateResults,
    getExchangeRates,
    actionLogger("get Exchanges")
);
router.get('/get/:id',
    
     requirePermissions(["Guest.read"]),
    validateRequest({ params: exchangeRateIdSchema }),
    getExchangeRate,
    actionLogger("get Exchange")
);
router.get('/currencies',
    getCurrencies,
    actionLogger("get Currencies"),
)
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
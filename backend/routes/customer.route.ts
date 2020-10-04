import * as express from 'express';
const router = express.Router();
import { CustomerController } from '../controllers/customer.controller'
import { authMiddleware } from '../middlewares/auth';

// TODO: need to establish Dependency Injection
const controller = new CustomerController();

router.get('/', authMiddleware, controller.getCustomers);
router.get('/:id', authMiddleware, controller.getCustomerById);
router.post('/', authMiddleware, controller.createCustomer);
router.put('/:id', authMiddleware, controller.updateCustomer);
router.delete('/:id', authMiddleware, controller.deleteCustomer);

export = router;

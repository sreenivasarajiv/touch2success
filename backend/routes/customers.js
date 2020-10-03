const router = require('express').Router();
const { Customer, validate } = require('../models/customer');
const Joi = require('joi');

router.get('/', async (req, res) => {
	const customers = await Customer.find();
	return res.json(customers);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findOne({ _id: req.params.id });

	if (!customer)
		return res.status(404).send('customer not found');

	res.json(customer);
});

router.post('/', async (req, res) => {
	const { value, error } = validate(req.body);

	if (error)
		return res.status(400).send(error.details[0].message);

	let customer = new Customer(value);
	customer = await customer.save();
	res.json(customer);
});

router.put('/:id', async (req, res) => {

	const schema = {
		name: Joi.string().max(255).min(5),
		isGold: Joi.bool(),
		phone: Joi.string().min(10).max(25)
	}

	const { error, value } = Joi.validate(req.body, schema);

	if (error)
		return res.status(400).send(error.details[0].message);

	const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, value, { new: true });

	if (!customer)
		return res.status(404).send('customer not found');

	res.json(customer);
});

router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndDelete(req.params.id);

	if (!customer)
		return res.status(404).send('customer not found');

	res.json(customer);
})

module.exports = router;
import * as express from 'express';
const router = express.Router();
import * as Joi from "joi";
import * as jwt from "jsonwebtoken";
import * as config from "config";

router.post('/', async (req, res) => {
	const { error, value } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// TODO: fetch user from database -- hardcoded as if now

	// const user = await User.findOne({ email: value.email });

	const user = { email: 'sreenivasarajiv@gmail.com', name: 'Sreenivasa Rajiv R', password: 'Admin123$' }

	if ((value as any).email != user.email)
		return res.status(400).send('invalid email or password');

	// TODO: validate user password -- hardcoded as if now

	// const isValidPassword = await bcryptjs.compare(value.password, user.password);

	const isValidPassword = (value as any).password === user.password;
	if (!isValidPassword) return res.status(400).send('invalid email or password');

	const token = jwt.sign({ email: user.email, name: user.name }, config.get('jwtPrivateKey'));
	res.json(token);

});

function validate(req: express.Request) {
	const schema = Joi.object({
		email: Joi.string().email().required().min(5).max(255),
		password: Joi.string().required().min(5).max(255)
	});
	return Joi.validate(req, schema);
}

export = router;

const { Router } = require("express");
const router = Router();

router.get("/big", (req, res) => {
	res.json({
		message: "Hello",
	});
});

module.exports = router;

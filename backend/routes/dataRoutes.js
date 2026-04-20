const router = require("express").Router();
const Data = require("../models/Data");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// CREATE (admin + subadmin)
router.post("/", auth, roles("admin", "subadmin"), async (req, res) => {
  const data = await Data.create(req.body);
  res.json(data);
});

// UPDATE (subadmin only)
router.put("/:id", auth, roles("subadmin"), async (req, res) => {
  const updated = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// READ (all roles)
router.get("/", auth, async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

module.exports = router;
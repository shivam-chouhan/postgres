import { users } from "../server";
import { router } from "./api";
router.get('/users/id', (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter((user) => user.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

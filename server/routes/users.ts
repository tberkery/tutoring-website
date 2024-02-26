const router = express.Router();
const users = new UserDao();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name }: { name: string } = req.body;
    const data = await users.create({ name });
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const data = await users.readAll();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id }: { id: string } = req.params;
  try {
    const data = await users.read(id);
    if (!data) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

export default router;
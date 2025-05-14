import express, { NextFunction, Request, Response } from "express"
import { User } from "../db/users"

const router = express.Router()
import bcrypt from "bcrypt"
import cloudinary from "../utils/cloudinary"

// Get all
router.get("/", async (req: Request, res: Response) => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ["password"] },
    })
    res.json(user)
  } catch (e) {
    res.status(500)
  }
})

// Get one
router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    })
    if (!user) {
      return res.sendStatus(404)
    }
    res.send(user)
  }
)

// Create one
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body.name || !req.body.emailAddress || !req.body.password) {
      return res.status(401).json({ message: "Required Fields Missing." })
    }
    let existingUser = await User.findOne({
      where: { emailAddress: req.body.emailAddress },
    })
    console.log(req.body)

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = User.create({
      name: req.body.name,
      emailAddress: req.body.emailAddress,
      password: hashedPassword,
    })

    try {
      const newUser = (await user).save()
      res.status(201).json(await newUser)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
)

// Login
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  if (!req.body.emailAddress || !req.body.password) {
    return res.json({ message: "Missing email or password" })
  }
  const user = await User.findOne({
    where: { emailAddress: req.body.emailAddress },
  })
  if (user == null) {
    return res.sendStatus(404)
  }
  try {
    const pwResult = await bcrypt.compare(req.body.password, user.password)
    if (pwResult) {
      let { emailAddress, avatar, name, id } = user
      res.json({ id, emailAddress, name, avatar })
    } else {
      res.status(401).send("not allowed")
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

// Change Password
router.patch(
  "/password/:id",
  async (req: Request, res: Response): Promise<any> => {
    const user = await User.findByPk(req.params.id, {
      attributes: ["password"],
    })
    if (user === null) return res.sendStatus(403)
    if (!req.body.newPassword)
      return res.status(400).json({ message: "Required field missing" })
    try {
      const pwResult = await bcrypt.compare(req.body.password, user.password)
      if (!pwResult) {
        res.status(401).json({ message: "Incorrect Password" })
        return
      }
      const newPassword = await bcrypt.hash(req.body.newPassword, 10)
      await User.update(
        { password: newPassword },
        { where: { id: req.params.id } }
      )
      res.status(201).json({ message: "Password successfully changed" })
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }
)

// Update one avatar
router.patch(
  "/avatar/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.body.avatar) return res.sendStatus(400)
    const fileStr = req.body.avatar
    try {
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "menulator v2",
      })
      const updatedUser = await User.update(
        {
          avatar: uploadedResponse._public_id,
        },
        { where: { id: req.params.id } }
      )

      if (updatedUser[0] === 0) return res.sendStatus(400)
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
    }
  }
)

// Update one
router.patch("/:id", async (req: Request, res: Response): Promise<any> => {
  const bodyObj = {
    name: req.body.name || null,
    emailAddress: req.body.emailAddress || null,
  }
  let updateObj = Object.fromEntries(
    Object.entries(bodyObj).filter(([_, v]) => v !== null)
  )
  try {
    const updatedUser = await User.update(updateObj, {
      where: { id: req.params.id },
    })
    if (updatedUser[0] === 0) return res.sendStatus(404)
    res.json(201)
  } catch (error) {
    res.status(400).json({ message: (error as Error).message })
  }
})

// Delete one
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await User.destroy({ where: { id: req.params.id } })
    res.json({ message: "Deleted User" })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

export default router

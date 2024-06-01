import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();

const port = 8000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.get("/registration", async (req, res) => {
  try {
    const response = await prisma.registration.findMany();
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/registration", async (req, res) => {
  try {
    const { fullName, nim, email, phoneNumber, address } = req.body;
    const response = await prisma.registration.create({
      data: {
        fullName,
        nim,
        email,
        phoneNumber,
        address,
      },
    });
    res.status(201).json({
      message: "Berhasil Mendaftar",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.patch("/registration/:id", async (req, res) => {
  try {
    const { fullName, nim, email, phoneNumber, address } = req.body;
    const response = await prisma.registration.update({
      where: {
        id: req.params.id,
      },
      data: {
        fullName,
        nim,
        email,
        phoneNumber,
        address,
      },
    });
    res.status(201).json({
      message: "Berhasil Memperbaharui",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/registration/:id", async (req, res) => {
  try {
    const response = await prisma.registration.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({
      message: "Berhasil Menghapus",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/registration/:id", async (req, res) => {
  try {
    const response = await prisma.registration.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log("App running on port " + port);
});

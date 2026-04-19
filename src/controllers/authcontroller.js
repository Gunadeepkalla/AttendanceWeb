import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generatetoken.js";

export const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const {
      name,
      regdNo,
      email,
      password,
      branch,
      year,
      company,
      startDate,
      endDate,
      timings
    } = req.body;

    if (!name || !regdNo || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { regdNo }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await prisma.user.create({
      data: {
        name,
        regdNo,
        email,
        password: hashedPassword,
        branch,
        year: Number(year),
        company,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        timings
      }
    });

    res.status(201).json({
      message: "Registered successfully (waiting for approval)",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Check user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Check approval
    if (user.status !== "APPROVED") {
      return res.status(403).json({
        message: "Account not approved yet"
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 4. Generate token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
import prisma from "../config/prisma.js";

export const checkIn = async (req, res) => {
  try {
    const { userId } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in
    const existing = await prisma.attendance.findFirst({
      where: {
        userId,
        date: today
      }
    });

    if (existing) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        date: today,
        checkIn: new Date()
      }
    });

    res.json(attendance);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const checkOut = async (req, res) => {
  try {
    const { userId } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: today
      }
    });

    if (!attendance) {
      return res.status(400).json({ message: "Check-in first" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out" });
    }

    const checkOutTime = new Date();

    const totalHours =
      (checkOutTime - new Date(attendance.checkIn)) / (1000 * 60 * 60);

    const updated = await prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOut: checkOutTime,
        totalHours
      }
    });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};